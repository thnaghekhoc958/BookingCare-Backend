import { reject } from "lodash";
import DoctorTop from "../../services/DoctorService/DoctorTopService";
let HandleDoctorTopHome = async(req,res) => {
    let limit = req.query.limit;
    if (!limit)  limit = 10;
    try {
        let response = await DoctorTop.getDoctorTopHome(+limit)
        return res.status(200).json({
            response
        });
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errcode: 1,
            message: 'Error from Server..'
        })
    }
}
let getAllDoctor = async(req,res) => {
    try {
        let doctors = await DoctorTop.getAllDoctors()
        return res.status(200).json({
            doctors
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json({
              errcode: 1,
              message: 'Error from Server..'
        })
    }
}
let PostInforDoctor = async(req,res) => {
    try {
        let response = await DoctorTop.SaveDetailInforDoctor(req.body);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
              errcode: 1,
              message: 'Error from Server..'
        })
    }
}
let getFindDoctor = async(req,res) => {
    try {
        let response = await DoctorTop.handleFindDoctor()
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errcode: 1,
            errmessage: "error from Message..."
        })
    }
}
let getDetailDoctorById = async(req,res) => {
    try {
        let infor = await DoctorTop.getDetailDoctorById(req.query.id);
        return res.status(200).json(infor)
    } catch (error) {
        console.log(error)
    }
}

let BulkCreateSchedule = async(req,res) => {
    try {
        console.log('type data: ',typeof req.body)
        console.log(' data: ', req.body)

        return res.status(200).json(await DoctorTop.BulkCreateSchedule(req.body))
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errcode: 1,
            errmessage: "error server"
        })
    }
}
let getScheduleByDate = async (req,res) => {
    try {
        console.log('check vả: ',req.query.doctorId,req.query.dateSchedule)
        return res.status(200).json(await DoctorTop.getScheduleByDate(req.query.doctorId,req.query.dateSchedule))
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errcode: 1,
            errmessage: 'error from Server'
        })
    }
}
let getAddInfor = async (req,res) => {
    try {
        return res.status(200).json(await DoctorTop.getAddInfor(req.query.id))
    } catch (e) {
        console.log(e)
        return res.status(200).json({
                errcode: 1,
            errmessage: 'error from Server'
        })
    }
}
let getDoctorAppiontMent = async (req,res) => {
    try {
        return res.status(200).json(await DoctorTop.getDoctorAppiontMent(req.query.id))
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errcode: 1,
            errmessage: "error from Server!!!"
        })
    }
}

module.exports = {
    HandleDoctorTopHome:HandleDoctorTopHome,
    getAllDoctor:getAllDoctor,
    PostInforDoctor:PostInforDoctor,
    getFindDoctor:getFindDoctor,
    getDetailDoctorById:getDetailDoctorById,
    BulkCreateSchedule: BulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getAddInfor: getAddInfor,
    getDoctorAppiontMent: getDoctorAppiontMent,
    
}