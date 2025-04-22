import { reject } from "lodash";
import DoctorTop from "../../services/DoctorService/DoctorTopService";
import PatientService from "../../services/PaitentService/PatientService"
let PostSaveScheduleBookingCare = async (req,res) => {
    try {
        return res.status(200).json(await PatientService.getDoctorAppiontMent(req.body))
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errcode: 1,
            errmessage: "error from Server!!!"
        })
    }
}
let PostVerifyBookingCare = async (req,res) => {
    try {
        return res.status(200).json(await PatientService.PostVerifyBookingCare(req.body))
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errcode: 1,
            errmessage: "error from Server!!!"
        })
    }
}
module.exports = {
    PostSaveScheduleBookingCare: PostSaveScheduleBookingCare,
    PostVerifyBookingCare: PostVerifyBookingCare,
}