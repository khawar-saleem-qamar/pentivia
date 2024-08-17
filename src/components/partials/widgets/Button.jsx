import React from 'react'
import './button.css'

const Button = ({text, handleClick}) => {
  return (
    <div className='BUTTON_main-container' onClick={handleClick}>
        {text}
    </div>
  )
}

export default Button