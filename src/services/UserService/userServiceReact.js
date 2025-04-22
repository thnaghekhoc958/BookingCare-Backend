// import bcrypt from "bcrypt";
import db from "../../models";
import argon2 from "argon2";
import { where } from "sequelize";
import { raw } from "body-parser";
import { rejects } from "assert";
import { error } from "console";
import { resolve } from "path";
// "query": {"raw":true},

let getAllOfUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      //"AllcodeId"
      let users = "";
      if (userId == "ALL") {
        users = await db.Users.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.Users.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      // console.log(users);
      // delete users.password;
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let getEditData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(data.id);

      if (!data.id) {
        resolve({
          errcode: 1,
          message: "mising required parameter",
        });
      } else {
        let user = await db.Users.findOne({
          where: { id: data.id },
        });
        if (user) {
          user.name = data.name;
          user.address = data.address;
          user.phonenumber = data.phonenumber;

          await user.save();
          // console.log('---------------------')
          // console.log(user.address)
          // console.log(user.gender)
          // console.log(user)
          // await db.user.save({
          //     name : data.name,
          //     address : data.address,
          //     roleId : data.gender
          // });
          resolve({
            errcode: 0,
            message: "update success",
          });
        } else {
          resolve({
            errcode: 1,
            message: "user not found!",
          });
        }
        await db.Users.update({});
      }
    } catch (error) {
      reject(error);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkemailofusers(data.email);
      console.log("check data tren", data);
      if (check) {
        let hashPassWordFromargon2 = await hashUserPassword(data.password);
        await db.Users.create({
          name: data.name,
          email: data.email,
          phonenumber: data.phonenumber,
          address: data.address,
          password: hashPassWordFromargon2,
          gender: data.gender,
          roleId: data.roleid,
          positionId: data.position,
          image: data.image,
          // roleId: data.roleid,
          // positionId: data.position,
          // gender: data.gender === "1" ? true : false,
          // roleId: data.role_id === "1" ? true : false,
        });
        let users = "";
        users = await db.Users.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
        resolve({
          errCode: 0,
          errMessage: "ok",
          users,
        });
        // console.log("successfull");
      } else {
        resolve({
          errcode: 1,
          message:
            "your email was already use, please! you have to switch to other email ",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let checkemailofusers = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Users.findOne({
        where: { email: email },
      });
      // console.log("check em duoi: ", user);
      if (!user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassWord = await argon2.hash(password);
      // console.log("Hashed Password:", hashPassWord); // In ra giá trị hash
      resolve(hashPassWord);
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUsers = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Users.findOne({
        where: { id: id.id },
      });
      // console.log(user);
      // console.log("id: ", id);
      if (user) {
        // await db.Users.destroy({
        //   where: { id: id },
        // });
        await user.destroy();
        let users = "";
        users = await db.Users.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
        resolve({
          errcode: 0,
          message: "the user is deleted",
          users,
        });
      } else {
        let users = "";
        users = await db.Users.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
        resolve({
          errcode: 1,
          message: "user not exist",
          users,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(typeInput);
      if (!typeInput) {
        resolve({
          errcode: 1,
          message: "messing requried parameter ",
        });
      } else {
        let res = {};
        let allcode = await db.Allcodes.findAll({
          where: { type: typeInput },
        });
        res.errcode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let UpdateUserDataOfRedux = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errcode: 1,
          message: "mising required parameter",
        });
      } else {
        let user = await db.Users.findOne({
          where: { id: data.id },
        });
        if (user) {
          (user.name = data.name),
            (user.email = data.email),
            (user.phonenumber = data.phonenumber),
            (user.address = data.address),
            (user.gender = data.gender),
            (user.roleId = data.roleid),
            (user.positionId = data.position),
            (user.image = data.image),
            await user.save();
          let users = await db.Users.findAll({
            attributes: {
              exclude: ["password"],
            },
          });
          resolve({
            errcode: 0,
            message: "update success",
            users,
          });
        } else {
          resolve({
            errcode: 1,
            message: "user not found!",
          });
        }
        await db.Users.update({});
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllOfUsers: getAllOfUsers,
  getEditData: getEditData,
  createNewUser: createNewUser,
  deleteUsers: deleteUsers,
  getAllCodeService: getAllCodeService,
  UpdateUserDataOfRedux: UpdateUserDataOfRedux,
};
