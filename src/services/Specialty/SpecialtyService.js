import db from "../../models";
import { where } from "sequelize";



let createSpecialty = (data) => {
    return  new Promise(async(resolve, reject) => {
        try {
            if (!data.name || !data.image || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errcode: 1,
                    errmessage: "missing requried parameter!!!"
                })
            } else {
                console.log(data)
              let SpecialtyData =  await db.Specialtys.create({
                    name: data.name,
                    image: data.image,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                })

                if (SpecialtyData) {
                    resolve({
                        errcode: 0,
                        errmessage: "ok",
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports= {
    createSpecialty: createSpecialty,
}