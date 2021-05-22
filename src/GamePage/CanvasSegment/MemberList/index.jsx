import React from 'react'
import './index.css'
import Member from './Member'
const MemberList = ({members,turn}) => {
    return (
        <div className='MemberList'>
            {
                members && members.map(member=>(<Member member={member} turn={turn} />))
            }
        </div>
    )
}

export default MemberList
