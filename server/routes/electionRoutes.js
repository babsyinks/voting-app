const express = require('express')
const sharp = require('sharp')
const multer = require('multer')
const auth = require('../middleware/auth')
const electionAuth = require('../middleware/electionAuth')
const {Election} = require('../model/model')
const Router = express.Router()
Router.use(express.json())

const upload = multer({
    limits:{fileSize:1000000 },
    fileFilter(req,file,cb){    
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
       return cb(new Error("invalid image format."))
    }
    cb(undefined,true)
       },
       onError : function(err, next) {
        console.log('error', err);
        next(err);
      }
    })  

Router.post('/contestants',auth,upload.single('picture'),async(req,res)=>{

    const buffer = await sharp(req.file.buffer).resize({width:300,height:300}).png().toBuffer() 
    const{surname,firstName,post,manifesto} = req.body
    const egcaNum = +req.body.egcaNum
    if(Number.isNaN(egcaNum)||!egcaNum){
        return res.status(400).send({error:'invalid egcaNum'})
    }
    const contestant = {surname,firstName,egcaNum,manifesto,picture:buffer,votes:[]}
    let allElections = await Election.find({})
    const allELeObj = allElections[0]
    if(allElections.length === 0){
        const electionObj = {position:post,allVotes:[],contestants:[]}
        electionObj.contestants.push(contestant)
        allElections.positions = []
        allElections.positions.push(electionObj)
        allElections.allContestants = []
        allElections.allContestants.push(egcaNum)
        allElections = new Election(allElections)
        await allElections.save()
    }
    else{
        if(allELeObj.allContestants.find((num)=>num === egcaNum)){
            return res.status(403).send({error:'This contestant has been added already'})
        }
        else{
            const eleObj =  allELeObj.positions.find((obj)=>obj.position === post)
            if(!eleObj){
                const contestants = []
                contestants.push(contestant)
                allELeObj.positions.push({position:post,allVotes:[],contestants})
                allELeObj.allContestants.push(egcaNum)
                await allELeObj.save()
            }
            else{
              eleObj.contestants.push(contestant)
              allELeObj.allContestants.push(egcaNum)
              await allELeObj.save()
            }
          }
           
        }
        res.json({message:'success'})

},(err,req,res,next)=>{
    res.status(404).send({error:err.message})
})

Router.get('/details',electionAuth,async(req,res)=>{
    const{myEgcaNum} = req.user
    let allElections = await Election.find({})
    const allELeObj = allElections[0]
    if(allElections.length === 0){
     return res.status(404).send({message:'There Is Currently No Election.'})
    }
    else{
        res.json({eleObj:allELeObj.positions,myEgcaNum})
    }
})

Router.patch('/vote',electionAuth,async(req,res)=>{
    try {
        const{myEgcaNum,egcaNum,position} = req.body
        let allElections = await Election.find({})
        const allELeObj = allElections[0]
        const eleObj = allELeObj.positions.find((pos)=>pos.position === position)
        const allVotes = eleObj.allVotes
        allVotes.push(myEgcaNum)
        const contestantObj = eleObj.contestants.find((obj)=>obj.egcaNum === egcaNum)
        const contestantVotes = contestantObj.votes
        contestantVotes.push(myEgcaNum)
        await allELeObj.save()
        res.json({allVotes,contestantVotes})        
    } catch (error) {
        res.status(400).send({message:error.message})
    }

})

module.exports = Router
