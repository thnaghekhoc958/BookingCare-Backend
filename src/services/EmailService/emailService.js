require("dotenv").config();
const nodemailer = require("nodemailer");

let sendSimpleEmail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });
      const info = await transporter.sendMail({
        from: `"HealthCare Booking" <${process.env.EMAIL_APP}>`, // Địa chỉ gửi
        to: process.env.EMAIL_APP, // Địa chỉ email của bệnh nhân
        subject: data.language === 'vi' ? "Xác nhận lịch khám bệnh" : "Confirm the medical appointment schedule." , // Tiêu đề
        text: data.language === 'vi' ? "Vui lòng xác nhận lịch khám của bạn" : "Please confirm your appointment schedule.",
        html:  getBodyEmail(data)
      });

      if (info) {
        resolve({
          errcode: 0,
          errmessage: "ok",
        });
      }
    } catch (error) {
      reject({ error });
      console.log("Error sending email:", error);
    }
  });
};

let getBodyEmail = (data) => {  // Nhận đối tượng data
    console.log('getBodyEmail: ',data)
    let result;
    if (data.language === 'vi') {
        result = ` 
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; background-color: #f4f4f4;">
        <h2 style="color: #4CAF50;">Xác nhận lịch khám bệnh</h2>
        <p>Chào <strong>${data.patientName}</strong>,</p>
        <p>Cảm ơn bạn đã đặt lịch khám tại phòng khám của chúng tôi. Dưới đây là thông tin lịch khám của bạn:</p>
        
        <ul style="list-style-type: none; padding: 0;">
            <li><strong>Thời gian:</strong> ${data.time}</li>
            <li><strong>Bác sĩ:</strong> Dr. ${data.doctorName}</li>
        </ul>

        <p>Để xác nhận lịch khám của bạn, vui lòng nhấn vào liên kết dưới đây:</p>
        
        <a href="${data.redirectLink}" 
            style="display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">
            Xác nhận lịch khám
        </a>

        <p style="margin-top: 20px;">Nếu bạn không phải là người đặt lịch khám, vui lòng bỏ qua email này.</p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #777;">Email này được gửi tự động từ hệ thống của chúng tôi. Vui lòng không trả lời email này.</p>
    </div>`;
    }
    if (data.language === 'en') {
        result = ` 
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; background-color: #f4f4f4;">
        <h2 style="color: #4CAF50;">Appointment Confirmation</h2>
        <p>Hello <strong>${data.patientName}</strong>,</p>
        <p>Thank you for booking an appointment with us. Below are the details of your appointment:</p>
        
        <ul style="list-style-type: none; padding: 0;">
            <li><strong>Time:</strong> ${data.time}</li>
            <li><strong>Doctor:</strong> Dr. ${data.doctorName}</li>
        </ul>

        <p>To confirm your appointment, please click the link below:</p>
        
        <a href="${data.redirectLink}" 
            style="display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">
            Confirm Appointment
        </a>

        <p style="margin-top: 20px;">If you did not book this appointment, please ignore this email.</p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #777;">This email was sent automatically from our system. Please do not reply to this email.</p>
    </div>`;
    }
    return result;
}

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
};
