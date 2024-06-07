const db = require("../database/models");
const jwt=require('jsonwebtoken')
const mailServices=require("../services/mailServices");
const UserAgent = require('user-agents');  
const bcrypt = require('bcrypt');
const {users}=db;

const dashboard=()=>{
    return{
        async allMedicine(req,res){
            const med=await db.sequelize.models.medication.findAll({
                where:{
                    user_id:`${req.user}`
                },
               
            } )
            // const all=[]
            res.render('./sections/dashboard.ejs',{med:med})
            // res.json(med);

        },
        async newmed(req,res){
            const med=await db.sequelize.models.medication.findAll({
                where:{
                    user_id:`${req.user}`
                },
               
            } )
            // const all=[]
            res.json(med);
        }

    }
}

module.exports=dashboard;