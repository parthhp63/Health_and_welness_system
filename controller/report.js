const { Queue, Worker } = require('bullmq');
const mailService = require("../services/mailServices");
const cron = require('node-cron');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs').promises;
const path = require('path');
const db = require('../database/models/index');
// const {users}=db;

// Define Redis connection details
const redisConnection = {
    host: '127.0.0.1',
    port: 6379,
};
  
// Initialize BullMQ queue
const reportQueue = new Queue('report-generation', { connection: redisConnection });

const generateReportForUser = async (user) => {
    // console.log(user);
    console.log('generateReportForUser');
    const reportData = await db.sequelize.models.medication.findAll({
        attributes: ['id','start_date', 'end_date', 'time','recurrence_type', 'week_day', 'createdAt'],
        where : {
          user_id :user.id
        }}
    );

    const date = new Date();
    const currentDate = date.toISOString().split('T')[0]; 
    const csvFileName = `${user.id}_${currentDate}_report.csv`
    const csvFilePath = path.join(__dirname, '../public/', 'reports', csvFileName);
    console.log('csvFileNamecsvFileNamecsvFileNamecsvFileNamecsvFileName',csvFilePath);

    const csvWriter = createCsvWriter({
        path: csvFilePath,
        header: [
          { id: 'id', title: 'Id'},
          { id: 'start_date', title: 'Start Date'},
          { id: 'end_date', title: 'End Date'},
          { id: 'time', title: 'Time'},
          { id: 'recurrence', title: 'Recurrence'},
          { id: 'day_of_week', title: 'Day Of Week'},
          { id: 'created_at', title: 'Add Date'},
        ]
    });
    // console.log('csvwritetreweterer0',csvWriter);

    if(reportData){
      await csvWriter.writeRecords(reportData);
    }

    return { 
        csvFilePath: csvFilePath,
        csvFileName: csvFileName
    };
}

// Define the job processing function

async function processReportJob(job) {
    try{
        console.log('process report running');
        const date = new Date();
        const currentDate = date.toISOString().split('T')[0]; 
        let { user} = job.data;
        const { csvFilePath, csvFileName } = await generateReportForUser(user);
        const info = await mailService.sendEmail(user.email, 'Your Weekly Report', `Your Weekly Report generatred at ${currentDate}`, null, csvFilePath);


        // console.log('mail after',info);
        // await fs.unlink(csvFilePath);

    }catch(error){
        console.log(error);
    }

}

const worker = new Worker('report-generation', processReportJob, { connection: redisConnection });

async function getUsers() {
    console.log('gettiing users');
    let users = await db.sequelize.models.users.findAll({
        attributes: ['id', 'email']
    });
    return users;
}

// At 07:00 on every  Sunday.
const schedule = cron.schedule('0 7 * * 0', async () => {
    // console.log('corn run');
    const users = await getUsers();
    // console.log('users');
    users.forEach(user => {
        reportQueue.add('generate-report', { user });
    });
    console.log('Scheduled jobs for user report generation.');
});

schedule.start();