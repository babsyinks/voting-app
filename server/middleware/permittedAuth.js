const jwt = require('jsonwebtoken')
const path = require('path')
const{Egca} = require('../model/model')
require('dotenv').config({path:path.join('..','..','.env')});
require('dotenv').config({ debug: process.env.DEBUG })

const permittedAuth = (permittedUsers)=> async (req,res,next)=>{

    try {

    const token = req.headers['x-auth-token']
    const verifyObj = jwt.verify(token,process.env.TOKEN_SECRET)
    const user = await Egca.findById(verifyObj.user.id) 
    if(!user){ 
        return res.json({authenticated:false})
    }
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

module.exports = permittedAuth