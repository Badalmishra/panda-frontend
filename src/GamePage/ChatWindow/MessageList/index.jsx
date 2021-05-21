import React, { useEffect, useRef } from 'react'
import "./index.css";
import Message from './Message';

const MessageList = ({messages=[],user={}}) => {
    const bottomRef= useRef()
    useEffect(()=>{
        bottomRef.current.scrollIntoView({behavior:'smooth'})
    },[messages])
    return (
        <div className='MessageList'>
            {messages.map(message=><Message user={user} message={message}/>)}
            <div ref={bottomRef}></div>
        </div>
    )
}

export default MessageList
