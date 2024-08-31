import React, {useState, useRef} from 'react'
import { CiCircleInfo } from "react-icons/ci";
import Input from '../partials/widgets/Input';
import { selectUser } from '../../App/userSlice'
import { useSelector } from 'react-redux'
import Keyboard from '../typing/Keyboard';
import Bars from '../typing/Bars';
import { FaCheckCircle } from "react-icons/fa";

const TypingSettings = () => {
    var user = useSelector(selectUser);
    var barTypeInput = useRef(null);
    var [colorfulKeyboard, setColorfulKeyboard] = useState(false);
    var [barType, setBarType] = useState(user.bar);
    const [updatedString, setUpdatedString] = useState("");
    function updateString(string){
      setUpdatedString(string);
    }
    function updateBarType(string){
      if(["chat", "monkey"].includes(string)){
        barTypeInput.current.value = string;
        setBarType(string);
      }
    }

  return (
    <div className='SETTINGSECTION_main-container typing_settings'>
        <div className="SETTINGSECTION_head">
            <div className="SETTINGSECTION_heading">Typing customization</div>
            <div className="SETTINGSECTION_description">Customize this platform for your typing as you like!</div>
            <div className="SETTINGSECTION_head-info">
                <div className="SETTINGSECTION_head-info-description">The changes you would make here would be visible at your profile when you are loggedin.</div>
                <div className="SETTINGSECTION_head-info-icon">
                    <CiCircleInfo style={{color: "white", fontSize: "2rem"}} />
                </div>
            </div>
        </div>
        <div className="SETTINGSECTION_body">
            <div className="SETTINGSECTION_wrap">
              <div className="SETTINGSECTION_wrap-title">Typing Bar</div>
              <div className="SETTINGSECTION_wrap-body">
                {/* set this */}
                  <input id="barTypeInput" type="text" name="bar" value={barType} ref={barTypeInput}/>
                <div className={`bar-select-wrapper`} onClick={()=>updateBarType("monkey")}>
                  <span className={`bar-title ${barType == "monkey" && "selected"}`}>Monkey type Bar
                    <div className="bar-title-icon">
                      <FaCheckCircle style={{fontSize: "1.5rem", color: "var(--primary-color)"}}/>
                      </div> 
                      </span>
                  <Bars userId="" token="" bar="monkey" time={0} typingContent="word" typingSource="generate" keyboard={false} updatedString={updatedString} updateString={updateString} saveTest={false} sliceString={100}/>
                </div>

                {updatedString != "" && 
                  <div className={`bar-select-wrapper`} onClick={()=>updateBarType("chat")}>
                    <span className={`bar-title ${barType == "chat" && "selected"}`}>Live chat Bar
                      <div className="bar-title-icon">
                        <FaCheckCircle style={{fontSize: "1.5rem", color: "var(--primary-color)"}}/>
                        </div> 
                        </span>
                    <Bars userId="" token="" bar="chat" time={0} typingContent="word" typingSource="generate" keyboard={false} updatedString={updatedString} saveTest={false} sliceString={100}/>
                  </div>
                }
              </div>
            </div>
            <div className="SETTINGSECTION_wrap">
              <div className="SETTINGSECTION_wrap-title">Keyboard</div>
              <div className="SETTINGSECTION_wrap-body">
                <div className={`keyboard-select-wrapper`} onClick={()=>setColorfulKeyboard(false)}>
                  <Keyboard fillEnabled={false} control={false} />
                  <input type="radio"  name="keyboardColor" checked={!colorfulKeyboard} value={false} id="colorlessKeyboard" />
                  <label for="colorlessKeyboard" className={`SETTINGSECTION_keyboard-selector-wrapper ${colorfulKeyboard == false && "selected"}`} onClick={()=>setColorfulKeyboard(false)}>
                    <div className="SETTINGSECTION_keyboard-selector"></div>
                  </label>
                </div>
                <div className={`keyboard-select-wrapper`} onClick={()=>setColorfulKeyboard(true)}>
                  <Keyboard fillEnabled={true} control={false} />
                  <input type="radio"  name="keyboardColor" checked={colorfulKeyboard} value={true} id="colorfulKeyboard" />
                  <label for="colorfulKeyboard" className={`SETTINGSECTION_keyboard-selector-wrapper ${colorfulKeyboard && "selected"}`} onClick={()=>setColorfulKeyboard(true)}>
                    <div className="SETTINGSECTION_keyboard-selector"></div>
                  </label>
                </div>
              </div>
            </div>
            
        </div>
    </div>
  )
}

export default TypingSettings