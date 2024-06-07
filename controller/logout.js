const db = require("../database/models");
const { Op } = require('sequelize');

const logout = () => {
    return {
        async logout(req, res) {
            {
                await db.sequelize.models.sessions.destroy(
                    {
                        where: {
                            user_id: `${req.user}`,
                            session: `${req.cookies.token}`
                            
                        },
                    },
                );
                res.clearCookie("token");
                res.redirect("/login");
            }
        },

        async logoutAll(req,res){
                await db.sequelize.models.sessions.destroy(
                        {
                            where:{
                                user_id: `${req.user}`,
                            }
                        }
                    
                )
            res.clearCookie("token");
            res.redirect("/login");
        },

        async logoutOther(req,res){


            await db.sequelize.models.sessions.destroy(
                {
                    where:{
                        user_id: `${req.user}`,
                        session:{
                            [Op.ne]: `${req.cookies.token}`
                        }
                    }
                }
            
        )

    // res.clearCookie("token");
    res.redirect("/dashboard");

        }
    }
}

module.exports = logout;