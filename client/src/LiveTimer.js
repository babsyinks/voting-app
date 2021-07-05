import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {timerIsDisabled,liveTimerIsDisabled} from './actions/timerActions'
import Countdown from 'react-countdown';
import './LiveTimer.css';

// Random component
const Completionist = () => <span className = 'electionCountDown' ><span>Election Is Now Over!</span></span>; 
const crt = (t)=>{
  return t<=1?'':'s'
}

function LiveTimer({electionEndTime,disableTimer,disableLiveTimer}){
  const[countDownOver,setCountDownOver] = useState(false)
  useEffect(()=>{
    const checkCountDown = async()=>{
          if(countDownOver){
            try {
              const res = await axios.get('/timer/end')
              if(res.data.message === 'election over'){
                disableTimer({startDate:null,endDate:null})
                disableLiveTimer() 
              }        
              else{
                console.log(res.message)
              }      
            } catch (error) {
              console.log(error.message)
            }


          }
    }
    checkCountDown()
  },[countDownOver,disableTimer,disableLiveTimer])

  // Renderer callback with condition
const renderer = ({days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
        setCountDownOver(true)     
        return <Completionist />;

  } else {
    // Render a countdown
    return <span className = 'electionCountDown'><span>Election Will End In:</span> {days} day{crt(days)}, {hours} hour{crt(hours)}, {minutes} minute{crt(minutes)}, {seconds} second{crt(seconds)}.</span>;
  }
};

  return (
      <Countdown 
      date={electionEndTime}
      renderer={renderer}
      />
  )
}

export default connect(null,{disableTimer:timerIsDisabled,disableLiveTimer:liveTimerIsDisabled})(LiveTimer) 