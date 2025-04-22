import Security from "../services/Security"
// import db from '../models/index'

let CaptChaLogin = async(req,res) => {
    try {
        return res.status(200).json(await Security.CaptChaLogin(req.query.token))
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errcode: 1,
            errmessage: "Error from Server!!"
        })
    }
}

module.exports = {
    CaptChaLogin: CaptChaLogin,
}