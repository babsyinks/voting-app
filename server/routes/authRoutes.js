const express = require('express')
const jwt = require('jsonwebtoken')
const path = require('path')
const validator = require('validator')
const {Egca} = require('../model/model')
const electionAuth = require('../middleware/electionAuth')
const permittedAuth = require('../middleware/permittedAuth')
require('dotenv').config({path:path.join('..','..','.env')});
const Router = express.Router()
Router.use(express.json())

Router.post('/checkIdentity',async (req,res)=>{
    try {
        const{egcaNum,dateText} = req.body

        const egcaObj = await Egca.findOne({egcaNum})

        const validateDOB = (dobFromFrontEnd,dobFromDB)=>{
            //date string of form 11/23/2005 is split into array storing month,day and year sequentially
            const[dayFFE,monthFFE,yearFFE] = dobFromFrontEnd.split('/')
            const [dayFDB,monthFDB,yearFDB] = dobFromDB.split('/')
            //create date obj using strings of form year,month,day sequentially and compare their time 
            return new Date(+yearFFE,+monthFFE-1,+dayFFE).getTime() === new Date(+yearFDB,+monthFDB-1,+dayFDB).getTime()
        }
        const validEgcaNum = +egcaNum === egcaObj.egcaNum
    
        const validDob = validateDOB(dateText,egcaObj.dob)

        const validObj = {validEgcaNum,validDob}

        const arrOfInfos = Object.values(validObj)
        const statusOfInfos = arrOfInfos.every((val)=>val)
        if(statusOfInfos){
            const email_phone = (egcaObj.email.length > 0 && egcaObj.phone.length >0)?{email:egcaObj.email,phone:egcaObj.phone,saved:true}:{saved:false}
            const token = jwt.sign({user:{id:egcaObj.id}},process.env.TOKEN_SECRET,{expiresIn:24*60*60*1000})
            res.cookie('token',token,{httpOnly:true,expires:new Date(Date.now() + 24*60*60*1000)})
            res.json({egcaNum,name:`${egcaObj.surname} ${egcaObj.firstName}`,token,email_phone}) 
        }
        else{
            res.json({validObj})
        }
      
    } catch (error) {
        res.status(404).send({error:error.message})
    }

})

Router.post('/email_phone',electionAuth,async(req,res)=>{
    const egcaAlumnus = await Egca.findOne({egcaNum:req.user.myEgcaNum})
    const {email,phone} = req.body
    if(email.length>0 && phone.length>0){
        const trimmedEmail = email.replace(/\s/g,'') 
        const validEmail = validator.isEmail(trimmedEmail)
        const trimmedPhone = phone.replace(/\s/g,'')
        const validPhone = validator.isMobilePhone(trimmedPhone)
        
        if(validEmail && validPhone){
            egcaAlumnus.email = trimmedEmail
            egcaAlumnus.phone = trimmedPhone
            await egcaAlumnus.save()
            res.json({message:'Email And Phone Number Saved'})
        }
        else{
            res.status(400).send({message:'Invalid Email Or Phone Number'})
        }

    }
    else{
        res.status(400).send({message:'Invalid Email Or Phone Number'})
    }

})

Router.get('/admin/login',permittedAuth([67]),(req,res)=>{
     res.json({authenticated:true})
})

module.exports = Router