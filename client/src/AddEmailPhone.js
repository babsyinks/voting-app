import React,{useEffect, useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import validator from 'validator'
import {validateVal} from './Home'
import {userNotAuthenticated} from './actions/userActions'
import Modal from './Modal'
import './AddEmailPhone.css'

const AddEmailPhone = ({history,name,denyAccess,toVote,emailPhoneHandler,emailPhone})=>{
const[isDisabled,setIsDisabled] = useState(true)
const[email,setEmail] = useState('')
const[emailIsValid,setEmailIsValid] = useState(false)
const[isEmailSet,setIsEmailSet] = useState(false)
const[phone,setPhone] = useState('')
const[phoneIsValid,setPhoneIsValid] = useState(false)
const[isPhoneSet,setIsPhoneSet] = useState(false)
const[currentLink,setCurrentLink] = useState('almost.jpg')
const[openModal,setOpenModal] = useState(false)

useEffect(()=>{
  if(emailPhone){
    setEmail(emailPhone.email)
    setEmailIsValid(true)
    setIsEmailSet(true)
    setPhone(emailPhone.phone)
    setPhoneIsValid(true)
    setIsPhoneSet(true)
  }
},[emailPhone])

useEffect(()=>{
const pixLinks = ['almost.jpg','step.png','fill_form.gif']
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
  if(emailIsValid && phoneIsValid){
      setIsDisabled(false)
  }
  else{
      setIsDisabled(true)
  }
}, [emailIsValid,phoneIsValid])

const setValidEmail = (e)=>{
  const value = e.target.value
  validateVal(value,validator.isEmail,setEmail,setEmailIsValid,setIsEmailSet)
} 

const setValidPhone = (e)=>{
  const value = e.target.value
  validateVal(value,validator.isMobilePhone,setPhone,setPhoneIsValid,setIsPhoneSet)
}

const handleSubmit = async (e)=>{
    try {
      if(email.length>0 && phone.length>0){
        const {data:{message}} = await axios.post('/auth/email_phone',
        {email,phone},{headers:{'X-Auth-Token':localStorage.getItem('token'),'Accept':'application/json','Content-Type':'application/json'}})
        if(message === 'Email And Phone Number Saved'){
          setOpenModal(true)
        }
        else{
          localStorage.removeItem('token')
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          throw new Error(message)
        }
      }
      else{
        throw new Error('Email and phone number is required')
      }
    } catch (error) {
      console.log(error.message)
      denyAccess()
    }
  }

  const positiveHandler = ()=>{
    history.push('/vote')
  }

  const negativeHandler = ()=>{
    emailPhoneHandler()
  }

  const objAboutVote = {message:'Your information has been saved! Will you like to proceed to vote?',
  positiveBtnText:'Proceed',
  showPositiveBtn:true,
  negativeBtnText:'Exit',
  showNegativeBtn:true,
  positiveHandlerFn:positiveHandler,
  negativeHandlerFn:negativeHandler
}

const objAboutInfo = {message:'Your information has been saved! Thank You.',
positiveBtnText:'OK',
showPositiveBtn:true,
negativeBtnText:'',
showNegativeBtn:false,
positiveHandlerFn:negativeHandler,
negativeHandlerFn:null
}

const{message,positiveBtnText,showPositiveBtn,negativeBtnText,showNegativeBtn,positiveHandlerFn,negativeHandlerFn} = toVote? objAboutVote:objAboutInfo


    return (
            <div className="outer_add">
                <div className = "inner_add">
                    <h2>{`Hello, ${name}. Its great to have you here.`}</h2>
                    <div className = "pic_add">
                        <img src= {currentLink} alt="guides user to enter email and phone number"/>
                    </div>
                    {emailPhone && <h2>You previously submitted your email and phone number.You can edit and resubmit them below:</h2>}
                    <div className = "form_add">
                    <label htmlFor='email'>Email:</label><input type = "email" name = "email" value = {email} onChange = {setValidEmail} ></input>
                    {isEmailSet && <span className = "imgSpan"><img src = {emailIsValid?'correct.jpg':'wrong.jpg'} alt = "this depicts email validity"/></span>}
                    <label htmlFor='phone'>Phone Number:</label><input type = "text" name = "phone" value = {phone} onChange = {setValidPhone} ></input>
                    {isPhoneSet && <span className = "imgSpan"><img src = {phoneIsValid?'correct.jpg':'wrong.jpg'} alt = "this depicts phone number validity"/></span>}
                    <input id = "proceed" type = "button" value = "Submit" disabled = {isDisabled} onClick = {handleSubmit}></input>
                    </div>
                </div>
                {openModal && <Modal message = {message} positiveBtnTxt = {showPositiveBtn && positiveBtnText}  negativeBtnTxt = {showNegativeBtn && negativeBtnText} positiveHandler = {positiveHandlerFn} negativeHandler = {negativeHandlerFn} />}
            </div>
            )
}

/* const mapStateToProps = (state)=>({
    userAuthenticated:state.user.userIsAuthenticated,
    adminAuthenticated:state.admin.adminIsAuthenticated,
    userInfo:state.userInfo,
    isLoading:state.isLoading
}) */

export default connect(null,{denyAccess:userNotAuthenticated})(AddEmailPhone)

