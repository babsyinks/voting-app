import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ComposeComp from './ComposeComp'
import './Result.css'

function Result() {
    const [result, setResult] = useState([])
    const [index, setIndex] = useState(0)
    useEffect(() => {
        const resultStatus = async () => {
            const res = await axios.get('/election/result')
            console.log(res.data)
            setResult(res.data)
        }
        resultStatus()
    }, [])


    if (result.length) {
        return (
            <div>
                <h2 className = "resHeader">Election Result</h2>
                <div className = 'resWrap'>
                {result.map((res, i) => {
                    return (
                        <span className="result" key={i} onClick = {()=>{setIndex(i)}} style = {{backgroundColor: i === index?'red':''}}>
                            {res.position}
                        </span>
                    )
                })}
                </div>
                <div>
                    <div className = 'allResultsWrap'>
                        {result[index].contestants.map(({picture,surname,firstName,votes},i)=>{
                            return (
                                    <div className = "contestant" key = {i}>
                                        <div className = "contestant_picture"><img src ={picture} alt = "contestant"/></div>
                                        <div className = "aboutVotes">Name: <span className = 'name'>{`${surname} ${firstName}`}</span></div>
                                        <div className = "aboutVotes">Votes: <span className = 'votes'>{votes.length}</span></div>
                                    </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default Result
