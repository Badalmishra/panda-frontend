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
            {messages && messages.map(message=><Message user={user} message={message}/>)}
            {(!messages || (messages && messages.length===0)) &&
            <h1>Messages will come here</h1>}
            <div ref={bottomRef}></div>
        </div>
    )
}

export default MessageList
