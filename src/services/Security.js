import axios from 'axios';
require("dotenv").config();


let CaptChaLogin = (token) => {
    return new Promise(async(resolve, reject) => {
        try {
            // console.log('token',token)
            const response = await axios.post(process.env.LINK_VERIFY_GG, null, {
                params: {
                    secret: process.env.SECRET_KEY, // Thay bằng secret key của bạn
                    response: token,
                },
            });
            // console.log('respones: ',response)
            if (response.data.success) {
                resolve({
                    errcode: 0,
                    errmessage: 'Valid CaptCha code!'
                })
            } else {
                resolve({
                    errcode: 1,
                    errmessage: 'Error CaptCha, plsease, send one captcha orther!!'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    CaptChaLogin: CaptChaLogin,
}