const express = require('express')
const {Election} = require('../model/model')
const permittedAuth = require('../middleware/permittedAuth')
const Router = express.Router()

Router.use(express.json())  

Router.post('/set',permittedAuth([67]),async(req,res)=>{
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


Router.get('/cancel',permittedAuth([67]),async (req,res)=>{
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

Router.get('/cancelStart',async (req,res)=>{
    try {
        const electionArr = await Election.find({})
        const electionObj = electionArr[0]
        electionObj.electionDate.startDate = null
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

Router.get('/end',async(req,res)=>{
    try {
        const electionArr = await Election.find({})
        const electionObj = electionArr[0]
        electionObj.electionDate.endDate = null
        await electionObj.save()
        res.json({message:'election over'})  
    } catch (error) {
        res.json({message:error.message})
    }
})
module.exports = Router