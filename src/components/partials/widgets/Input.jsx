import React, {useState, useRef} from 'react'
import './input.css'

import { FaRegEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";


const Input = ({placeholder, type, label, reference, handleType}) => {
  const [passShow , setPassShow] = useState(false);
  return (
    <div className='INPUT_container'>
        <div className="INPUT-label">{label}</div>
        <div className="INPUT-main-wrap">
          <input className='INPUT-main-input' type={type === "password" ? (passShow ? "text" : "password") : type} placeholder={placeholder} ref={reference}  onChange={handleType}/>
          {type == "password" && 
            <div className="INPUT_password-show" onClick={()=> {reference.current.focus(); passShow ? setPassShow(false) : setPassShow(true)}}>
              {passShow ? <FaEyeSlash style={{fontSize: "2rem", color: "var(--primary-color)"}} /> : <FaRegEye style={{fontSize: "2rem", color: "var(--primary-color)"}} />}
            </div>
          } 
        </div>
    </div>
  )
}

export default Input