import React from 'react'
import ChatInput from './ChatInput'
import './index.css'
import MessageList from './MessageList'
const ChatWindow = ({messages,user,sendMessage}) => {
    return (
        <div className='ChatWindow'>
            <MessageList messages={messages} user={user}/>
            <ChatInput sendMessage={sendMessage} />
        </div>
    )
}

export default ChatWindow
