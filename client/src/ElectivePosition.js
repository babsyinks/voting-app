import React, { useState,useEffect} from 'react'
import Contestant from './Contestant'
import './ElectivePosition.css'

const ElectivePosition = ({myEgcaNum,totalVotes,contestants,position,categoryArr})=>{

    const[totCatVotes,setTotCatVotes] = useState(totalVotes)
    const[buttonisDisabled,setButtonisDisabled] = useState(false)
    const[egcaNumber,setEgcaNumber] = useState(0)

    useEffect(()=>{
        if(categoryArr.includes(myEgcaNum)){
            setButtonisDisabled(true)
        }
        
    },[myEgcaNum,setButtonisDisabled,categoryArr])

    const updateCategoryVotes = (votes)=>{
        setTotCatVotes(votes)
    }

    const disableButtons = (egcaNumber)=>{
        setButtonisDisabled(true)
        setEgcaNumber(egcaNumber)
    }

    return(
        <div className = "electionDetails">
            <div className = "electionIntro">
                <div className = "electionHead">
                    <h2>Position: <span>{position}</span></h2>
                </div>
                <div className = "electionHead">
                   <h3>Number Of Contestants: <span className = "numOfContestants">{contestants.length}</span></h3> 
                </div>
                <div className = "electionHead">
                    <h3>Total Votes Cast: <span>{totCatVotes}</span></h3>
                </div>
                                
            </div>

            <div className = "listOfContestants">
            {contestants.map(({egcaNum,surname,firstName,manifesto,picture,votes})=>{return(
            <Contestant 
              myEgcaNum = {myEgcaNum}  
              egcaNum = {egcaNum}
              name = {`${surname} ${firstName}`}
              manifesto = {manifesto}
              picture = {picture} 
              votes = {votes.length} 
              totalVotes = {totCatVotes} 
              setCategoryVotes = {updateCategoryVotes} 
              position = {position} 
              disableButton = {disableButtons}
              isButtonDisabled = {buttonisDisabled}
              votedForThisContestant = {egcaNumber === egcaNum || votes.includes(myEgcaNum)}
              key = {egcaNum} />
            )})}
            </div>
        </div>
    )
}
export default ElectivePosition