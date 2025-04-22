import { where } from "sequelize";
import db from "../../models/index";
require("dotenv").config();
//
import emailService from "../EmailService/emailService";
import { v4 as uuidv4 } from 'uuid';
let buildURLEmail =async(doctorId,token) => {
   let result = await `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId} `
    console.log('result: ',result)
    return result;
}

let getDoctorAppiontMent = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.dateBooking || !data.name) {
                resolve({
                    errcode: 1,
                    errmessage: "missing requried parameters!!!"
                })
            }else{
                let token = uuidv4();
                let result= await buildURLEmail(data.doctorId,token);
                await emailService.sendSimpleEmail({
                    reciverEmail: data.email,
                    patientName: data.name,
                    time: data.dateBooking,
                    doctorName: data.doctorPRName,
                    language: data.language,
                    redirectLink: result

                })
                // upsert paitent
                let user = await db.Users.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                      email: data.email,
                      roleId: 'R3'
                    },
                  });

                  if (user && user[0]) {
                    await db.Bookings.findOrCreate({
                        where: {patientId: user[0].id},
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            dateBooking: data.DateTimeData,
                            timetype: data.timeType,
                            token: token
                        }
                    })
                  }
                  resolve({
                    errcode: 0,
                    errmessage: "OK"
                  })
            }
        } catch (e) {
            console.log(e)
            reject(e);
        }
    })
}

let PostVerifyBookingCare = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.token && !data.doctorId) {
                resolve({
                    errcode: 1,
                    errmessage: "missing requried parameters!!!"
                })
            }else{
                let appointment = await db.Bookings.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token:data.token,
                        statusId: 'S1',
                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = 'S2'
                    await appointment.save();
                    resolve({
                        errcode: 0,
                        errmessage: 'update the appiontment success!!'
                    })
                }else{
                    resolve({
                        errcode: 1,
                        errmessage: 'Schedule is Actived'
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getDoctorAppiontMent: getDoctorAppiontMent,
    PostVerifyBookingCare: PostVerifyBookingCare,
}