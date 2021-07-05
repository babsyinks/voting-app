import React,{useEffect} from "react";
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import {timerIsDisabled} from './actions/timerActions'
import "./TimerComp.css";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

function TimerComp({endTime,disableTimer,history}) {
  const startTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const remainingTime = endTime/1000 - startTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  useEffect(()=>{
    let timerInterval
    const checkTimerStatus = async ()=>{
      const endTimeSecs = endTime/1000
      timerInterval = setInterval(()=>{
       const remainingTimeSecs = endTimeSecs - Date.now()/1000
       const timerStatus = async ()=>{
        if(remainingTimeSecs <=0){
            const res = await axios.get('/timer/cancelStart')
              if(res.data.message === 'timer cancelled'){
                  disableTimer()
                  clearInterval(timerInterval)
              }
              else{
                console.log(res.data.message)
              }  
      } 
       }
       timerStatus()
      },1000)
  }
  checkTimerStatus()

  return ()=>{
    clearInterval(timerInterval)
  }
  },[disableTimer,history,endTime])

  return (
    <div className="App">
      <CountdownCircleTimer
        {...timerProps}
        colors={[["#7E2E84"]]}
        duration={daysDuration}
        initialRemainingTime={remainingTime}
      >
        {({ elapsedTime }) =>
          renderTime("days", getTimeDays(daysDuration - elapsedTime))
        }
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors={[["#D14081"]]}
        duration={daySeconds}
        initialRemainingTime={remainingTime % daySeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > hourSeconds
        ]}
      >
        {({ elapsedTime }) =>
          renderTime("hours", getTimeHours(daySeconds - elapsedTime))
        }
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors={[["#EF798A"]]}
        duration={hourSeconds}
        initialRemainingTime={remainingTime % hourSeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > minuteSeconds
        ]}
      >
        {({ elapsedTime }) =>
          renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))
        }
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors={[["#218380"]]}
        duration={minuteSeconds}
        initialRemainingTime={remainingTime % minuteSeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > 0
        ]}
      >
        {({ elapsedTime }) =>
          renderTime("seconds", getTimeSeconds(elapsedTime))
        }
      </CountdownCircleTimer>
    </div>
  );
}

export default withRouter(connect(null,{disableTimer:timerIsDisabled}) (TimerComp)) 
