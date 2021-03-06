import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import DisplayErrorMessage from './DisplayErrorMessage'
import {userAuthenticated,userNotAuthenticated} from './actions/userActions'
import './Home.css';
import { setUserInfo } from './actions/userInfoAction'
import AddEmail from './AddEmail'

export const validateVal = (value,validator,setVal,setValidity,setIsSet)=>{
  const trimmedStr = value.replace(/\s/g,'') 
  const valid = validator(trimmedStr)
  setVal(value.replace(/\s+/g,''))
  setValidity(valid)
  value.length?setIsSet(true):setIsSet(false)
}

function Home({history,grantAccess,denyAccess,setInfo,userInformation}) {
  const[isDisabled,setIsDisabled] = useState(true)
  //const[surname,setSurname] = useState('')
  //const[surnameIsValid,setSurnameIsValid] = useState(false)
  //const[isSurnameSet,setIsSurnameSet] = useState(false)
  //const[firstName,setFirstName] = useState('')
  //const[firstNameIsValid,setFirstNameIsValid] = useState(false)
  //const[isFirstNameSet,setIsFirstNameSet] = useState(false)
  const[egcaNum,setEgcaNum] = useState('')
  const[egcaNumIsValid,setEgcaNumIsValid] = useState(false)
  const[isEgcaNumSet,setIsEgcaNumSet] = useState(false)
  const[openEmailPage,setOpenEmailPage] = useState(false)
/*   const[email,setEmail] = useState('')
  const[emailIsValid,setEmailIsValid] = useState(false)
  const[isEmailSet,setIsEmailSet] = useState(false) */
  //const[maidenName,setMaidenName] = useState('')
  //const[maidenNameIsValid,setMaidenNameIsValid] = useState(false)
  //const[isMaidenNameSet,setIsMaidenNameSet] = useState(false)
  //const[marital_status,setMarital_Status] = useState('single')
  //const[gender,setGender] = useState("male")
  const [value, onChange] = useState(new Date());
  const[showCalendar,setShowCalendar] = useState(false)
  const[showDateText,setShowDateText] = useState(false)
  const[dateText,setDateText] = useState('')
  const[displayAlert,setDisplayAlert] = useState({display:false,cls:'',message:''})

  useEffect(() => {
    if(egcaNumIsValid && dateText){
        setIsDisabled(false)
    }
    else{
        setIsDisabled(true)
    }

}, [egcaNumIsValid,dateText])

/*   useEffect(()=>{
    let mounted = true
   
    if(mounted){
      timer.current = setTimeout(()=>{
      hideMsg()
    },5000)
    }
    return function cleanUp(){
      mounted = false
      clearTimeout(timer.current)
    }
  //eslint-disable-next-line
  },[showMsg])
 */

const egcaNumValidator = (val)=>{
  const rawInput = +val
  if (Number.isNaN(rawInput) || rawInput === 0 || Math.sign(rawInput) !== 1 || rawInput < 1||rawInput>1500) {
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

/* const onChangeGender = (e)=>{
  setGender(e.target.value)
  if(maidenName !== ''){
    setMaidenName('')
    setIsMaidenNameSet(false)
    setMaidenNameIsValid(false)
  }
}

const onMaritalStausChange = (e)=>{
  setMarital_Status(e.target.value)
  if(maidenName !== ''){
    setMaidenName('')
    setIsMaidenNameSet(false)
    setMaidenNameIsValid(false)
  }
} */

const openCalendar = (e)=>{
  setShowCalendar(true)
}

const setCalendarDate = (dateObj)=>{
  onChange(dateObj)
  setShowDateText(true)
  const month = dateObj.getMonth() + 1
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()
  setDateText(`${month}/${day}/${year}`)
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
    const {data:{token,egcaNum,name}} = await axios.post('/auth/checkIdentity',alumniInfo)

    if(token){
      localStorage.setItem('token',token)
      grantAccess()
      setInfo(egcaNum,name)
      setOpenEmailPage(true)
    }
    else{
      denyAccess()
      setAlert('failed','Invalid Credentials!Please Enter Correct Information!!!')
      //showMsg()
    }
    
  } catch (error) {
    denyAccess()
    setAlert('failed','Invalid Credentials!Please Enter Correct Information!!!')
  }
}

if(openEmailPage){
  return <AddEmail history={history} name = {userInformation.name} egcaNum = {userInformation.egcaNum} />
}
else{
    return (
    <div className = "wrapper">
      {displayAlert.display&& <DisplayErrorMessage status = {displayAlert.cls}>{displayAlert.message}</DisplayErrorMessage>}
      <div className = "box">
        <div className="heading_wrapper"><h1>EGCA Alumni Voting App</h1><img src='vote.png' alt = 'vote icon'/></div>
        <h2>Welcome! Please provide your information below:</h2>
          <div className = "elements">
            <div>
              <label htmlFor='egcaNum'>E.G.C.A Number:</label><input type = "text" name = "egcaNum" minLength = "3" maxLength = "4" value = {egcaNum} onChange = {setValidEgcaNum} ></input>
              {isEgcaNumSet && <span className = "imgSpan"><img src = {egcaNumIsValid?'correct.jpg':'wrong.jpg'} alt = "this depicts EGCA Number validity"/></span>}
            </div>
            <div>
              <label htmlFor='dob'>Date Of Birth:</label>
              {showDateText && <input type = "text" name = "dateText" value = {dateText} readOnly = {true} ></input>}{!showCalendar && <button onClick = {openCalendar} className = "calendar_btn"></button>}
            </div>  
          </div>
          {showCalendar && <span className = 'calendar'><Calendar onChange={setCalendarDate} value={value}/></span>}
          <input id = "proceed" type = "button" value = "Proceed" disabled = {isDisabled} onClick = {handleSubmit}></input>
      </div>
  
    </div>
  );
}

}

const mapStateToProps = (state)=>({
  userInformation:state.userInfo
})

export default  connect(mapStateToProps,{grantAccess:userAuthenticated,denyAccess:userNotAuthenticated,setInfo:setUserInfo})(Home);
