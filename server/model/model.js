const mongoose = require('mongoose')
const egcaSchema = new mongoose.Schema({
   email:{
       type:String,
       unique:true,
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
       required:true
   },
   egcaNum:{
    type:Number,
    required:[true,'EGCA Number is required'],
    unique:true
   },
   dob:{
    type:String,
    required:[true,'Date of birth is required']
   }
})

const Egca = mongoose.model('alumni',egcaSchema)

module.exports = Egca