import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouters from './route/web';
import ConnectDB from './config/connectDB';
import cors from 'cors';
require('dotenv').config();

import helmet from "helmet";
const rateLimit = require('express-rate-limit');
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync(process.env.KEYSSL_KEY),
  cert: fs.readFileSync(process.env.KEYSSL_CRT)
};



const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // Giới hạn 100 yêu cầu mỗi IP
  trustProxy : 1,
  handler: (req, res) => {
    res.status(429).json({ message: "Too many requests, please try again later." });
  },
});

//npm instal --save cors@2.8.5
require('dotenv').config();

let app = express();
app.disable('x-powered-by')
helmet.hidePoweredBy()
app.set('trust proxy', 1);
https.createServer(options, app).listen(443, () => {
  console.log("Server running on https://localhost");
});
app.use(
    helmet.hsts({
        maxAge: 31536000, // 1 năm
        includeSubDomains: true,
      xDownloadOptions: false,
      xPoweredBy: false,
      xXssProtection: true,
      hidePoweredBy: true,
      contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "http://localhost:3000"],
            styleSrc: ["'self'", "https:"],
            imgSrc: ["'self'", "data:"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
          }
        
      },
    }),
  );
  app.use(
    helmet.frameguard({
      action: 'deny', // Không cho phép trang web bị nhúng
    })
  );
  app.use(
    helmet.xssFilter()
  );
  app.use(
    helmet.referrerPolicy({
      policy: 'no-referrer',
    })
  );
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: 'same-origin', // Chỉ cho phép truy cập từ cùng nguồn
    })
  );
  app.use(limiter);


app.use(cors({
    origin: 'http://localhost:3000',  // Địa chỉ nguồn được phép
    credentials: true  // Cho phép gửi cookie hoặc thông tin xác thực
}
));
//config app
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',extended: true}));

viewEngine(app);
initWebRouters(app);
ConnectDB(app);
let port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log("Backend_concept_is_running_with_port_"+ port)
})