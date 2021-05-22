import moment from 'moment'
import React from 'react'
import './index.css'
const Message = ({message={},user={}}) => {
    return (
        <div className={'Message '}>
            <span className={message.sender === user.id?'mine':'thier'}>
                <span className="MessageName">{message.name}</span>
                <span className='container'>
                    <span className="MessageTime">{moment(message.time).fromNow()}</span>
                    <span className={'MessageBoby '+(message.isAnswer &&'answer')}>{message.message}</span>
                </span>
            </span>
        </div>
    )
}

export default Message
