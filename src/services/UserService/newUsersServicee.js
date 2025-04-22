import { where } from 'sequelize';
import bcrypt from "bcrypt";
import db from '../../models/index'
import argon2 from "argon2";
const { Sequelize } = require('sequelize');
import { raw } from 'body-parser';
// "bcrypt": "^5.0.1",
// "bcryptjs": "^2.4.3",
let checkGmailUser =(email) =>{
    return new Promise(async(resolve,reject) => {
        try {
            let user = await db.Users.findOne({
                where : {email : email}
            })
            // console.log(user)
            // console.log(email)
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
            
        } catch (error) {
            reject(error);
        }
    })
}


// hàm chính không lỗi
let handleUserLogin =(email,password) => {
    return new Promise(async(resolve,reject) => {
        try {
            console.log(email)
            console.log(password)
            console.log('===================ở trên là input đầu vào của người dùng nhập vào!========')
            let userData = {};
            let isExist = await checkGmailUser(email);
            if (isExist) {
                let user = await db.Users.findOne({
                    where: {email: email},
                    attributes:['email','roleId','password','name'],
                    raw:true,
                })

                if (user) {
                    console.log(user.password)
          
                    if (await argon2.verify(user.password,password)) {
                        userData.errcode = 0;
                        userData.errMessage = `Users found success!!!!`
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errcode = 1;
                        userData.errMessage = `wrong password`;
                    }
                } else {
                    userData.errcode = 2;
                    userData.errMessage = `Your's Users not Found!, plseas enter again orther!`
                }
            } else {
                userData.errcode = 3;
                userData.errMessage = `Your's Email not Found!, plesase enter again orther!`
            }
            resolve(userData)
         } catch (error) {
            reject(error)
        }
    })
}



let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);
        resolve(hash);
      } catch (error) {
        reject(error);
      }
    });
  };

let checkUserData =(email,password) =>{
    return new Promise(async(resolve,reject) => {
        try {
            // let p = await bcrypt.hashSync(password,salt)
            // console.log('password da nhap:')
            // console.log(password)
            let userData = {};
            let user_email = await db.Users.findOne({
                where: {email : email}
            })
            // console.log(user_email)
            console.log('password trong database:')
            console.log(user_email.password)
            if (user_email) {
                let isExistpassword = await bcrypt.compare(password,user_email.password)

                if (isExistpassword){
                    userData.errcode = 0
                    userData.message = `this user has been found!`
                    resolve(userData)  
                }else{
                    userData.errcode = 1
                    userData.message = `user(password) not found!`
                    resolve(userData)  
                }
            } else {
                userData.errcode = 1
                userData.message = `email not found!`
                resolve(userData)            }
        } catch (error) {
            reject(error)
        }
    })
}

let handleSaveUserRegister = () => {
    return new Promise(async(resolve, reject) => {
        try {
            
        } catch (error) {
            reject(error)
        }
    })
}
module.exports ={
    handleUserLogin :handleUserLogin,
    checkUserData:checkUserData,
    hashUserPassword:hashUserPassword,
    handleSaveUserRegister: handleSaveUserRegister,
}