// const{Model} = require("sequelize/types")
import SpecialtyService from "../../services/Specialty/SpecialtyService"
let createSpecialty = async(req,res) => {
    try {
        return res.status(200).json(await SpecialtyService.createSpecialty(req.body));
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errcode: 1,
            errmessage: "error from Server"
        })
    }
}

module.exports = {
    createSpecialty: createSpecialty,
}