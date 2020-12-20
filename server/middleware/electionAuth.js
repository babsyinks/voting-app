const jwt = require('jsonwebtoken')
const path = require('path')
const{Egca} = require('../model/model')
require('dotenv').config({path:path.join('..','..','.env')});
require('dotenv').config({ debug: process.env.DEBUG })

const electionAuth = async (req,res,next)=>{

    try {

    const token = req.header('X-Auth-Token') || req.cookies.token
         
    if(typeof token !== 'string'){ 
        return res.json({authenticated:false})
    }
  
    const verifyObj = jwt.verify(token,process.env.TOKEN_SECRET)

    const user = await Egca.findById(verifyObj.user.id) 
    req.user = {myEgcaNum:user.egcaNum}
    next()
    } catch (error) {
        return res.status(401).json({authenticated:false})
    }
}

module.exports = electionAuth