const express = require('express')
const {Election} = require('../model/model')
const auth = require('../middleware/auth')
const Router = express.Router()

Router.use(express.json())  

Router.post('/set',auth,async(req,res)=>{
    try {
        const electionArr = await Election.find({})
        const electionObj = electionArr[0]
        electionObj.electionDate = req.body
        await electionObj.save()
        res.json({message:'timer set'})  
    } catch (error) {
        res.json({message:error.message})
    }

})

Router.get('/cancel',auth,async(req,res)=>{
    try {
        const electionArr = await Election.find({})
        const electionObj = electionArr[0]
        electionObj.electionDate = null
        await electionObj.save()
        res.json({message:'timer cancelled'})  
    } catch (error) {
        res.json({message:error.message})
    }
})

Router.get('/status',async(req,res)=>{
    try {
        const electionArr = await Election.find({})
        const electionObj = electionArr[0]
        res.json(electionObj.electionDate)  
    } catch (error) {
        res.json({message:error.message})
    }
})

module.exports = Router