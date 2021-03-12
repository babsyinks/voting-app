import React,{useEffect, useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {adminLogin} from './actions/adminActions'
import {loading,notLoading} from './actions/loadingActions'
import DisplayErrorMessage from './DisplayErrorMessage'
import ElectivePosition from './ElectivePosition'
import './VoteNominees.css'
//import {displayMessage,dontDisplayMessage} from './actions/messageActions'

const VoteNominees = ({login,history,userAuthenticated,userInfo:{egcaNum,name},load,stopLoading,isLoading})=>{
    const[displayAlert,setDisplayAlert] = useState({display:false,cls:'',message:''})
    const[arrOfContestants,setArrOfContestants] = useState([])
    const[myEgcaNum,setMyEgcaNum] = useState(0)
    const[failedFetch,setFailedFetch] = useState(false)
    

    useEffect(()=>{
      let unmounted = false;
      let source = axios.CancelToken.source()
      const fetch = async()=>{
        if(!unmounted){
           try {
            load()
            const {data:{eleObj:electionArr,myEgcaNum}} = await axios.get('/election/details',{headers:{
              'Accept':'application/json',
              'Content-Type':'application/json',
              'X-Auth-Token':localStorage.getItem('token')
            },cancelToken: source.token})
            setMyEgcaNum(myEgcaNum)
            setArrOfContestants(electionArr)
            } catch (error) {
              setFailedFetch(true)
              console.log(error.message)
              if (axios.isCancel(error)) {
                console.log(`request cancelled:${error.message}`);
            } else {
                console.log("another error thrown:" + error.message);
            }
            }
            stopLoading()
          }
        
      }
      fetch()
      return function cleanUp(){
        unmounted = true
        source.cancel("Cancelling in cleanup");
      }
      //eslint-disable-next-line
    },[])

      const setAlert = (cls,message)=>{
        setDisplayAlert({display:true,cls,message})
        setTimeout(()=>{
          setDisplayAlert({display:false,cls:'',message:''})
        },5000)
      }

    const handleLogin = async()=>{
        try {
            const data = await login()
           
            if(data === 'success'){
                history.push('/admin') 
            }
            else{
                setAlert('failed','Only An Administrator Has The Privileges To Add A Contestant!!!')
            }
        } catch (error) {
            setAlert('failed','Only An Administrator Has The Privileges To Add A Contestant!!!')
        }
    }

    const goHome = ()=>{
        history.push('/')
    }
        if(userAuthenticated){
            if(!failedFetch){
               return(
              <div className = "voteNomineesWrapper">
                  {displayAlert.display && <DisplayErrorMessage status = {displayAlert.cls}>{displayAlert.message}</DisplayErrorMessage>}
                    <div className = "headerTab">
                      <i className="fas fa-home" onClick = {goHome}></i>
                      <div>Welcome <span style = {{textTransform:'capitalize'}}>{name.toLowerCase()}.</span> Please Proceed To Vote.</div>
                      <button onClick = {handleLogin} className = {isLoading?'sp':''}>{isLoading?<i className="fas fa-circle-notch fa-spin fa-xs"></i>:'Add Contestants'}</button> 
                    </div> 
                    {arrOfContestants.map(({allVotes,contestants,position},i)=>{ 
                      return <ElectivePosition myEgcaNum = {myEgcaNum} categoryArr = {allVotes}  totalVotes = {allVotes.length}
                                               contestants = {contestants} position = {position} key = {i} 
                                               /> 
                    })}
              </div>              
            )
            }
            else{
              return (
                <div className = "voteNomineesWrapper">
                  {displayAlert.display && <DisplayErrorMessage status = {displayAlert.cls}>{displayAlert.message}</DisplayErrorMessage>}
                  <button style = {{padding:'10px',fontWeight:'bold'}} onClick = {handleLogin}>Add Contestants</button> 
                  <h2 style = {{textAlign:'center',height:'100vh',color:'white'}}>There Is Currently No Election Or Election Data Could Not Be Fetched</h2>
                </div>
                
              )
            }
        }
        else{
            history.push('/')
            return null  
        } 
}

const mapStateToProps = (state)=>({
    userAuthenticated:state.user.userIsAuthenticated,
    adminAuthenticated:state.admin.adminIsAuthenticated,
    userInfo:state.userInfo,
    isLoading:state.isLoading
})

export default connect(mapStateToProps,{login:adminLogin,load:loading,stopLoading:notLoading})(VoteNominees)