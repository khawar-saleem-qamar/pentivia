import React from 'react'
import './button.css'

const Button = ({fit = false, text, handleClick}) => {
  return (
    <div className={`BUTTON_main-container ${fit ? "fit" : ""}`} onClick={handleClick}>
        {text}
    </div>
  )
}

export default Button