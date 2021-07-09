const mongoose = require('mongoose')
const egcaSchema = new mongoose.Schema({
   email:{
       type:String, 
       trim:true
   },
   surname:{
    type:String,
    trim:true,
    required:[true,'Surname is required']
   },
   firstName:{
       type:String,
       trim:true,
       required:[true,'First name is required']
   },
   maidenName:{
       type:String,
       trim:true,
   },
   gender:{
       type:String,
   },
   egcaNum:{
    type:Number,
    required:[true,'EGCA Number is required'],
    unique:true
   },
   dob:{
    type:String,
    required:[true,'Date of birth is required']
   },
   phone:{
       type:String,
       trim:true
   }
})

const Egca = mongoose.model('alumni',egcaSchema)

const contestantsSchema = new mongoose.Schema({
    surname:String,
    firstName:String,
    egcaNum:Number,
    manifesto:String,
    picture:String,
    votes:[Number]
})

const electivePositionsSchema = new mongoose.Schema({
    position:String,
    allVotes:[Number],
    contestants:[contestantsSchema]
})

const electionTimerSchema = new mongoose.Schema({
    startDate:Number,
    endDate:Number
})

const electionSchema = new mongoose.Schema({
    positions:[electivePositionsSchema],
    allContestants:[Number],
    electionDate:{
        type:electionTimerSchema,
        default:null
    }
})

const Election = mongoose.model('election',electionSchema)
module.exports = {Egca,Election}