import { reject } from "lodash";
import ManganeClinic from '../../services/Clinic/ManganeClinic'
let handleCreateClinic =async(req,res) => {
    try {
        return res.status(200).json(await ManganeClinic.handleCreateClinics(req.body))
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errcode: 1,
            message: 'Error from Server..'
        })
    }
}

module.exports = {
    handleCreateClinic
}