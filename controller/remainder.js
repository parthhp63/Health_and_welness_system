const cron=require('node-cron');
const db=require("../database/models/index");
const mailServices=require("../services/mailServices");
const { DATE } = require('sequelize');
const { Op } = require('sequelize');
// const {users}=db;

const findmail= async(user_id)=>{
    try{
        const user = await db.sequelize.models.users.findByPk(user_id);
        return user.email;
    }catch(error){
        console.log(error);
    }
   };

   const notification=async(req,res)=>{
    try{
        const date=new Date();
        const nowDate=date.toISOString().split('T')[0]
        const time=date.toTimeString().split(' ')[0].slice(0, 5) + ':00';
        const day=date.toLocaleDateString('en-US', { weekday: 'long' }).toLocaleLowerCase();
    
        const weekly=await db.sequelize.models.medication.findAll({
            where:{
                frequency:'weekly',
                start_date:{
                    [Op.lte]:nowDate
                },
                end_date:{
                    [Op.gte]:nowDate
                },   
               
                time:time,
                week_day:day
            },
            raw : true
        });
        const daily=await db.sequelize.models.medication.findAll({
            where:{
                frequency:'daily',
                start_date:{
                    [Op.lte]:nowDate
                },
                end_date:{
                    [Op.gte]:nowDate
                },
                time:time
            },
            raw : true
    
        });
        const onetime=await db.sequelize.models.medication.findAll({
            where:{
                frequency:'one-time',
                start_date:nowDate,
                time:time
            },
                raw : true
            });

        let medicine = [ ...daily, ...onetime, ...weekly ]
    //  console.log(medicine);
    for(const med of medicine){
        console.log(med);
        let html=`
         <p> Medicine Time</p>
         <p> Medicine:- '${med.medicine_name}' </p>
         <img src='${med.file}' alt="medication file" />
        `;
        let email=await findmail(med.user_id);
        await mailServices.sendEmail(email, 'Medication Reminder', `It's time to take your medication.`,html,null);

    console.log(html);
    }
    //  console.log(mailServices);

    }catch(error){
        console.log(error);
    }
   }

   cron.schedule('* * * * *',async ()=>{
    notification();
   })
