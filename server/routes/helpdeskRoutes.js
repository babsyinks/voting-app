const express = require('express')
const path = require('path')
const {Egca} = require('../model/model')
const permittedAuth = require('../middleware/permittedAuth')
require('dotenv').config({path:path.join('..','..','.env')});
const Router = express.Router()
Router.use(express.json())

Router.post('/helpdesk',permittedAuth([178,182]),async (req,res)=>{
    const{egcaNum} = req.body
    const arrOfUpdatesKeys = Object.keys(req.body)
    const filteredUpdatesKeys = arrOfUpdatesKeys.filter((key)=>{
        return req.body[key] !==''
    })
    
    const objToUpdate = await Egca.findOne({egcaNum})
    let updateStatus = {authenticated:false}
    filteredUpdatesKeys.forEach((key)=>{
        if(key !== 'egcaNum'){
            objToUpdate[key] = req.body[key] 
            updateStatus = {authenticated:true}
        }
    })
    if(updateStatus.authenticated){
        await objToUpdate.save()
    }
    res.json(updateStatus)

})

Router.post('/namesearch',permittedAuth([178,182]),async (req,res)=>{
    const nameValidator = (str)=>{
        return  /^[a-z]+(-)?([a-z]+)?$/gi.test(str)
      }
    let{surname,firstName,advanced} = req.body
    
    surname = surname.toUpperCase()
    firstName = firstName.toUpperCase()
    if(nameValidator(surname) && nameValidator(firstName)){
        try {
            if(!advanced){
                const alumnObj = await Egca.findOne({surname,firstName})
                
                if(alumnObj){
                    res.json({result:[alumnObj],isExactMatch:true})
                }
                else{
                    const surnames = await Egca.find({surname})
                    const firstNames = await Egca.find({firstName})
                    let resultsArr = []

                    if(surnames.length > 0){
                        resultsArr = [...surnames]
                    }
                    if(firstNames.length > 0){
                        resultsArr = [...resultsArr,...firstNames]
                    }
                        res.json({result:resultsArr,isExactMatch:false}) 
                }
            }
            else{
                const surnames = await Egca.find({surname: new RegExp(surname,'i')})
                const firstNames = await Egca.find({firstName: new RegExp(firstName,'i')})
                const resultsArr = [...surnames,...firstNames]
                res.json({result:resultsArr,isExactMatch:false}) 
            }

        } catch (err) {
            console.log(err)
            res.json({result:[],isExactMatch:false,error:err.message})
        }
    }

})


module.exports = Router