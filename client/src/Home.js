import React,{useState,useEffect,Fragment} from 'react'
import validator from 'validator'
import './Home.css';
function Home() {
  const[isDisabled,setIsDisabled] = useState(true)
  const[surname,setSurname] = useState('')
  const[surnameIsValid,setSurnameIsValid] = useState(false)
  const[isSurnameSet,setIsSurnameSet] = useState(false)
  const[firstName,setFirstName] = useState('')
  const[firstNameIsValid,setFirstNameIsValid] = useState(false)
  const[isFirstNameSet,setIsFirstNameSet] = useState(false)
  const[egcaNum,setEgcaNum] = useState('')
  const[egcaNumIsValid,setEgcaNumIsValid] = useState(false)
  const[isEgcaNumSet,setIsEgcaNumSet] = useState(false)
  const[email,setEmail] = useState('')
  const[emailIsValid,setEmailIsValid] = useState(false)
  const[isEmailSet,setIsEmailSet] = useState(false)
  const[maidenName,setMaidenName] = useState('')
  const[maidenNameIsValid,setMaidenNameIsValid] = useState(false)
  const[isMaidenNameSet,setIsMaidenNameSet] = useState(false)
  const[marital_status,setMarital_Status] = useState('single')
  const[gender,setGender] = useState("male")

  useEffect(() => {
    if(emailIsValid&& surnameIsValid && firstNameIsValid && egcaNumIsValid && ((gender === "female" && marital_status === "married")?maidenNameIsValid:true)){
        setIsDisabled(false)
    }
    else{
        setIsDisabled(true)
    }
}, [emailIsValid,surnameIsValid,firstNameIsValid,egcaNumIsValid,maidenNameIsValid,gender,marital_status])

const validateVal = (value,validator,setVal,setValidity,setIsSet)=>{
  
  const trimmedStr = value.replace(/\s/g,'') 
  const valid = validator(trimmedStr)
  setVal(value.replace(/\s+/g,''))
  setValidity(valid)
  value.length?setIsSet(true):setIsSet(false)
}

const egcaNumValidator = (val)=>{
  const rawInput = +val
  if (Number.isNaN(rawInput) || rawInput === 0 || Math.sign(rawInput) !== 1 || rawInput < 1||rawInput>1500) {
    return false
  }
  else{
    return true
  }
}
const setValidSurname = (e)=>{
  const value = e.target.value
  validateVal(value,validator.isAlpha,setSurname,setSurnameIsValid,setIsSurnameSet)
}

const setValidFirstName = (e)=>{
  const value = e.target.value
  validateVal(value,validator.isAlpha,setFirstName,setFirstNameIsValid,setIsFirstNameSet)
}
const setValidEmail = (e)=>{
  const value = e.target.value
  validateVal(value,validator.isEmail,setEmail,setEmailIsValid,setIsEmailSet)
}

const setValidEgcaNum = (e)=>{
  const value = e.target.value
  validateVal(value,egcaNumValidator,setEgcaNum,setEgcaNumIsValid,setIsEgcaNumSet)
}

const setValidMaidenName = (e)=>{
  const value = e.target.value
  validateVal(value,validator.isAlpha,setMaidenName,setMaidenNameIsValid,setIsMaidenNameSet)
}

const onChangeGender = (e)=>{
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
}
  return (
    <div className = "wrapper">
      <div className = "box">
        <h1>EGCA Alumni Voting App</h1>
        <fieldset>
          <legend>Please Provide Your Information Below!</legend>
          <div className = "elements">
            <div>
              <label htmlFor='email'>Email:</label><input type = "email" name = "email" value = {email} onChange = {setValidEmail} ></input>
              {isEmailSet && <span className = "imgSpan"><img src = {emailIsValid?'correct.jpg':'wrong.jpg'} alt = "this depicts email validity"/></span>}
            </div>
            <div>
              <label htmlFor='surname'>Surname:</label><input type = "text" name = "surname" value = {surname} onChange = {setValidSurname} ></input>
              {isSurnameSet && <span className = "imgSpan"><img src = {surnameIsValid?'correct.jpg':'wrong.jpg'} alt = "this depicts surname validity"/></span>}
            </div>
            <div>
              <label htmlFor='firstName'>First Name:</label><input type = "text" name = "firstName" value = {firstName} onChange = {setValidFirstName} ></input>
              {isFirstNameSet && <span className = "imgSpan"><img src = {firstNameIsValid?'correct.jpg':'wrong.jpg'} alt = "this depicts first name validity"/></span>}
            </div>
            <div>
              <label htmlFor='egcaNum'>E.G.C.A Number:</label><input type = "text" name = "egcaNum" minLength = "3" maxLength = "4" value = {egcaNum} onChange = {setValidEgcaNum} ></input>
              {isEgcaNumSet && <span className = "imgSpan"><img src = {egcaNumIsValid?'correct.jpg':'wrong.jpg'} alt = "this depicts EGCA Number validity"/></span>}
            </div>
              <div>
                <label htmlFor='gender'>Sex:</label>
                <span>
                  <input type = "radio" name = "gender" value = "male" onChange = {onChangeGender} checked = {gender === "male"}></input><label>Male</label>
                  <input type = "radio" name = "gender" value = "female" onChange = {onChangeGender} checked = {gender === "female"}></input><label>Female</label>
                </span>             
              </div>
              {gender === "female" && (
              <Fragment>
                <div>
                  <label htmlFor='marital_status'>Marital Status:</label>
                  <span>
                    <input type = "radio" name = "marital_status" value = "single" onChange = {onMaritalStausChange} checked = {marital_status === "single"}></input><label>Single</label>
                    <input type = "radio" name = "marital_status" value = "married" onChange = {onMaritalStausChange} checked = {marital_status === "married"}></input><label>Married</label>
                  </span>                  
                </div>
                {marital_status === "married" && (
                  <div>
                    <label htmlFor='maidenName'>Maiden Name:</label><input type = "text" name = "maidenName" value = {maidenName} onChange = {setValidMaidenName} ></input>
                    {isMaidenNameSet && <span className = "imgSpan"><img src = {maidenNameIsValid?'correct.jpg':'wrong.jpg'} alt = "this depicts maiden name validity"/></span>}
                  </div>
                )}
              </Fragment>)}
          </div>
          
          <input id = "proceed" type = "button" value = "Proceed" disabled = {isDisabled}></input>
        </fieldset>
      </div>
  
    </div>
  );
}

export default Home;
