const db=require("../database/models/index");
const jwt=require('jsonwebtoken')
const mailServices=require("../services/mailServices");
const UserAgent = require('user-agents');  
const bcrypt = require('bcrypt');
const {users}=db;


const homeController=()=>{
    return{
        async register(req,res){
            res.render("./sections/registration");
        },

        async adduser(req,res){
            try{            
                // console.log(req.body);
                const password=await bcrypt.hash(`${req.body.password}`,5)
                const data={
                    fname: `${req.body.fname}`, 
                    lname:`${req.body.lname}`,
                    email:`${req.body.email}`,
                    dob:`${req.body.dob}`,
                    mobile_no:`${req.body.mobile}`,
                    age:`${req.body.age}`,
                    password:password 
                }
                // console.log(password);
                await db.sequelize.models.users.create(data);     
                // to,subject,text,html,attachments
                const html=`<h3>Username:${req.body.email}</h3>
                          <h3>password:${req.body.password}</h3>`;
                        //   console.log('registert mail service calling');

                mailServices.sendEmail(req.body.email,'Thank for registration','Health and Wellness',html,null)
                // res.status(200).send({status:'ok'});
                res.redirect('/login');

            }catch(error){
                console.log(error);
                res.send(error);
                
            }

        },

        async login(req,res){
            res.render("./sections/login")
        },

        async loginUser(req,res){
            try{
                const user = await db.sequelize.models.users.findOne({ where: { email: `${req.body.email}` } });
                // console.log(user);
                if(user==null){
                    return res.status(401).json({message:"Wrong Credentials"})
                }
                else if(user!==null){
                    let password=await bcrypt.compare(`${req.body.password}`, user.password);
                    if(password==false || password==null){
                        // console.log('wrong credentials');
                        return res.status(401).json({message:"Wrong Credentials"})
                    }
                    else{
                        let payload={
                            id:user.id
                        }
                        const token=await jwt.sign(payload,'Parth12',{expiresIn:'1h'});
                        res.cookie('token',token,{
                            httpOnly:true,
                            maxAge:360000
                        })
                        console.log('req.cookie',`${token}`);
                        
                        const session={
                            user_id:user.id,
                            session:token
                        }
                        await db.sequelize.models.sessions.create(session);
                        // console.log(session);
                      return  res.status(200).send({ status: 'ok' });
                    }
                }
            }catch(error){
                console.log(error);
            }
        },

        async dashboard(req,res){
            res.render("./sections/dashboard")
        },
        async medication(req,res){
         try{
            res.render("./sections/medication")
         }catch(err){
            console.log(err);
         }
        }
        
    }
}

module.exports=homeController;