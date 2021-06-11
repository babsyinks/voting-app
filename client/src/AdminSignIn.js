import React,{useState} from 'react'
import ComposeComp from './ComposeComp'
import './AdminSignin.css'
import {adminLogin} from './actions/adminActions'
import {connect} from 'react-redux'
import axios from 'axios'
function AdminSignIn({login,history}) {

    const[dob,setDob] = useState('')
    const[egcaNum,setEgcaNum] = useState('')
    const[errorMsg,setErrorMsg] = useState('')
    const[formattedDate,setFormattedDate] = useState('') 

    const handleSetEgcaNum = (e)=>{
        const rawInput = +e.target.value
        if (Number.isNaN(rawInput) || rawInput === 0 || Math.sign(rawInput) !== 1 || rawInput < 1||rawInput>2000) {
            setEgcaNum('')
        }
        else{
          setEgcaNum(e.target.value)
          
        }
    }

    const handleSetDob = (e)=>{
        //14/3/1985
        //1985-3-14
        const dateArr = e.target.value.split('-')
    
        const fmDate = dateArr.reduceRight((acc,v,i)=>{

            if(i !== 0){
              return acc + v + '/'  
            }
            else{
                return acc + v
            }
            
        },'')
        setDob(e.target.value)
        setFormattedDate(fmDate)
    }

    const adminLogin = async ()=>{

        const alumniInfo = {egcaNum,dateText:formattedDate}
        try {
            const {data:{token}} = await axios.post('/auth/checkIdentity',alumniInfo)

            if(token){
            localStorage.setItem('token',token)
            }
            else{
                setErrorMsg('Invalid Login Credentials!')
            }
            const data = await login()
           
            if(data === 'success'){
                history.push('/admin') 
            }
            else{
                setErrorMsg('Only An Administrator Can Login!')
            }
        } catch (error) {
            setErrorMsg('Only An Administrator Can Login!')
        }
    }


    return (
        <ComposeComp>
            <div className = 'admin_signin_Wrap'>
            <h2>Admin Sign In</h2>
            <div><label>EGCA Number:</label> <input type = 'text' onChange = {handleSetEgcaNum} value = {egcaNum} className = 'admin_input'></input></div>   
            <div><label>Date of Birth:</label> <input type = 'date' onChange = {handleSetDob} value = {dob} className = 'admin_input'></input></div>
            </div>
            {egcaNum && dob && <button value = 'Login' className = "adminLogin_btn" onClick = {adminLogin}>Login</button>}
            {errorMsg && <div className = 'errorAdmin'>{errorMsg}</div>}
        </ComposeComp>
    )
}

const mapStateToProps = (state)=>({
    adminAuthenticated:state.admin.adminIsAuthenticated,
})

export default connect(mapStateToProps,{login:adminLogin})(AdminSignIn) 
