import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouters from './route/web';
import ConnectDB from './config/connectDB';
import cors from 'cors';
//npm instal --save cors@2.8.5
require('dotenv').config();

let app = express();
app.use(cors({origin: true,
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