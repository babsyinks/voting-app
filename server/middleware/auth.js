const jwt = require('jsonwebtoken')
const path = require('path')
const{Egca} = require('../model/model')
require('dotenv').config({path:path.join('..','..','.env')});
require('dotenv').config({ debug: process.env.DEBUG })

const auth = async (req,res,next)=>{

    try {

    const token = req.header('X-Auth-Token') || req.cookies.token
         
    if(typeof token !== 'string'){ 
        return res.json({authenticated:false})
    }
  
    const verifyObj = jwt.verify(token,process.env.TOKEN_SECRET)

    const user = await Egca.findById(verifyObj.user.id) 
    
    const permittedUsers = [67]
    if(permittedUsers.includes(user.egcaNum)){
        next()
    }
    else{
        return res.json({authenticated:false})
    }
      
    } catch (error) {
        return res.status(404).json({authenticated:false})
    }
}

module.exports = auth