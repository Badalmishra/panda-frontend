import React from 'react'
import './index.css'
const Word = ({word}) => {
    return word &&(
        <h1 className='word'>
            Draw '{word}'
        </h1>
    )
}

export default Word
