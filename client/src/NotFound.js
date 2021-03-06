import React from 'react'
import './NotFound.css'
const NotFound = ({history})=>{

    const goVote = ()=>{
        history.push('/')
    }

    const goUpdateData = ()=>{
        history.push('/info')
    }
    return (
        <div className = 'nf_wrapper'>
            <h1>Oops This Page Does Not Exist</h1>
            <h2>What Will You Like To Do?</h2>
            <div>
                <button id = "go_vote" onClick = {goVote} value = {`Go And Vote`}>Go And Vote For EGCA Excos</button>
                <button id = "go_update_data" onClick = {goUpdateData} value = {`Go And Update EGCA Data`}>Go And Update EGCA Data</button>
            </div>
        </div>
    )
}

export default NotFound