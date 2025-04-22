import express from "express"
import homeController from"../controller/User/homeController";
import userController from"../controller/User/userController";
let router = express.Router();

let initWebRoutes = (app) => {
  
    

    return app.use("/",router);
}
module.exports = initWebRoutes;