import express from "express"
import homeController from"../controller/User/homeController";
import userController from"../controller/User/userController";
import usersAdjustMentController from"../controller/User/getAllController";
import DoctorController from "../controller/Doctor/DoctorController";
import PatientController from "../controller/Patient/PatientController"
import specialty from "../controller/scpecialty/specialty";
import Security from "../controller/Security.js";
import searchBox from "../controller/searchBox.js";
import Clinic from "../controller/Clinic/Clinic.js";
import AI from "../controller/centerAI/AIpredict.js";
// Moblie
import Mobile from "../Mobile/controller/loginSreen";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/1',homeController.getAboutHome);
    router.get('/create-account',homeController.getCreateAccount);
    router.post('/input-data',homeController.postCrud);
    router.get('/require-data',homeController.displayUser);
    router.get('/edit-data',homeController.getRepairData);
    router.post('/put-crud',homeController.getUpdateData);
    router.get('/delete-crud',homeController.getDeleteDisplay);

    //////api////////

    router.post('/api/login',userController.handleLogin);
    ///////api-reactJS///////
    router.get('/api/get-all-users',usersAdjustMentController.handleGetAllUsers);
    router.put('/api/edit-all-data',usersAdjustMentController.handleGetAllEditUsers);
    router.post('/api/create-new-users',usersAdjustMentController.handleCreateUsers);
    router.delete('/api/delete-all-data',usersAdjustMentController.handleDeleteUsers);
    ///// api-part-2 ///////
    router.get('/api/allcode',usersAdjustMentController.getAllCode);
    router.put('/api/update-data-for-user/re-dux',usersAdjustMentController.UpdateUserRedux);
    //
    router.get('/api/top-doctor-home',DoctorController.HandleDoctorTopHome)
    router.get('/api/get-all-doctor',DoctorController.getAllDoctor)
    //doctor and content
    router.post('/api/save-information-of-doctor',DoctorController.PostInforDoctor)
    router.get('/api/get-find-doctors-follows-users',DoctorController.getFindDoctor)
    router.get('/api/get-detail-by-id',DoctorController.getDetailDoctorById)
    router.post('/api/bulk-cretate-schedule',DoctorController.BulkCreateSchedule)
    router.get('/api/get-shedule-doctor-by-date',DoctorController.getScheduleByDate)
    router.get('/api/get-besides-infor-follow-id',DoctorController.getAddInfor)
    router.get('/api/information-doctor-schedule-appiontment',DoctorController.getDoctorAppiontMent)
    // paitent
    router.post('/api/save-Schedule-bookingCare-for-appiontment',PatientController.PostSaveScheduleBookingCare)
    router.post('/api/verify-Schedule-bookingCare-for-appiontment',PatientController.PostVerifyBookingCare)
    // specialty
    router.post('/api/create-newcontent-specialty',specialty.createSpecialty)
    //security
    router.post('/api/checkin-captcha-valida',Security.CaptChaLogin)
    //search box
    router.get('/api/search-item-data',searchBox.GetItemInfor)
    // Clinics
    router.post('/api/create-newcontent-Clinic',Clinic.handleCreateClinic)

    //AI
    router.post('/api/predict-symptom',AI.predictSymptom);
    //Mobile
     router.post('/api-mobile/login',Mobile.handleLoginUser);


    return app.use("/",router);
}
module.exports = initWebRoutes;