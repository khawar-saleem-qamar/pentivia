import React, {useState, useRef} from 'react'
import './input.css'

import { FaRegEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";


const Input = ({placeholder, type, label}) => {
  const [passShow , setPassShow] = useState(false);
  const inputRef = useRef(null);
  return (
    <div className='INPUT_container'>
        <div className="INPUT-label">{label}</div>
        <div className="INPUT-main-wrap">
          <input className='INPUT-main-input' type={type === "password" ? (passShow ? "text" : "password") : type} placeholder={placeholder} ref={inputRef}/>
          {type == "password" && 
            <div className="INPUT_password-show" onClick={()=> {inputRef.current.focus(); passShow ? setPassShow(false) : setPassShow(true)}}>
              {passShow ? <FaEyeSlash style={{fontSize: "2rem", color: "black"}} /> : <FaRegEye style={{fontSize: "2rem", color: "black"}} />}
            </div>
          } 
        </div>
    </div>
  )
}

export default Input