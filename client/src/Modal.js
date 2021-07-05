import React from 'react'
import './Modal.css'

const Modal = ({message,positiveBtnTxt,negativeBtnTxt,positiveHandler,negativeHandler})=>{
    return (
        <div className = 'backdrop'>
            <div className = 'modal'>
                <div id = "modal_msg">{message}</div>
                <span>
                    {positiveBtnTxt && <button onClick = {positiveHandler} id = "modal_positive" value = {positiveBtnTxt}>{positiveBtnTxt}</button>}
                    {negativeBtnTxt && <button onClick = {negativeHandler} id = "modal_negative" value = {negativeBtnTxt}>{negativeBtnTxt}</button>}
                </span>
            </div>
        </div>
    )
}

export default Modal