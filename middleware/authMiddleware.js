const jwt = require('jsonwebtoken');
const db=require("../database/models/index");

const authMiddleware=async(req,res,next)=>{
    // console.log('calling middleware');
    const token=req.cookies.token;
    // console.log(token);
    if(!token){
        return res.redirect('/login');
    }

    try{

        const decoded = jwt.verify(token,'Parth12')
        const user = await db.sequelize.models.users.findByPk(decoded.id);

        if(user){
            req.user = decoded.id;
            // console.log('``````````````````````````',req.user);
            console.log(token);
            const data = await db.sequelize.models.sessions.findOne({ where: 
                { user_id:req.user,
                           session:token } });
         if(data){
            // console.log('data',data); 
            next();
         }
         else{
            res.clearCookie('token');
            return res.redirect('/login'); 
         }


            
        }else{
            res.clearCookie('token');
            return res.redirect('/login'); 
        }
    }catch{
        res.clearCookie('token');
            return res.redirect('/login'); 
    }
}
module.exports = authMiddleware;