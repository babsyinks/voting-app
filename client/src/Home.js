import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import DisplayErrorMessage from './DisplayErrorMessage'
import AddEmailPhone from './AddEmailPhone'
import TimerComp from './TimerComp'
import ComposeComp from './ComposeComp'
import './Home.css';
import {userAuthenticated,userNotAuthenticated} from './actions/userActions'
import { setUserInfo } from './actions/userInfoAction'
import {timerIsEnabled,timerIsDisabled} from './actions/timerActions'
import {loading,notLoading} from './actions/loadingActions'

export const validateVal = (value,validator,setVal,setValidity,setIsSet)=>{
  const trimmedStr = value.replace(/\s/g,'') 
  const valid = validator(trimmedStr)
  setVal(value.replace(/\s+/g,''))
  setValidity(valid)
  value.length?setIsSet(true):setIsSet(false)
}

function Home({history,grantAccess,denyAccess,setInfo,userInformation,toVote,timer,enableTimer,disableTimer,load,stopLoading,isLoading}) {
  const[isDisabled,setIsDisabled] = useState(true)
  const[egcaNum,setEgcaNum] = useState('')
  const[egcaNumIsValid,setEgcaNumIsValid] = useState(false)
  const[isEgcaNumSet,setIsEgcaNumSet] = useState(false)
  const[openEmailPhonePage,setOpenEmailPhonePage] = useState(false)
  const [value, onChange] = useState(new Date());
  const[showCalendar,setShowCalendar] = useState(false)
  const[showDateText,setShowDateText] = useState(false)
  const[dateText,setDateText] = useState('')
  const[displayAlert,setDisplayAlert] = useState({display:false,cls:'',message:''})
  const[emailPhone,setEmailPhone] = useState(null)

  useEffect(()=>{

    const getTimerStatus = async ()=>{
      load()
      const {data:timerStatus} = await axios.get('/timer/status')
      console.log(timerStatus)
      if(!timerStatus){
        disableTimer()
      }
      else if(timerStatus.message){
        console.log(timerStatus.message)
      }
      else{
        delete timerStatus._id
        enableTimer({...timerStatus,timerSet:true})
      }
      stopLoading()
    }

    getTimerStatus()
    
  },[enableTimer,disableTimer,load,stopLoading])

  useEffect(() => {
    if(egcaNumIsValid && dateText){
        setIsDisabled(false)
    }
    else{
        setIsDisabled(true)
    }

}, [egcaNumIsValid,dateText])

const egcaNumValidator = (val)=>{
  const rawInput = +val
  if (Number.isNaN(rawInput) || rawInput === 0 || Math.sign(rawInput) !== 1 || rawInput < 1||rawInput>2000) {
    return false
  }
  else{
    return true
  }
}

const setValidEgcaNum = (e)=>{
  const value = e.target.value
  validateVal(value,egcaNumValidator,setEgcaNum,setEgcaNumIsValid,setIsEgcaNumSet)
}

const openCalendar = (e)=>{
  setShowCalendar(true)
}

const setCalendarDate = (dateObj)=>{
  onChange(dateObj)
  setShowDateText(true)
  const month = dateObj.getMonth() + 1
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()
  setDateText(`${day}/${month}/${year}`)
  setShowCalendar(false)
}

const setAlert = (cls,message)=>{
  setDisplayAlert({display:true,cls,message})
  setTimeout(()=>{
    setDisplayAlert({display:false,cls:'',message:''})
  },5000)
}

const handleSubmit = async (e)=>{
  const alumniInfo = {egcaNum,dateText}
  try {
    const {data:{token,egcaNum,name,email_phone}} = await axios.post('/auth/checkIdentity',alumniInfo)

    if(token){
      localStorage.setItem('token',token)
      
      setInfo(egcaNum,name)
      if(email_phone.saved){
        if(toVote){
          grantAccess()
          history.push('/vote')
        }
        else{
          setEmailPhone(email_phone)
          setOpenEmailPhonePage(true)
        }
      }
      else{
        setOpenEmailPhonePage(true)
      }
    }
    else{
      denyAccess()
      setAlert('failed','Invalid Credentials!Please Enter Correct Information!!!')
    }
  } catch (error) {
    denyAccess()
    setAlert('failed','Invalid Credentials!Please Enter Correct Information!!!')
  }
}

const reset = ()=>{
  setOpenEmailPhonePage(false)
  setEgcaNum('')
  setDateText('')
  setIsEgcaNumSet(false)
  setShowDateText(false)
}

if(isLoading){
  return null
}
else{
  if(openEmailPhonePage){
    return <AddEmailPhone history={history} name = {userInformation.name} egcaNum = {userInformation.egcaNum} toVote = {toVote} emailPhoneHandler = {reset} emailPhone = {emailPhone} />
}
else{
  if(timer.timerSet){
      return (
            <ComposeComp>
              <h2 className = "eleMsg_start">The Election Will Start In:</h2>
                <TimerComp endTime = {timer.startDate}></TimerComp>
              <h2 className = "eleMsg_cb">Please Come Back To Vote By Then.</h2>
            </ComposeComp>
        );
  }
  else{ 
    return (
             <div className = "wrapper">
                {displayAlert.display&& <DisplayErrorMessage status = {displayAlert.cls}>{displayAlert.message}</DisplayErrorMessage>}
                <div className = "box">
                  {toVote?<div className="heading_wrapper"><h1>EGCA Alumni Voting App</h1><img src='vote.png' alt = 'vote icon'/></div>:(
                    <div className="heading_wrapper"><h1>EGCA Alumni Data Updating App</h1><img src='egca_logo.png' alt = 'egca logo'/></div>
                  )}
                  <h2>Welcome! Please provide your information below:</h2>
                    <div className = "elements">
                      <div>
                        <label htmlFor='egcaNum'>E.G.C.A Number:</label><input type = "text" name = "egcaNum" minLength = "3" maxLength = "4" value = {egcaNum} onChange = {setValidEgcaNum} placeholder=' e.g 86' ></input>
                        {isEgcaNumSet && <span className = "imgSpan"><img src = {egcaNumIsValid?'correct.jpg':'wrong.jpg'} alt = "this depicts EGCA Number validity"/></span>}
                      </div>
                      <div>
                        <label htmlFor='dob'>Date of Birth:</label>
                        {showDateText && <input type = "text" name = "dateText" value = {dateText} readOnly = {true} ></input>}{!showCalendar && <button onClick = {openCalendar} className = "calendar_btn"></button>}
                      </div>  
                    </div>
                    {showCalendar && <span className = 'calendar'><Calendar onChange={setCalendarDate} value={value}/></span>}
                    <input id = "proceed" type = "button" value = "Proceed" disabled = {isDisabled} onClick = {handleSubmit}></input>
                    <p className = 'help' onClick = {()=>{history.push('/help')}}>Can't Log In? Click Here For Help</p>
                </div>
            
              </div>
    )  

  }
    
}
}



}

const mapStateToProps = (state)=>({
  userInformation:state.userInfo,
  timer:state.timer,
  isLoading:state.isLoading
})

export default  connect(mapStateToProps,{grantAccess:userAuthenticated,denyAccess:userNotAuthenticated,setInfo:setUserInfo,enableTimer:timerIsEnabled,disableTimer:timerIsDisabled,load:loading,stopLoading:notLoading})(Home);
