import db from "../../models";
import { where } from "sequelize";

let handleCreateClinics =(data) => {
    return new Promise(async(resolve, reject) => {
        // nameClinic: DataTypes.STRING,
        // address: DataTypes.STRING,
        // description: DataTypes.TEXT,
        // descriptionHTML: DataTypes.TEXT('long'),
        // descriptionMarkdown: DataTypes.TEXT('long'),
        // image: DataTypes.BLOB('long'),
        if (!data.name || !data.address || !data.description || !data.descriptionHTML || !data.descriptionMarkdown || !data.image) {
            resolve({
                errcode: 1,
                errmessage: "Error From Message!!!"
            })
        } else {
            let dataCreate = await db.Clinics.create({
         nameClinic: data.name,
         address: data.address,
         description: data.description,
         descriptionHTML: data.descriptionHTML,
         descriptionMarkdown: data.descriptionMarkdown,
         image: data.image,
            })
            if (dataCreate) {
                resolve({
                    errcode: 0,
                    errmessage: 'ok',
                })
            }
        }
    })
}

module.exports = {
    handleCreateClinics
}