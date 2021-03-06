import React,{useEffect, useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import validator from 'validator'
import {validateVal} from './Home'
import {userNotAuthenticated} from './actions/userActions'
import './AddEmail.css'

const AddEmail = ({history,name,denyAccess})=>{
const[isDisabled,setIsDisabled] = useState(true)
const[email,setEmail] = useState('')
const[emailIsValid,setEmailIsValid] = useState(false)
const[isEmailSet,setIsEmailSet] = useState(false)

const[currentLink,setCurrentLink] = useState('almost.jpg')

useEffect(()=>{
const pixLinks = ['almost.jpg','step.png','email.gif']
  const galleryDisp = setInterval(function(){
  const indexOfLink = pixLinks.indexOf(currentLink)
  if(indexOfLink === 2){
    setCurrentLink(pixLinks[0])
  }
  else{
    setCurrentLink(pixLinks[indexOfLink + 1] )
  } 
   
  },4000)

  return function cleanUp(){
    clearInterval(galleryDisp)
  }
  
},[currentLink])

useEffect(() => {
  if(emailIsValid){
      setIsDisabled(false)
  }
  else{
      setIsDisabled(true)
  }

}, [emailIsValid])

const setValidEmail = (e)=>{
  const value = e.target.value
  validateVal(value,validator.isEmail,setEmail,setEmailIsValid,setIsEmailSet)
} 

const handleSubmit = async (e)=>{
    try {
      if(email.length>0){
        const {data:{message}} = await axios.post('/auth/email',
        {email},{headers:{'X-Auth-Token':localStorage.getItem('token'),'Accept':'application/json','Content-Type':'application/json'}})
        if(message === 'Email Saved'){
          history.push('/vote')
        }
        else{
          localStorage.removeItem('token')
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          throw new Error(message)
        }
      }
      else{
        throw new Error('Email is required')
      }
      
    } catch (error) {
      console.log(error.message)
      denyAccess()
    }
    
  }
    return (
            <div className="outer_add">
                <div className = "inner_add">
                    <h2>{`Hello, ${name}. Its great to have you here.`}</h2>
                    <div className = "pic_add">
                        <img src= {currentLink} alt="guides user to enter email"/>
                    </div>
                    <div className = "email_add">
                    <label htmlFor='email'>Email:</label><input type = "email" name = "email" value = {email} onChange = {setValidEmail} ></input>
                    {isEmailSet && <span className = "imgSpan"><img src = {emailIsValid?'correct.jpg':'wrong.jpg'} alt = "this depicts email validity"/></span>}
                    <input id = "proceed" type = "button" value = "Proceed" disabled = {isDisabled} onClick = {handleSubmit}></input>
                    </div>
                </div>
            </div>
            )
}

const mapStateToProps = (state)=>({
    userAuthenticated:state.user.userIsAuthenticated,
    adminAuthenticated:state.admin.adminIsAuthenticated,
    userInfo:state.userInfo,
    isLoading:state.isLoading
})

export default connect(mapStateToProps,{denyAccess:userNotAuthenticated})(AddEmail)

