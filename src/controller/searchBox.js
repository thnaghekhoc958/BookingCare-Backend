import SearchBox from '../services/SearchBox'

let GetItemInfor =async(req,res) => {
    try {
        // let value = req.query.value;
        // console.log(value)

        return res.status(200).json(await SearchBox.GetItemInfor(req.query.value))
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errcode: 1,
            errmessage: "Error from server",
        })
    }
}

module.exports = {
    GetItemInfor: GetItemInfor,
}