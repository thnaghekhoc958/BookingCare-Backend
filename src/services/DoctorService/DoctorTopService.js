import { where } from "sequelize";
import db from "../../models/index";
import moment from "moment/moment";
import { raw } from "body-parser";
import _, { includes } from "lodash";
require("dotenv").config();
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE; // (get value from env of nodejs) error not found this value

let getDoctorTopHome = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.Users.findAll({
        limit: limitInput,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcodes,
            as: "positionData",
            attributes: ["valueEn", "ValueVi"],
          },
          {
            model: db.Allcodes,
            as: "genderData",
            attributes: ["valueEn", "ValueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errcode: 0,
        data: users,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.Users.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password"],
          // exclude: ["password","image"],
        },
      });
      resolve({
        errcode: 0,
        data: doctors,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let SaveDetailInforDoctor = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.id ||
        !data.contentHTML ||
        !data.contentMarkdown ||
        !data.action ||
        !data.selectedPrice ||
        !data.selectedPayment ||
        !data.selectedProvince ||
        !data.nameClinic ||
        !data.addressClinic ||
        !data.note
      ) {
        resolve({
          errcode: 1,
          errmessage: "missing parameters",
        });
      } else {
        let isDoctor = await db.Users.findOne({
          where: { id: data.id },
        });
        if (isDoctor) {
          if (data.action === "CREATE") {
            await db.MarkDownObjects.create({
              contentHTML: data.contentHTML,
              contentMarkdown: data.contentMarkdown,
              description: data.description,
              doctorId: data.doctorId,
            });
            let doctor = await db.MarkDownObjects.findAll();
            resolve({
              errcode: 0,
              data: doctor,
            });
          } else if (data.action === "EDIT") {
            let doctorMarkDown = await db.MarkDownObjects.findOne({
              where: { doctorId: data.doctorId },
              raw: false,
            });
            if (doctorMarkDown) {
              doctorMarkDown.contentHTML = data.contentHTML;
              doctorMarkDown.contentMarkdown = data.contentMarkdown;
              doctorMarkDown.description = data.description;
              doctorMarkDown.updatedAt = new Date();
              await doctorMarkDown.save();
            }
          }
          // upsert to Doctor_infor table
          let doctorInfor = await db.Doctor_Infor.findOne({
            where: {
              doctorId: data.doctorId,
            },
            raw: false,
          });
          console.log(doctorInfor);
          if (doctorInfor) {
            // update
            doctorInfor.priceId = data.selectedPrice.value;
            doctorInfor.paymentId = data.selectedPayment.value;
            doctorInfor.provinceId = data.selectedProvince.value;

            doctorInfor.nameClinic = data.nameClinic;
            doctorInfor.addressClinic = data.addressClinic;
            doctorInfor.note = data.note;

            doctorInfor.updatedAt = new Date();
            await doctorInfor.save();
          } else {
            //create
            await db.Doctor_Infor.create({
              priceId: data.selectedPrice.value,
              paymentId: data.selectedPayment.value,
              provinceId: data.selectedProvince.value,

              nameClinic: data.nameClinic,
              addressClinic: data.addressClinic,
              note: data.note,
              doctorId: data.doctorId,
            });
          }
          let doctor = await db.MarkDownObjects.findAll();
          resolve({
            errcode: 0,
            data: doctor,
          });
        } else {
          resolve({
            errcode: 1,
            errmessage: "No Search as Doctor in table!",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleFindDoctor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctor = await db.MarkDownObjects.findAll();
      resolve({
        errcode: 0,
        data: doctor,
      });
    } catch (error) {
      console.log(error);
    }
  });
};
let getDetailDoctorById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errcode: 1,
          errmessage: "missing required parameters",
        });
      } else {
        let data = await db.Users.findOne({
          where: { id: inputId },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.MarkDownObjects,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Doctor_Infor,
              attributes: {
                exclude: ["createdAt", "updatedAt", "id"],
              },
              include: [
                // doctor ìnor
                {
                  model: db.Allcodes,
                  as: "priceData",
                  attributes: ["valueEN", "valueVI"],
                },
                {
                  model: db.Allcodes,
                  as: "provinceData",
                  attributes: ["valueEN", "valueVI"],
                },
                {
                  model: db.Allcodes,
                  as: "paymentData",
                  attributes: ["valueEN", "valueVI"],
                },
              ],
            },

            {
              model: db.Allcodes,
              as: "positionData",
              attributes: ["valueEn", "ValueVi"],
            },
            {
              model: db.Allcodes,
              as: "genderData",
              attributes: ["valueEn", "ValueVi"],
            },
            {
              model: db.Allcodes,
              as: "roleData",
              attributes: ["valueEn", "ValueVi"],
            },
          ],
          raw: false,
          nest: true,
        });
        // dieu kien: raw: false
        // if (data && data.image) {
        //   data.image = new Buffer(data.image, "base64").toString("binary");
        // }
        if (!data) {
          data = {};
        }
        if (!data.MarkDownObject) {
          data.MarkDownObject = {};
        }
        resolve({
          errcode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let BulkCreateSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("data form sercvice: ", data);
      if (!data.arrSchedule || !data.doctorId || !data.formatDate) {
        resolve({
          errcode: 1,
          errmessage: "missing required parameter",
        });
      } else {
        let schedule = data.arrSchedule;
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = 10;
            console.log("schedule: ", typeof item.dateSchedule);
            return item;
          });
          //get-all-existing-data
          let existing = await db.Schedules.findAll({
            where: { doctorId: data.doctorId, dateSchedule: data.formatDate },
            attributes: ["timeType", "dateSchedule", "doctorId", "maxNumber"],
            raw: true,
          });
          //convert-dateSchedule
          if (existing && existing.length > 0) {
            existing = existing.map((item) => {
              item.dateSchedule = new Date(item.dateSchedule).getTime();
              return item;
            });
          }
          console.log("existing: ", existing);
          //compare-different
          let Tocreate = _.difference(schedule, existing, (a, b) => {
            return (
              a.timeType === b.timeType && a.dateSchedule === b.dateSchedule
            );
          });

          // Tocreate.forEach(item => {
          //   console.log('Type of dateSchedule in item before change: ', typeof item.dateSchedule);
          //   item.dateSchedule = item.dateSchedule.toString();  // Gán lại giá trị đã chuyển thành string cho item.dateSchedule
          //   console.log('Type of dateSchedule in item after change: ', typeof item.dateSchedule);
          //   return item;
          // });
          //create data
          if (Tocreate && Tocreate.length > 0) {
            await db.Schedules.bulkCreate(Tocreate);
          }
          resolve({
            errcode: 0,
            errmessage: "success",
          });
          //   await db.Schedules.bulkCreate(schedule);
        }
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let getScheduleByDate = (doctorId, dateSchedule) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !dateSchedule) {
        resolve({
          errcode: 1,
          errmessage: "missing requried parameters",
        });
      } else {
        //newDate
        // console.log('dateSchedule moi nhap vao la: ',dateSchedule)
        // let newDate = moment.utc(Number(dateSchedule)).format("YYYY-MM-DD HH:mm:ss")
        let data = await db.Schedules.findAll({
          where: { doctorId: doctorId, dateSchedule: dateSchedule },
          include: [
            {
              model: db.Allcodes,
              as: "timeTypeData",
              attributes: ["valueEn", "ValueVi"],
            },
          ],
          raw: false,
          nest: true,
        });
        console.log("data: ", data);
        if (!data) data = [];

        resolve({
          errcode: 0,
          data: data,
        });
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let getAddInfor = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({
          errcode: 1,
          errmessage: "missing parameters!",
        });
      } else {
        let data = await db.Doctor_Infor.findOne({
          where: { doctorId: doctorId },
          attributes: {
            exclude: ["createdAt", "updatedAt", "id"],
          },
          include: [
            {
              model: db.Allcodes,
              as: "priceData",
              attributes: ["valueEN", "valueVI"],
            },
            {
              model: db.Allcodes,
              as: "provinceData",
              attributes: ["valueEN", "valueVI"],
            },
            {
              model: db.Allcodes,
              as: "paymentData",
              attributes: ["valueEN", "valueVI"],
            },
          ],
          nest: true, // Giữ cấu trúc dữ liệu dạng nested object
          raw: false, // Để include hoạt động
        });

        if (data) {
          resolve({
            errcode: 0,
            data: data,
          });
        } else {
          resolve({
            errcode: 1,
            errmessage: "Not found information of the Doctor!",
          });
        }
      }
    } catch (error) {
      console.log("Error:", error);
      reject(error);
    }
  });
};

