const multer  = require('multer');
const db=require("../database/models/index");
const fs=require('fs');
const path=require('path');
// const conn = require("../config/mysql_connection");
// const tripinsert=require('../controllers/tripController');

    const  storage = multer.diskStorage({
        destination: async function (req, file, cb) {
            console.log('in storage');
          const coverfolder=req.user;
          const userId=coverfolder.toString();
          const uploadDir = path.join( 
          "public","images",userId
          );
          
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }
          cb(null,uploadDir)
        },
        filename:async function (req, file, cb) {

          let filetype = file.mimetype;
          let fileformate = filetype.split("/")[1];
         cb(null,Date.now()+ "--" +file.originalname.slice(0,10) +"."+fileformate);
        },
      });
      
      const medicationFiles=multer({
        
        storage:storage,
        filefilter:(req,file,cb)=>{
            console.log('in multer');
          if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
        },
      })
      module.exports = medicationFiles;