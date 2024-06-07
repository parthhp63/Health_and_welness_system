const web=require('express').Router();
const homeController=require('../controller/homeController');
const authMiddleware=require("../middleware/authMiddleware");
const guest=require("../middleware/guest");
const medicationController=require("../controller/medicationController");
const medicationFiles = require('../middleware/multer');
const logout = require('../controller/logout');
const demo=require("../controller/demo");
const dashboard = require('../controller/dashboard');
const report = require('../controller/reportDisplay');



// const report = require('../controller/report');
web.get('/medicationone',authMiddleware,medicationController().medicationone);
web.get('/recurringmed',authMiddleware,medicationController().recurring)
web.get('/demo',demo().data);
// console.log(remainder().findmail);
web.get('/',guest,homeController().register);
web.post('/adduser',homeController().adduser);
web.get('/login',guest,homeController().login);
web.post('/login',guest,homeController().loginUser)
web.get('/dashboard',authMiddleware,dashboard().allMedicine);
web.get("/newmed",authMiddleware,dashboard().newmed);
web.get("/medication",authMiddleware,homeController().medication);
web.get("/reports",authMiddleware,report().reportDisplay);
web.post("/reports/generatereport",authMiddleware,report().generateReport);
web.get("/logout", authMiddleware,logout().logout);
web.get("/logoutall",authMiddleware,logout().logoutAll);
web.get("/logoutother",authMiddleware,logout().logoutOther);
web.post('/recurring',authMiddleware,medicationFiles.single("onetimefile"),medicationController().recurringMedication);
web.post('/onetime',authMiddleware,medicationFiles.single("onetimefile"),medicationController().onetimeMedication);
module.exports = web;