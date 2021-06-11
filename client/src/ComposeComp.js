import React from 'react'
import './ComposeComp.css'
function ComposeComp({children}) {
    return (
        <div className = "compContainers compOuter">
            <div className = "compContainers compInner">
                {children}
            </div>
            
        </div>
    )
}

export default ComposeComp
