const { Op } = require("sequelize");
const db = require("../database/models");
const path = require("path");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs').promises;



const report=()=>{
    return{
        async reportDisplay(req,res){
            res.render('./sections/reports.ejs');
        },

        async generateReport(req,res){
            console.log(req.body);

         const reportData=await db.sequelize.models.medication.findAll({
            attributes: ['id','time','recurrence_type', 'week_day', 'createdAt'],
            where : {
              user_id :`${req.user}`,
              start_date: { [Op.gte]: `${req.body.from}`},
               end_date:{ [Op.lte]: `${req.body.to}`}
            }
         })
         console.log('reportData',reportData);

        //  
        const date = new Date();
    const currentDate = date.toISOString().split('T')[0]; 
    const csvFileName = `${req.user}_${currentDate}_report.csv`
    const csvFilePath = path.join(__dirname, '../public/', 'reports', csvFileName);
    console.log('csvFileNamecsvFileNamecsvFileNamecsvFileNamecsvFileName',csvFilePath);

    const csvWriter = createCsvWriter({
        path: csvFilePath,
        header: [
          { id: 'id', title: 'Id'},
          { id: 'start_date', title: 'Start Date'},
          { id: 'end_date', title: 'End Date'},
          { id: 'time', title: 'Time'},
          { id: 'recurrence_type', title: 'Recurrence'},
          { id: 'day_of_week', title: 'Day Of Week'},
          { id: 'created_at', title: 'Add Date'},
        ]
    });

    if(reportData){
      await csvWriter.writeRecords(reportData);
    }

    console.log('Report made and done');
    var file = csvFilePath;
res.download(file, 'testfile.csv'); 
        },
    }}

module.exports=report;