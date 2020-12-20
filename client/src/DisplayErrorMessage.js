import React from 'react'
import './DisplayErrorMessage.css'
const DisplayErrorMessage = ({children,status})=>{

/*     useEffect(()=>{
        let mounted = true
        if(mounted){
            console.log(mounted)
        }
        return function cleanUp(){
        
          mounted = false
          console.log(mounted)
        }
        //eslint-disable-next-line
      },[]) */

    return(
     <div className = {status}>
        {children}
    </div>       
    )
}

export default DisplayErrorMessage