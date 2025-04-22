require("dotenv").config();
import { where } from "sequelize";
import db from "../models/index";
import { Op } from '@sequelize/core';

let GetItemInfor = (value) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!value) {
        return resolve({
          errcode: 1,
          errmessage: "missing requried parameter!!!",
        });
      }

      const [Doctors, Clinics, Specialties] = await Promise.all([
        db.Users.findAll({
          attributes: ['id', 'name', 'address', 'image', 'roleId', 'positionId'],
          where: {
            name: { [Op.like]: `%${value}%` },
          },
        }),
        db.Clinics.findAll({
          attributes: ['id', 'nameClinic', 'address', 'image', 'description'],
          where: {
            nameClinic: { [Op.like]: `%${value}%` },
          },
        }),
        db.Specialtys.findAll({
          attributes: ['id', 'nameSpecialty', 'image', 'descriptionMarkdown'],
          where: {
            nameSpecialty: { [Op.like]: `%${value}%` },
          },
        }),
      ]);

      const results = [
        { errcode: 0, errmessage: "D", data: Doctors },
        { errcode: 0, errmessage: "C", data: Clinics },
        { errcode: 0, errmessage: "S", data: Specialties },
      ].find(result => result.data.length > 0);
      console.log('Kết quả tìm kiếm:', {
        'Bác sĩ': Doctors.length > 0 ? Doctors : 'Không có kết quả',
        'Phòng khám': Clinics.length > 0 ? Clinics : 'Không có kết quả', 
        'Chuyên khoa': Specialties.length > 0 ? Specialties : 'Không có kết quả'
      });

      if (results) {
        resolve(results);
      } else {
        resolve({
          errcode: 2,
          errmessage: "không tồn tại kết quả tìm kiếm",
        });
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

module.exports = {
  GetItemInfor: GetItemInfor,
};
