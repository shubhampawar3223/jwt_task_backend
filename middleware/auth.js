require('dotenv').config()
const jwt = require('jsonwebtoken')
const models = require('../models')


//function to verify token. 
const verifyToken = async(req,res,next) =>{
    try{
        if(!req.headers.authorization){
            throw new Error('No authorization token.')            
        }    

        jwt.verify(req.headers.authorization,process.env.JWT_KEY,async(err,user)=>{
            if(!user || err){
            throw new Error('Unauthorised.')            
            }
            req.user = await models.User.findOne({
                where:{
                    email:user.email
                }
            })
            next()
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send(error.message)   
    }
}

module.exports = verifyToken