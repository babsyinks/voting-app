import React, { useState } from 'react'
import axios from 'axios'
import './Contestant.css'
const Contestant = ({myEgcaNum,egcaNum,name,manifesto,picture,votes,totalVotes,position,setCategoryVotes,disableButton,isButtonDisabled,votedForThisContestant})=>{
    
    const[readManifesto,setManifesto] = useState(false)
    const[contestantVotes,setContestantVotes] = useState(votes)

    const votePercent = ()=>{
        let votePercent = contestantVotes/totalVotes
        if(contestantVotes === 0 && totalVotes === 0){
            votePercent = 0
        }
        else{
           votePercent = votePercent *100 
        } 

        return votePercent
    }

    const getImage = ()=>{
        const b64 = new Buffer.from(picture).toString('base64')
        const mimeType = 'image/png'

       return `data:${mimeType};base64,${b64}`
    }

    const getManifesto = ()=>{
        setManifesto(true)
    }

    const closeManifesto = ()=>{
        setManifesto(false)
    }

    const updateContestantVotes = (votes)=>{
        setContestantVotes(votes)
    }

    const updateCategoryVotes = (votes)=>{
        setCategoryVotes(votes)
    }

    const handleDisableButton = ()=>{
        disableButton(egcaNum)
    }

    const voteForContestant = async()=>{
       const{data:{allVotes,contestantVotes}} = await axios.patch('/election/vote',{myEgcaNum,egcaNum,position},{headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'X-Auth-Token':localStorage.getItem('token')
         }})
         updateCategoryVotes(allVotes.length)
         updateContestantVotes(contestantVotes.length)
         handleDisableButton()
    }



    if(!readManifesto){
        return(
                <div className = "contestant">
                    <div><img src ={getImage()} alt = "contestant"/></div>
                    <div>Name: <span className = 'name'>{name}</span></div>
                    <div>Votes: <span className = 'votes'>{contestantVotes}</span> out of <span className = 'totalVotes'>{totalVotes}</span></div>
                    <div>Vote Percentage: <span className = 'votePercent'>{Math.round(votePercent())}%</span></div>
                    <div><input type = "button" value = "Read Manifesto" onClick = {getManifesto} className = 'readManifesto'/></div>
                    {!isButtonDisabled?(
                    <input type = "button" value = "Vote" className = "submitVote" onClick = {voteForContestant} />
                    ):votedForThisContestant?<button className = "voterFor"><i className="far fa-check-circle fa-lg"></i></button>:<button className = "votedAgainst" ><i className="far fa-times-circle fa-lg"></i></button>}
                    </div>
            )
    }
    else{
        return(
        <div className = "contestant manifesto">
            {manifesto}
            <div><input type = "button" value = "Close Manifesto" onClick = {closeManifesto}  className = "closeManifesto"/></div>
        </div>            
        )

    }

    
}
export default Contestant