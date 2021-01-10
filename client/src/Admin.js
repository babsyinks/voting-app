import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import DisplayErrorMessage from './DisplayErrorMessage'
//import {displayMessage,dontDisplayMessage} from './actions/messageActions'
import './Admin.css'

const Admin = ({adminAuthenticated,history})=>{
  const[surname,setSurname] = useState('')
  const[firstName,setFirstName] = useState('')
  const[egcaNum,setEgcaNum] = useState('')
  const[post,setPost] = useState('President')  
  const[manifesto,setManifesto] = useState('')
  const[picture,setPicture] = useState('')
  let[resetFile,setResetFile] = useState(0)
  const[isDisabled,setIsDisabled] = useState(true)
  const[displayAlert,setDisplayAlert] = useState({display:false,cls:'',message:''})
 /*  const timer = useRef()
  timer.current = ()=>setTimeout(()=>{
      setDisplayAlert({display:false,cls:'',message:''})
    },5000)

  let timerRes = useRef()
     */
  
/*    useEffect(()=>{
    let mounted = true
    if(mounted){
      hideMsg()
    }
    return function cleanUp(){
      mounted = false
      clearTimeout(timer.current)
    }
    //eslint-disable-next-line
  },[])  */

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
  },[showMsg,hideMsg]) */


  useEffect(()=>{

    if(surname&&firstName&&post&&manifesto&&picture){
      setIsDisabled(false)
    }
    else{
      setIsDisabled(true)
    }

  },[surname,firstName,post,manifesto,picture])

/*   useEffect(()=>{
    //let mounted = true

    return function cleanUp(){
      //mounted = false
      clearTimeout(timerRes.current)
    }
    //eslint-disable-next-line
  },[displayAlert]) */

  const onSetSurname = (e)=>{
    setSurname(e.target.value)
  }
  const onSetFirstName = (e)=>{
    setFirstName(e.target.value)
  }
  const onSetEgcaNum = (e)=>{
    setEgcaNum(e.target.value)
  }
  const onSetPost = (e)=>{
    setPost(e.target.value)
  }

  const onSetManifesto = (e)=>{
    setManifesto(e.target.value)
  }

  const onSetPicture = (e)=>{
    setPicture(e.target.files[0])

  }

  const goHome = ()=>{
    history.push('/')
  }

  const goVote = ()=>{
    history.push('/vote')
  }

  const setAlert = (cls,message)=>{
    setDisplayAlert({display:true,cls,message})
    setTimeout(()=>{
      setDisplayAlert({display:false,cls:'',message:''})
    },5000)
   /* timerRes.current = timer.current() */
  }

  const handleSubmitVals = async(e)=>{
    const formData = new FormData()
    formData.set('surname',surname)
    formData.set('firstName',firstName)
    formData.set('egcaNum',egcaNum)
    formData.set('post',post)
    formData.set('manifesto',manifesto)
    formData.set('picture',picture)
    try {  
   
      await axios.post('/election/contestants',formData,{headers:{
      'Content-Type':'multipart/form-data',
      'X-Auth-Token':localStorage.getItem('token')
   }
  })
 
  setAlert('success','New Contestant Successfully Added!!!')
  
  }
  catch (err) {
    setAlert('failed',err.error?err.error:'Oops Something Went Wrong!!!')
    
  }
   setSurname('')
   setFirstName('')
   setEgcaNum('')
   setPost('President')
   setManifesto('')
   setPicture('')
   setResetFile(++resetFile)
  } 

  if(adminAuthenticated){

    return(
      <div className="admin">
        {displayAlert.display && <DisplayErrorMessage status = {displayAlert.cls}>{displayAlert.message}</DisplayErrorMessage>}
        <h1>Add A Contestant</h1>
          <div>
            <label htmlFor='surname'>Surname:</label><input type = "text" name = "surname" value = {surname} onChange = {onSetSurname} ></input>
          </div>
          <div>
            <label htmlFor='firstName'>First Name:</label><input type = "text" name = "firstName" value = {firstName} onChange = {onSetFirstName} ></input>
          </div>
          <div>
            <label htmlFor='egcaNum'>E.G.C.A Number:</label><input type = "text" name = "egcaNum" minLength = "3" maxLength = "4" value = {egcaNum} onChange = {onSetEgcaNum} ></input>
          </div>
          <div>
            <label htmlFor='post'>Post:</label>
            <select name = "post" value ={post} onChange = {onSetPost}>
              <option value = "president" >President</option>
              <option value = "vice president">Vice President</option>
              <option value = "general secretary">General Secretary</option>
              <option value = "assistant general secretary">Assistant General Secretary</option>
              <option value = "national treasurer">National Treasurer</option>
              <option value = "national financial secretary">National Financial Secretary</option>
              <option value = "national social welfare officer">National Social/Welfare Officer</option>
              <option value = "national public relations officer">National Public Relations Officer</option>
              <option value = "national legal adviser">National Legal Adviser</option>
              <option value = "national internal auditor">National Internal Auditor</option>
              <option value = "chief whip">Chief Whip</option>
            </select>
          </div>
          <div>
            <label htmlFor='manifesto'>Manifesto:</label><textarea rows = "10" cols = "40" name = "manifesto" value = {manifesto} onChange = {onSetManifesto} style={{resize:'none'}}></textarea>
          </div>
          <div>
            <label htmlFor='picture'>Upload Picture:</label><input type = "file" name = "picture" key = {resetFile}  onChange = {onSetPicture}></input>
          </div>
          <div className = "buttons">
          <button id="submit" type="button" disabled = {isDisabled} onClick = {handleSubmitVals}><i className="fas fa-plus" onClick = {goHome}></i></button>
          <button id="goHome" type="button"><i className="fas fa-home" onClick = {goHome}></i></button>
          <button id="goVote" type="button"><i className="fas fa-poll" onClick = {goVote}></i></button>
          </div>
      </div>
  )
  }
  else{
    history.push('/vote')
    return null
  }
    
}

const mapStateToProps = (state)=>({
  adminAuthenticated:state.admin.adminIsAuthenticated,
})

export default connect(mapStateToProps)(Admin)