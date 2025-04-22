// import bcrypt from "bcrypt";
import db from "../../models";
import argon2 from "argon2";
import { where } from "sequelize";
import { raw } from "body-parser";
import { rejects } from "assert";
import { error } from "console";
import { resolve } from "path";
// "query": {"raw":true},

let handleLogin = (email,password) => {
  return new Promise(async (resolve, reject) => {
    try {
        let userData = await db.User.findOne({
            where: { email: email, password: password },
            raw: true,
        });
        if (userData) {
            resolve(true);
        } else {
            resolve(false);
        }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
    handleLogin: handleLogin,
};
