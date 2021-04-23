import React, { useState,useEffect} from 'react'
import Contestant from './Contestant'
import './ElectivePosition.css'

const ElectivePosition = ({myEgcaNum,totalVotes,contestants,position,categoryArr})=>{

    const[totCatVotes,setTotCatVotes] = useState(totalVotes)
    const[buttonisDisabled,setButtonisDisabled] = useState(false)
    const[egcaNumber,setEgcaNumber] = useState(0)
    const[votePercentColor,setVotePercentColor] = useState({})
    const [theContestants,setTheContestants] = useState(contestants)

    const colorizeVotePercent = (contestants)=>{
        
        const sortedContestants = contestants.slice().sort((c1,c2)=>c1.votes.length - c2.votes.length)
        const obj = {}
        const smallest = sortedContestants[0]
        const biggest = sortedContestants[contestants.length-1]
        if(sortedContestants.length>1){
            if(smallest.votes.length === 0 && biggest.votes.length === 0){
                obj[smallest.egcaNum] = 'yellow' 
                obj[biggest.egcaNum] = 'yellow'
            }
            else if(sortedContestants.length === 2){
                 if(smallest.votes.length === 0 && biggest.votes.length !== 0){
                    obj[smallest.egcaNum] = 'red'
                    obj[biggest.egcaNum] = 'rgb(0, 255, 0)'
                }
                else if(smallest.votes.length ===  biggest.votes.length){
                    obj[smallest.egcaNum] = 'rgb(0, 255, 0)'
                    obj[biggest.egcaNum] = 'rgb(0, 255, 0)'
                }
                else{
                    obj[smallest.egcaNum] = 'red'
                    obj[biggest.egcaNum] = 'rgb(0, 255, 0)'
                }
            }

            else{
                obj[smallest.egcaNum] = 'red'
                obj[biggest.egcaNum] = 'rgb(0, 255, 0)'
            }
        }
        else{
            obj[smallest.egcaNum] = 'yellow'
        }
        if(sortedContestants.length>2){
            if(smallest.votes.length ===  biggest.votes.length){
                obj[smallest.egcaNum] = 'rgb(0, 255, 0)'
                obj[biggest.egcaNum] = 'rgb(0, 255, 0)'
            }
            const[last] = sortedContestants.splice(0,1)
            const[first] = sortedContestants.splice(sortedContestants.length-1,1)
                sortedContestants.forEach((contestantObj)=>{
                     if(contestantObj.votes.length === last.votes.length){
                         if(obj[smallest.egcaNum] === 'rgb(0, 255, 0)'){
                            obj[contestantObj.egcaNum] = 'rgb(0, 255, 0'
                         }
                         else{
                             obj[contestantObj.egcaNum] = 'red'
                         }
                        
                    }
                    else if(contestantObj.votes.length === first.votes.length){
                        obj[contestantObj.egcaNum] = 'rgb(0, 255, 0)'
                    }
                    else{
                        obj[contestantObj.egcaNum] = 'yellow'
                    }
                
        })
        
        }
        setVotePercentColor(obj)
    }

    useEffect(()=>{
        colorizeVotePercent(theContestants)
        //eslint-disable-next-line
    },[])

    useEffect(()=>{
        if(categoryArr.includes(myEgcaNum)){
            setButtonisDisabled(true)
        }
        
    },[myEgcaNum,setButtonisDisabled,categoryArr])

    const updateContestantVotes = (votes,egcaNum)=>{
       const updatedContestants = theContestants.map((c)=>{    
                if(c.egcaNum === egcaNum){
                        c.votes = votes
                        return c
                    }
                    return c
        })
        setTheContestants(updatedContestants)
        colorizeVotePercent(theContestants)
    }

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
                   <h3>Number Of Contestants: <span className = "numOfContestants">{theContestants.length}</span></h3> 
                </div>
                <div className = "electionHead">
                    <h3>Total Votes Cast: <span>{totCatVotes}</span></h3>
                </div>
                                
            </div>

            <div className = "listOfContestants">
            {theContestants.map(({egcaNum,surname,firstName,manifesto,picture,votes})=>{return(
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
              votePercentColor = {votePercentColor}
              addToContestantVotes = {updateContestantVotes}
              key = {egcaNum} />
            )})}
            </div>
        </div>
    )
}
export default ElectivePosition