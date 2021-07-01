import React,{useState,useEffect} from 'react'
import axios from 'axios';
import ComposeComp from './ComposeComp'
import './Result.css'

function Result() {
    const[result,setResult] = useState([])
    const[index,setIndex] = useState(0)
     useEffect(()=>{
         const resultStatus = async ()=>{
           const res = await axios.get('/election/result')
           console.log(res.data)
           setResult(res.data)
         }
        resultStatus()
    },[])

    if(result.length){
        const totalVotes = result[index].allVotes.length
         return (
            <div>
                {result.map((res,i)=>{
                    return <span key = {i}>{res.position}</span>
                })}
                <div>
                    <div>{totalVotes} Total Vote{totalVotes>1?'s':''} </div>
                    
                </div>
            </div> 
        )        
    }
    else{
        return null
    }

}

export default Result 
