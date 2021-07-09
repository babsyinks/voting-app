import React,{useState,Fragment} from 'react'
import ComposeComp from './ComposeComp'
import {connect} from 'react-redux'
import axios from 'axios'
import {userAuthenticated,userNotAuthenticated} from './actions/userActions'
import './HelpDesk.css'

function HelpDesk({userAuthenticated,grantAccess,denyAccess}) {

    const[dob,setDob] = useState('')
    const[egcaNum,setEgcaNum] = useState('')
    const[statusMsg,setStatusMsg] = useState({msg:'',status:''})
    const[formattedDate,setFormattedDate] = useState('') 
    const[name,setName] = useState('')
    const[searchName, setSearchName] = useState(false)
    const[firstName,setFirstName] = useState('')
    const[surName,setSurName] = useState('')
    const[searchResults,setSearchResults] = useState([])
    const[openSearchResults,setOpenSearchResults] = useState(false)
    const[advancedSearch,setAdvancedSearch] = useState(false)

    const linearGrad = 'linear-gradient(to right, rgb(3 3 94), rgb(159 255 241), rgb(154 54 249))'

    const handleSetStatusMessage = (msg,status)=>{
        setStatusMsg({msg,status})
        setTimeout(()=>{
            setStatusMsg({msg:'',status:''})
        },4000)
    }

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

    const helpDeskLogin = async ()=>{

        const alumniInfo = {egcaNum,dateText:formattedDate}
        try {
            const {data:{token,egcaNum,name}} = await axios.post('/auth/checkIdentity',alumniInfo)

            if(token){
            localStorage.setItem('token',token)
            if(egcaNum === '178' || egcaNum === '182'){
                setName(name.toLowerCase())
                setEgcaNum('')
                setDob('')
                grantAccess()
            }
            else{
                handleSetStatusMessage('Only Help Desk Personnel Can Login!','errorHelpDesk')
                denyAccess()
            }
            
            }
            else{
                handleSetStatusMessage('Invalid Login Credentials!','errorHelpDesk')
                denyAccess()
            }
        } catch (error) {
            console.log(error.message)
            handleSetStatusMessage('Error!Login Failed!!!','errorHelpDesk')
        }
    }

    const updateAlumniInfo = async ()=>{
        try {
            const {data:{authenticated}} = await axios.post('help/helpdesk',{egcaNum,dateText:formattedDate},{headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'X-Auth-Token':localStorage.getItem('token')
             }}) 

             if(authenticated){
                handleSetStatusMessage('Update Successfull!','successHelpDesk')
             }
             else{
                handleSetStatusMessage('Update Failed!!!','errorHelpDesk')
             }

        } catch (error) {
            console.log(error.message)
            handleSetStatusMessage('Error!Update Failed!!!','errorHelpDesk')
        }
    }

    const nameValidator = (str)=>{
      return  /^[a-z]+(-)?([a-z]+)?$/gi.test(str)
    }

    const handleSetSurname = (e)=>{
        const text = e.target.value
        if(text.length > 0){
            if(nameValidator(text)){
                setSurName(text)
            }            
        }
        else{
            setSurName('')
        }

    }

    const handleSetFirstname = (e)=>{
        const text = e.target.value
        if(text.length>0){
            if(nameValidator(text)){
                setFirstName(text)
            }
        }
        else{
            setFirstName('')
        }

    }

    const searchAlumni = async(advanced)=>{
        const searchResult = await axios.post('/help/namesearch',{surname:surName,firstName,advanced},{headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'X-Auth-Token':localStorage.getItem('token')
         }})
         setSearchResults(searchResult.data)
         setOpenSearchResults(true)
         if(advanced){
             setAdvancedSearch(true)
         }
         else{
            setAdvancedSearch(false)
         }
    }

    const handleSearchResultClick = (result)=>{
        setOpenSearchResults()
        setSearchName()
        setEgcaNum(result.egcaNum)
    }

    const gotoUpdatePage = ()=>{
        setOpenSearchResults()
        setSearchName()
    }

        if(userAuthenticated){
            if(openSearchResults){
                return(
                 <ComposeComp linearGrad = {linearGrad} overflow = {true} width = '80%' height = '90%'>
                    <div className = 'helpdesk_signin_Wrap search_wrapper'>
                    <h2 className = "search_header">Search Results</h2>
                    {!searchResults.result.length && <h3>Person Searched Couldn't Be Found</h3>}
                    {searchResults.result.length && <h3>Click On A Result To Load It Into The Update Page</h3>}
                    {searchResults.result.length && searchResults.result.map((result,i)=>{
                        return <div key = {i} className = "search_res" onClick = {()=>{handleSearchResultClick(result)}}>
                                <span className = "search_details"><label>Name:</label><span className = "search_vals">{` ${result.surname.toLowerCase()} ${result.firstName.toLowerCase()}`}</span></span>
                                <span className = "search_details"><label>Date of Birth:</label><span className = "search_vals">{` ${result.dob}`}</span></span>
                                <span className = "search_details"><label>Egca Number:</label><span className = "search_vals">{` ${result.egcaNum}`}</span></span>
                                <span className = "search_details"><label>Gender:</label><span className = "search_vals">{` ${result.gender}`}</span></span> 
                               </div>
                    })
                    }
                    </div>
                    {!advancedSearch && (
                        <Fragment>
                            <h3 className = 'advanced_search_header'>Can't Get Desired Result? Try Advanced Search</h3>
                            <button value = 'Advanced Search' className = "helpSt helpdesk_btn" onClick = {()=>{searchAlumni(true)}}>Advanced Search</button>     
                        </Fragment>
                    )}
                    <button value = 'Go To Update Page' className = "helpSt goto_update" onClick = {gotoUpdatePage}>Go To Update Page</button>
                </ComposeComp>                   
                )
            }
            else if(searchName){
                return(
                <ComposeComp linearGrad = {linearGrad}>
                    <div className = 'helpdesk_signin_Wrap'>
                    <h3>Search Alumni By Name</h3>
                    <div><label>Surname:</label> <input type = 'text' onChange = {handleSetSurname} value = {surName} className = 'helpdesk_input'></input></div>   
                    <div><label>Firstname:</label> <input type = 'text' onChange = {handleSetFirstname} value = {firstName} className = 'helpdesk_input'></input></div>
                    </div>
                    {surName && firstName && <button value = 'Search' className = "helpSt helpdesk_btn" onClick = {()=>{searchAlumni(false)}}>Search</button>}
                    {statusMsg.msg && <div className = {`${statusMsg.status}`}>{statusMsg.msg}</div>}
                </ComposeComp>
                )

            }
            else{
              return (
                <ComposeComp linearGrad = {linearGrad}>
                   <Fragment> 
                    <div className = 'helpdesk_signin_Wrap'>
                    <h2>{`Welcome ${name}.`}</h2>
                    <h3>Update Date Of Birth</h3>
                    <div><label>EGCA Number:</label> <input type = 'text' onChange = {handleSetEgcaNum} value = {egcaNum} className = 'helpdesk_input'></input></div>   
                    <div><label>Date of Birth:</label> <input type = 'date' onChange = {handleSetDob} value = {dob} className = 'helpdesk_input'></input></div>
                    </div>
                    {egcaNum && dob && <button value = 'Update' className = "helpSt helpdesk_btn" onClick = {updateAlumniInfo}>Update</button>}
                    {statusMsg.msg && <div className = {`${statusMsg.status}`}>{statusMsg.msg}</div>}
                    <div className = 'helpdesk_signin_Wrap name_search_container'>
                     <hr></hr>   
                    <h2>Or</h2>
                    <button className = 'helpSt search_by_name' onClick = {()=>{setSearchName(true)}}>Search By Name</button>
                  </div>
                  </Fragment>
                </ComposeComp>
            )  
            }   
        }
        else{
            return (
                <ComposeComp linearGrad = {linearGrad}>
                    <div className = 'helpdesk_signin_Wrap'>
                    <h2>Help Desk Sign In</h2>
                    <div><label>EGCA Number:</label> <input type = 'text' onChange = {handleSetEgcaNum} value = {egcaNum} className = 'helpdesk_input'></input></div>   
                    <div><label>Date of Birth:</label> <input type = 'date' onChange = {handleSetDob} value = {dob} className = 'helpdesk_input'></input></div>
                    </div>
                    {egcaNum && dob && <button value = 'Login' className = "helpSt helpdeskLogin_btn" onClick = {helpDeskLogin}>Login</button>}
                    {statusMsg.msg && <div className = {`${statusMsg.status}`}>{statusMsg.msg}</div>}
                </ComposeComp>
            )
        }
}

const mapStateToProps = (state)=>({
    userAuthenticated:state.user.userIsAuthenticated
})

export default connect(mapStateToProps,{grantAccess:userAuthenticated,denyAccess:userNotAuthenticated})(HelpDesk) 
