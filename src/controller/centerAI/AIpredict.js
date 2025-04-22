import { reject } from "lodash";
import axios from 'axios';

let predictSymptom = async (req, res) => {
    try {
        const cleanText = req.body.symptoms.replace(/^:\s*/, ""); // Xoá dấu ':' ở đầu
        
        if (!cleanText.trim()) {
            return res.status(200).json({
                errCode: 1,
                message: 'Vui lòng nhập triệu chứng của bạn'
            });
        }

        const response = await axios.post("http://localhost:8000/predict", {
            text: cleanText
        });
        console.log("🔥 Kết quả từ model AI:", response);
        console.log(response.data);
        // Kiểm tra và format kết quả trả về
        if (response.data) {
            return res.status(200).json({
                errCode: 0,
                message: 'OK',
                data: response.data // Dữ liệu từ model AI
            });
        } else {
            return res.status(200).json({
                errCode: 1,
                message: 'Không nhận được kết quả từ model'
            });
        }

    } catch (error) {
        console.log("🔥 Lỗi gọi FastAPI:", error.message);
        return res.status(200).json({
            errCode: 1,
            message: 'Không thể kết nối đến server AI'
        });
    }
};

module.exports = {
    predictSymptom
};