let getDoctorAppiontMent = (doctorId) => {
  return new Promise( async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({
          errcode: 1,
          errmessage: "missing requried parameters"
        })
      }else{
        let user = await db.Users.findOne({
          where: {id: doctorId},
          attributes: {
            exclude: ["createdAt", "updatedAt","password","positionId","roleId"],
          },
          include: [
            {
              model: db.Allcodes,
              as: "positionData",
              attributes: ["valueEN", "valueVI"],
            },
            {
              model: db.Allcodes,
              as: "roleData",
              attributes: ["valueEN", "valueVI"],
            },
            {
              model: db.MarkDownObjects,
              attributes: ["description"],
            },
            {
              model: db.Doctor_Infor,
              attributes: ["addressClinic","nameClinic","priceId"],
              include: [
                {
                  model: db.Allcodes,
                  as: "priceData",
                  attributes: ["valueEN", "valueVI"],
                },
              ]
            },
          ],
          nest: true,
          raw: false,
        })
        if (user) {
          // if (user && user.image) {
          //   user.image = new Buffer(user.image, "base64").toString("binary");
          // }
          resolve({
            errcode: 0,
            data: user,
          })
        }
      }
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

module.exports = {
  getDoctorTopHome: getDoctorTopHome,
  getAllDoctors: getAllDoctors,
  SaveDetailInforDoctor: SaveDetailInforDoctor,
  handleFindDoctor: handleFindDoctor,
  getDetailDoctorById: getDetailDoctorById,
  BulkCreateSchedule: BulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getAddInfor: getAddInfor,
  getDoctorAppiontMent: getDoctorAppiontMent,
};
