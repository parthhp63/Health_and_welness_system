const db=require("../database/models/index");
const jwt=require('jsonwebtoken')
const medicationController=()=>{
    return{
        async recurringMedication(req,res){
            try{
                // console.log(req.body);
                if(`${req.body.frequency}`=='daily'){
                    const data={
                        user_id: `${req.user}`, 
                        file:`${req.file.filename}`,
                        recurrence_type:'reccurence',
                        start_date:`${req.body.startdate}`,
                        end_date:`${req.body.enddate}`,
                        frequency:`${req.body.frequency}`,
                        medicine_name:`${req.body.medicine}`,
                        description:`${req.body.description}`,
                        time:`${req.body.time}`,
                        week_day:'none'
                    };
                    await db.sequelize.models.medication.create(data);
                    res.redirect('/dashboard');
                }else{
                    const data={
                        user_id: `${req.user}`, 
                        file:`${req.file.filename}`,
                        recurrence_type:'reccurence',
                        start_date:`${req.body.startdate}`,
                        end_date:`${req.body.enddate}`,
                        frequency:`${req.body.frequency}`,
                        medicine_name:`${req.body.medicine}`,
                        description:`${req.body.description}`,
                        time:`${req.body.time}`,
                        week_day:`${req.body.day}`
                    };
                    await db.sequelize.models.medication.create(data);
                    // res.render("notify_medicine");
                    res.redirect('/dashboard');
                    
                }
            }catch(error){
                console.log(error);
            }
        },

        async onetimeMedication(req,res){
            try{
    
                const data={
                    user_id: `${req.user}`, 
                    medicine_name:`${req.body.medicine}`,
                    description:`${req.body.description}`,
                    file:`${req.file.filename}`,
                    recurrence_type:'none',
                    frequency:'one-time',
                    start_date:`${req.body.date}`,
                    end_date:`${req.body.date}`,
                    time:`${req.body.time}`,
                    week_day:'none'
                }
                await db.sequelize.models.medication.create(data);
                res.redirect('/dashboard');
                // res.render("notify_medicine")

            }catch(error){
                console.log(error);
            }
        },

        async medicationone(req,res){
            res.render("./sections/onetime.ejs");
        },

        async recurring(req,res){
            res.render("./sections/recurring.ejs")
        }
    }
}
module.exports=medicationController;