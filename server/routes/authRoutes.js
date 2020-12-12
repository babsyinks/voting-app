const express = require('express')
const Egca = require('../model/model')
const Router = express.Router()
Router.use(express.json())

Router.post('/checkIdentity',async (req,res)=>{
    try {
        const{surname,firstName,email,egcaNum,gender,dateText} = req.body
        const egcaObj = await Egca.findOne({egcaNum})

        const validateName = (nameFromFrontend,nameFromDB)=>{
            nameFromFrontend = nameFromFrontend.toLowerCase()
            nameFromDB = nameFromDB.toLowerCase()
            if(nameFromFrontend.length>2 && nameFromDB.length>2){
                return  nameFromFrontend.includes(nameFromDB) || nameFromDB.includes(nameFromFrontend) 
            }
            return false
        }

        const validateDOB = (dobFromFrontEnd,dobFromDB)=>{
            //date string of form 11/23/2005 is split into array storing month,day and year sequentially
            const[monthFFE,dayFFE,yearFFE] = dobFromFrontEnd.split('/')
            const [monthFDB,dayFDB,yearFDB] = dobFromDB.split('/')
            //create date obj using strings of form year,month,day sequentially and compare their time 
            return new Date(+yearFFE,+monthFFE-1,+dayFFE).getTime() === new Date(+yearFDB,+monthFDB-1,+dayFDB).getTime()
        }

        const validateMaidenName = (maidenNameFFE,maidenFDB)=>{
        return validateName(maidenNameFFE,maidenFDB) || validateName(maidenNameFFE,egcaObj.surname)
        }

        const validEgcaNum = +egcaNum === egcaObj.egcaNum
        const validSurname = surname.toLowerCase() === egcaObj.surname.toLowerCase() ||validateName(surname,egcaObj.surname)
        const validFirstName = firstName.toLowerCase() === egcaObj.firstName.toLowerCase()||validateName(firstName,egcaObj.firstName)
        const validDob = validateDOB(dateText,egcaObj.dob)
        const validGender = gender.toLowerCase() === egcaObj.gender.toLowerCase()

        const validObj = {validEgcaNum,validSurname,validFirstName,validDob,validGender}

        if(egcaObj.email.length === 0){
            egcaObj.email = email
            egcaObj = await egcaObj.save()
        }
        if(gender === 'female' && req.body.maritalStatus === 'married'){
            const validMaidenName = validateMaidenName(req.body.maidenName,egcaObj.maidenName)
            validObj.validMaidenName = validMaidenName
        }
        res.json(validObj)       
    } catch (error) {
        res.status(404).send({error:error.message})
    }

})

module.exports = Router