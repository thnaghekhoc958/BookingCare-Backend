import newUserServices from "../../services/UserService/newUsersServicee";
import RateLimiterMemory from "rate-limiter-flexible/lib/RateLimiterMemory.js";

//SQL Server
// const { ConnectDB, handleUserLogin } = require('../../config/connectDB');
import ConnectDB from "../../config/connectDB";
const xss = require('xss');

const rateLimiter = new RateLimiterMemory({
    points: 5, // 1 điểm
    duration: 1, // 600 giây = 10 phút
  });

let handleLogin = async (req, res) => {
  let ipAddress = req.ip === "::1" ? "127.0.0.1" : req.ip;
  console.log("Client IP:", ipAddress);
  let email = req.body.email;
  let password = req.body.password;

  console.log('req.secure and req.ip',req.secure,req.ip)


  try {
    let rateLimiterRes = await rateLimiter.consume(ipAddress, 1);

    // chinh thuc
    if (!email || !password) {
      return res.status(500).json({
        errcode: 1,
        errMessage: "missing input a parameter!",
        test: "test",
      });
    }

    let userdata = await newUserServices.handleUserLogin(email, password);
    // console.log("Remaining Points:", rateLimiterRes.remainingPoints);

    return res.status(200).json({
      errcode: userdata.errcode,
      errMessage: userdata.message,
      userdata,
    });

  } catch (rateLimiterRes) {
    // console.log('Blocked! Retry after:', rateLimiterRes);
        return res.status(429).json({
            errcode: 2,
            errMessage: 'qúa nhiều yêu cầu, vui lòng thử lại sau!',
            retryAfter: Math.ceil(rateLimiterRes.msBeforeNext / 1000),
    });
  }
};

let handleSaveregister = async(req, res) => {
  try {
    return res.status(200).json(await handleSaveUserRegister(req.body))
  } catch (error) {
    console.log(error)
    return res.status(200).json({
      errcode: 1,
      errmessage: "Error From Server"
    })
  }
};

module.exports = {
  handleLogin: handleLogin,
};
