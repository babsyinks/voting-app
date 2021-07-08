import React,{useState} from 'react'
import ComposeComp from './ComposeComp'
import './Help.css'
function Help() {

    const[btnColor,setBtnColor] = useState({color:'blueviolet',backgroundColor:'white'})
    const[whatsAppIconColor,setWhatsappIconColor] = useState({color:'green',backgroundColor:'white'})
    const[btnColor1,setBtnColor1] = useState({color:'blueviolet',backgroundColor:'white'})
    const[whatsAppIconColor1,setWhatsappIconColor1] = useState({color:'green',backgroundColor:'white'})

    const setColors = ()=>{
        setBtnColor({color:'white',backgroundColor:'blueviolet'})
        setWhatsappIconColor({color:'white',backgroundColor:'green'})
    }

    const unSetColors = ()=>{
        setBtnColor({color:'blueviolet',backgroundColor:'white'})
        setWhatsappIconColor({color:'green',backgroundColor:'white'})
    }

    const setColors1 = ()=>{
        setBtnColor1({color:'white',backgroundColor:'blueviolet'})
        setWhatsappIconColor1({color:'white',backgroundColor:'green'})
    }

    const unSetColors1 = ()=>{
        setBtnColor1({color:'blueviolet',backgroundColor:'white'})
        setWhatsappIconColor1({color:'green',backgroundColor:'white'})
    }

    const styleObj = {color:btnColor.color === 'white'?'blueviolet':'white',backgroundColor:btnColor.backgroundColor === 'blueviolet'?'white':'blueviolet'}
    const styleObjWhatsapp = {color:whatsAppIconColor.color === 'white'?'green':'white',backgroundColor:whatsAppIconColor.backgroundColor === 'green'?'white':'green',borderRadius:'10px'}
    const styleObj1 = {color:btnColor1.color === 'white'?'blueviolet':'white',backgroundColor:btnColor1.backgroundColor === 'blueviolet'?'white':'blueviolet'} 
    const styleObjWhatsapp1 = {color:whatsAppIconColor1.color === 'white'?'green':'white',backgroundColor:whatsAppIconColor1.backgroundColor === 'green'?'white':'green',borderRadius:'10px'}
    
    return (
        <ComposeComp>
            <div className = 'help_wrapper'>
                <h2 className = 'help_header'>Welcome To The EGCA Alumni Election Help Desk</h2>
                <p className = 'help_msg'>So sorry to learn that you can't log in; but hey,that's why we are here for you.</p>
                <p className = 'help_msg'>Please select any help desk personnel below to assist you to log in.</p>
                <div className = 'whatsapp-buttons'>
                    <a href = 'https://api.whatsapp.com/send?phone=2348099444495' target = 'blank'>
                        <button onMouseOver = {setColors} onMouseOut = {unSetColors}
                        style = {styleObj} 
                        className = 'whatsapp'>Chat With Tola On <i className="fab fa-whatsapp whatsapp_icon" style = {styleObjWhatsapp}></i></button>
                    </a>
                    <a href = 'https://api.whatsapp.com/send?phone=2347062298897' target = 'blank'>
                        <button onMouseOver = {setColors1} onMouseOut = {unSetColors1}
                        style = {styleObj1}
                        className = 'whatsapp'>Chat With Tope On <i className="fab fa-whatsapp whatsapp_icon" style = {styleObjWhatsapp1}></i></button>
                    </a>
                    
                </div>
                <p className = 'note'><span>Note: </span>If you are unable to connect with them on WhatsApp, its likely because of your browser.</p>
                <p className = 'note'>Please consider using an updated Google Chrome or Mozilla Firefox browser.</p>
            </div>
        </ComposeComp>
    )
}

export default Help
