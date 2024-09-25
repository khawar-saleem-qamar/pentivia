import React, {useState, useRef} from 'react'
import './input.css'

import { FaRegEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";


const Input = ({placeholder, type, label, reference, handleType, banner="", fullSize=false, bottomBorder=false, profilePic="", value="", name="", checkboxgroups=[], shadow=true, showHead=true, customClass="", disabled=false, customHandleChangeType=null, customValue = null, updateChangeStatus = null}) => {
  const [passShow , setPassShow] = useState(false);
  const [valueProp , setValue] = useState(value);
  const [profilePicUrl, setProfilePicUrl] = useState(profilePic)
  const [notificationChecks, setNotificationChecks] = useState(checkboxgroups);
  function handleChangeType(e){
    if(updateChangeStatus){
      updateChangeStatus(e.target.getAttribute("name"), e.target.value);
    }
    setValue(e.target.value);
    if(type == "file"){
      const file = e.target.files[0]; // Get the selected file
      if (file) {
        console.log("file is uploading")
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePicUrl(reader.result); // Update the imageSrc with the base64 image data
        };
        reader.readAsDataURL(file); // Read the file as a data URL
        console.log("file is uploaded")
      }
    }
    // handleType(e);
  }

  function changeCheck(e){
    var index = e.target.getAttribute('checkKey');
    setNotificationChecks((prevChecks) =>
      prevChecks.map((check, i) => 
        i == index ? { ...check, selected: !check.selected } : check
      )
    );
    updateChangeStatus(e.target.getAttribute("name"), notificationChecks[index].selected)
  }
  return (
    <div className={`INPUT_container ${fullSize && "fullSize"} ${bottomBorder && "borderbottom"}`}>
        {showHead && <div className="INPUT-label">{label}</div>}
        <div className={`INPUT-main-wrap ${shadow && "shadow"}`}>
          {type == "checkboxgroup" ? 
          <>
            <div className="INPUT_checkboxgroup-items">
              {
                notificationChecks.map((checkbox, i) => (
                  <div className="INPUT_checkbox">
                    <input checkKey={i} type="checkbox" checked={checkbox.selected} name={checkbox.name} onChange={changeCheck}/> {checkbox.title}
                  </div>
                ))
              }
            </div>
          </> :
          type == "textarea" ?
            <textarea disabled={disabled} name={name} className={`INPUT-main-input ${customClass}`} placeholder={placeholder} ref={reference} onChange={customHandleChangeType != null ? customHandleChangeType : handleChangeType} value={customValue!= null ? customValue : valueProp}></textarea>
            :
          <>
            {banner != "" && <div className="INPUT-banner">{banner}</div>}
            {type == "file" && <label for={label} className='INPUT_file_label_img'>
              <img className='INPUT_file_img' src={profilePicUrl} />
            </label>}
            
            {type == "file" && <label for={label} className='INPUT_file_label'>
              Change
              </label>}
            <input accept="image/*" name={name} id={type == "file" && label} className={`INPUT-main-input ${type == "file" && "INPUT_image"} ${banner != "" ? "hasbanner" : ""}`} type={type === "password" ? (passShow ? "text" : "password") : type} placeholder={placeholder} ref={reference}  onChange={handleChangeType} value={valueProp}/>
            {type == "password" && 
              <div className="INPUT_password-show" onClick={()=> {reference.current.focus(); passShow ? setPassShow(false) : setPassShow(true)}}>
                {passShow ? <FaEyeSlash style={{fontSize: "2rem", color: "var(--primary-color)"}} /> : <FaRegEye style={{fontSize: "2rem", color: "var(--primary-color)"}} />}
              </div>
            } 
            </>
          }
        </div>
    </div>
  )
}

export default Input