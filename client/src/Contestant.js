import React, { useState } from 'react'
import axios from 'axios'
import './Contestant.css'
const Contestant = ({myEgcaNum,egcaNum,name,manifesto,picture,votes,totalVotes,position,setCategoryVotes,disableButton,isButtonDisabled,votedForThisContestant,addToContestantVotes,votePercentColor})=>{
    
    const[readManifesto,setManifesto] = useState(false)
    //const[contestantVotes,setContestantVotes] = useState(votes)
    const[disableVote,setDisableVote] = useState(false)

    const votePercent = ()=>{
        let votePercent = votes/totalVotes
        if(votes === 0 && totalVotes === 0){
            votePercent = 0
        }
        else{
           votePercent = votePercent *100 
        } 

        return votePercent
    }

    const getManifesto = ()=>{
        setManifesto(true)
    }

    const closeManifesto = ()=>{
        setManifesto(false)
    }

/*     const updateContestantVotes = (votes)=>{
        setContestantVotes(votes)
    } */

    const updateContestantVotes = (votes,egcaNumber)=>{
        addToContestantVotes(votes,egcaNumber)
    }

    const updateCategoryVotes = (votes)=>{
        setCategoryVotes(votes)
    }

    const handleDisableButton = ()=>{
        disableButton(egcaNum)
    }

    const voteForContestant = async()=>{
       setDisableVote(true)
       const{data:{allVotes,contestantVotes}} = await axios.patch('/election/vote',{myEgcaNum,egcaNum,position},{headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'X-Auth-Token':localStorage.getItem('token')
         }})
         updateCategoryVotes(allVotes.length)
         updateContestantVotes(contestantVotes,egcaNum)
         handleDisableButton()
         setDisableVote(false)
    }
    if(!readManifesto){
        return(
                <div className = "contestant">
                    <div className = "contestant_picture"><img src ={picture} alt = "contestant"/></div>
                    <div className = "aboutVotes">Name: <span className = 'name'>{name}</span></div>
                    <div className = "aboutVotes">Votes: <span className = 'votes'>{votes}</span> out of <span className = 'totalVotes'>{totalVotes}</span></div>
                    <div className = "aboutVotes">Vote Percentage: <span className = 'votePercent' style = {{color:votePercentColor[egcaNum]}}>{Math.round(votePercent())}%</span></div>
                    <div><input type = "button" value = "Read Manifesto" onClick = {getManifesto} className = 'readManifesto'/></div>
                    {!isButtonDisabled?(
                    <input type = "button" value = "Vote" className = "submitVote" onClick = {voteForContestant} disabled = {disableVote} />
                    ):votedForThisContestant?<button className = "voterFor"><i className="far fa-check-circle fa-lg"></i></button>:<button className = "votedAgainst" ><i className="far fa-times-circle fa-lg"></i></button>}
                </div>
            )
    }
    else{
        return(
        <div className = "contestant manifesto">
            <div className = "manifesto_text">{manifesto}</div>
            <div><input type = "button" value = "Close Manifesto" onClick = {closeManifesto}  className = "closeManifesto"/></div>
        </div>            
        )

    }

    
}
export default Contestant