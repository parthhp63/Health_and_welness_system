const db = require("../database/models");

const demo=()=>{
    return{
        async data(req,res){
            const a=await db.sequelize.models.medication.findAll({
                attributes: ['id','start_date', 'end_date', 'time','recurrence_type', 'week_day', 'createdAt'],
                where : {
                  user_id : 12
                }});
                res.json(a);
        }

    }
}


module.exports=demo;