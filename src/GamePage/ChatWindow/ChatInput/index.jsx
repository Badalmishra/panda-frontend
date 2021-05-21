import React, { useState } from 'react'
import './index.css'
const ChatInput = ({sendMessage=()=>{}}) => {
    const [message,setMessage] = useState('')
    const sendOnEnter = (event)=>{
        console.log('event: ', event);
        if (event.charCode == 13) {
            sendMessage(message)
            setMessage('')
        }
    }
    const onChange = (event) =>{
        setMessage(event.target.value)
    }
    return (
        <input placeholder='Type message and press enter' className='ChatInput' value={message} onChange={onChange} onKeyPress={sendOnEnter}/>
    )
}

export default ChatInput
