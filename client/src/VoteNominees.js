import React,{useEffect, useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {adminLogin} from './actions/adminActions'
import {loading,notLoading} from './actions/loadingActions'
import DisplayErrorMessage from './DisplayErrorMessage'
import ElectivePosition from './ElectivePosition'
import Loading from './Loading'
import './VoteNominees.css'
//import {displayMessage,dontDisplayMessage} from './actions/messageActions'

const VoteNominees = ({login,history,userAuthenticated,userInfo:{egcaNum,name},load,stopLoading,isLoading})=>{
    const[displayAlert,setDisplayAlert] = useState({display:false,cls:'',message:''})
    const[arrOfContestants,setArrOfContestants] = useState([])
    const[myEgcaNum,setMyEgcaNum] = useState(0)
    const[failedFetch,setFailedFetch] = useState(false)

    useEffect(()=>{
      const fetch = async()=>{
        try {
          load()
          const {data:{eleObj:electionArr,myEgcaNum}} = await axios.get('/election/details',{headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'X-Auth-Token':localStorage.getItem('token')
         }})
         setMyEgcaNum(myEgcaNum)
            setArrOfContestants(electionArr)
        } catch (error) {
          setFailedFetch(true)
          console.log(error.message)
        }
       stopLoading()
      }
      fetch()
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
          if(!isLoading){
            if(!failedFetch){
               return(
              <div className = "voteNomineesWrapper">
                  {displayAlert.display && <DisplayErrorMessage status = {displayAlert.cls}>{displayAlert.message}</DisplayErrorMessage>}
                    <div className = "headerTab">
                      <i className="fas fa-home" onClick = {goHome}></i>
                      <div>Welcome <span>{name}</span>.Please Proceed To Vote.</div>
                      <button onClick = {handleLogin}>Add Contestants</button> 
                    </div>
                    {arrOfContestants.map(({allVotes,contestants,position},i)=>{
                      return <ElectivePosition myEgcaNum = {myEgcaNum} categoryArr = {allVotes}  totalVotes = {allVotes.length} contestants = {contestants} position = {position} key = {i} />
                    })}
              </div>              
            )
            }
            else{
              return <h2>There Is Currently No Election Or Election Data Could Not Be Fetched</h2>
            }
          }
          else{
            return <Loading />
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