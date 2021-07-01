import React from 'react'
import './ComposeComp.css'
function ComposeComp({children,linearGrad,overflow,width,height}) {
    const compContainers = {
        display:'flex',
        flexDirection:'column',
        justifyContent: overflow?'':'center',
        alignItems:'center'
        
    }
    return (
        <div className = "compContainers compOuter" style = {{backgroundImage:linearGrad}}>
            <div className = "compInner" style = {{overflowY:overflow?'scroll':'hidden',width:width?width:'70%',height:height?height:'70%',...compContainers}}>
                {children}
            </div>
            
        </div>
    )
}

ComposeComp.defaultProps = {
    linearGrad:'linear-gradient(to right,rgb(209, 65, 209),rgb(108, 108, 233),rgb(24, 24, 192))'
}

export default ComposeComp
