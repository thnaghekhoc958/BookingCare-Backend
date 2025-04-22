// import bcrypt from "bcrypt";
import db from "../../models";
import argon2 from "argon2";
import { where } from "sequelize";
import { raw } from "body-parser";

// import { Promise } from 'sequelize';

// const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('check data from input data is: ',data)
      let hashPassWordFromargon2 = await hashUserPassword(data.password);
    

      await db.Users.create({
        name: data.name,
        email: data.email,
        phonenumber: data.phonenumber,
        address: data.address,
        password: hashPassWordFromargon2,
        // gender: data.gender.toString() === "1" ? 'MALE' : 'FEMALE',  // Chuyển đổi thành chuỗi
        // roleId: data.role_id.toString() === "1" ? 'ADMIN' : 'USER',
        gender: data.gender === "1" ? true : false,
        roleId: data.role_id === "1" ? true : false,
      });
      resolve("created a new data user");
    } catch (error) {
      reject(error);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassWord = await argon2.hash(password)
      console.log("Hashed Password:", hashPassWord); // In ra giá trị hash
      resolve(hashPassWord);
    } catch (error) {
      reject(error);
    }
  });
};


// let createNewUser = async (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let hashPassWordFromBcrypt = await hashUserPassword(data.password);
//       await db.Users.create({
//         name: data.name,
//         email: data.email,
//         phonenumber: data.phonenumber,
//         address: data.address,
//         password: hashPassWordFromBcrypt,
//         gender: data.gender === "1" ? true : false,
//         roleId: data.role_id === "1" ? true : false,
//       });
//       resolve("created a new data user");
//     } catch (error) {
//       reject(error);
//     }
//   });
// };


// let hashUserPassword = (password) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       var hashPassWord = await bcrypt.hash(password, salt);
//       console.log("Hashed Password:", hashPassWord); // In ra giá trị hash
//       resolve(hashPassWord);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };
//////////////////////////////
let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
       let  users = await db.Users.findAll({
        raw: true,
      });
      
      resolve(users);
    } catch (error) {
      reject(error);
      throw error;
    }
  });
};
//////////////////////////////
let getIdOfUsers = (user_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await db.Users.findOne({
          raw : true,
          where: { id: user_id }
        });
        // console.log('bien user co gia tri la: ', user)
        if (user) {
          resolve(user);
        } else {
          resolve([]); // Trả về null nếu không tìm thấy user
        }
      } catch (error) {
        reject(error);
      }
    });
  };  


////////////////////////////////////////////////
let updateUsersData = (data) => {
  return new Promise(async(resolve,reject) => {
    try {
      let user = await db.Users.findOne({
        // raw: true,
        where: {id : data.id}
        
      })
      
      if (user){
        user.name = data.name;
        user.address = data.address;
        user.roleId = data.gender;
        // console.log('---------------------')
        // console.log(user.address)
        // console.log(user.gender)
        // console.log(user)
        await user.save();
        let getAllUser = await db.Users.findAll();
        resolve(getAllUser);
      }else{
        resolve();
      }
       await db.Users.update({

       })
    } catch (error) {
      reject(error)
    }
  });
};
  
let deleteUsers = (data) => {
  return new Promise(async(resolve,reject) => {
    try {
      let user = await db.Users.findOne({
        // raw: true,
        where: { id : data}
      })
      console.log('-----------------------truoc');
      console.log(user);
      if (user) {
        await user.destroy();
        console.log('-----------------------sau');
        console.log(user);
        let getAllUser = db.Users.findAll();
       
        resolve(getAllUser);
      } else {
        console.log('khong th tim thay user nay')
      }
    } catch (error) {
      console.log(error)
    }
  })
}
////////////////////////////////////////////////

//???????
// let getAllUser = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let users = await db.Users.findAll({
//         raw: true,
//       });
//       resolve(users);
//     } catch (error) {
//       reject(error);
//       throw error;
//     }
//   });
// };
//???????

// let getIdOfUsers = (user_id) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//         let user = await db.Users.findOne({
//             where: { id : user_id }
//         })

//         if(user){
//             resolve(user)
//         }
//       });
      
//     } catch (error) {
//         reject(error);
//     }
//   });
// };

// let getByEmail = () => {
//     return new Promise(async(resolve,reject) => {
//         try {

//         } catch (error) {

//         }
//     })
// }

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getIdOfUsers: getIdOfUsers,
  updateUsersData : updateUsersData,
  deleteUsers : deleteUsers,
};
