import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Result.css'

function Result() {
    const [result, setResult] = useState([])
    const [index, setIndex] = useState(0)
    let highestVote = 0
    useEffect(() => {
        const resultStatus = async () => {
            const res = await axios.get('/election/result')
            setResult(res.data)
        }
        resultStatus()
    }, [])

    if (result.length) {
        let sortedResults
        if (result[index].contestants.length > 1) {
            sortedResults = result[index].contestants.sort(
                (a, b) => b.votes.length - a.votes.length
            )
        } else {
            sortedResults = result[index].contestants
        }

        return (
            <div>
                <h2 className="resHeader">Election Result</h2>
                <div className="resWrap">
                    {result.map((res, i) => {
                        return (
                            <span
                                className="result"
                                key={i}
                                onClick={() => {
                                    setIndex(i)
                                }}
                                style={{
                                    backgroundColor: i === index ? 'red' : '',
                                }}
                            >
                                {res.position}
                            </span>
                        )
                    })}
                </div>
                <div>
                    <div className="allResultsWrap">
                        {sortedResults.map(
                            ({ picture, surname, firstName, votes }, i) => {
                                let isTie = false
                                if (i === 0) {
                                    highestVote = votes.length
                                    if (sortedResults.length > 1) {
                                        if (
                                            sortedResults[i].votes.length ===
                                            sortedResults[1].votes.length
                                        ) {
                                            isTie = true
                                        }
                                    }
                                } else if (votes.length === highestVote) {
                                    isTie = true
                                }
                                return (
                                    <div
                                        className="contestant resultContainer"
                                        key={i}
                                    >
                                        <div className="contestant_picture">
                                            <img 
                                                className = "resImg"
                                                src={picture}
                                                alt="contestant"
                                            />
                                        </div>
                                        <div className="resDetails">
                                            <div className="aboutVotes">
                                                Name:
                                                <span className="name">{`${surname} ${firstName}`}</span>
                                            </div>
                                            <div className="aboutVotes">
                                                Votes:
                                                <span className="votes">
                                                    {votes.length}
                                                </span>
                                                <span className="winner">
                                                    {i === 0 ? (
                                                        isTie === false ? (
                                                            (votes.length > 0) &&<i className="far fa-check-circle fa-lg"></i>
                                                        ) : (
                                                            <span className="resTie">
                                                                Tie
                                                            </span>
                                                        )
                                                    ) : isTie ? (
                                                        <span className="resTie">
                                                            Tie
                                                        </span>
                                                    ) : (
                                                        ''
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default Result
