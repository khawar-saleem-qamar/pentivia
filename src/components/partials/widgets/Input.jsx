import React, {useState, useRef} from 'react'
import './input.css'

import { FaRegEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";


const Input = ({placeholder, type, label, reference, handleType, banner="", fullSize=false, bottomBorder=false, profilePic=""}) => {
  const [passShow , setPassShow] = useState(false);
  return (
    <div className={`INPUT_container ${fullSize && "fullSize"}`}>
        <div className="INPUT-label">{label}</div>
        <div className="INPUT-main-wrap">
          {banner != "" && <div className="INPUT-banner">{banner}</div>}
          {type == "file" && <label for={label} className='INPUT_file_label'>
            <img className='INPUT_file_img' src={profilePic} />
            </label>}
          <input id={type == "file" && label} className={`INPUT-main-input ${type == "file" && "INPUT_image"} ${banner != "" ? "hasbanner" : ""}`} type={type === "password" ? (passShow ? "text" : "password") : type} placeholder={placeholder} ref={reference}  onChange={handleType}/>
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