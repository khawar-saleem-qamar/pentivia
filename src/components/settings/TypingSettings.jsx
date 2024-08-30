import React, {useState} from 'react'
import { CiCircleInfo } from "react-icons/ci";
import Input from '../partials/widgets/Input';
import { selectUser } from '../../App/userSlice'
import { useSelector } from 'react-redux'
import Keyboard from '../typing/Keyboard';
import Bars from '../typing/Bars';

const TypingSettings = () => {
    var user = useSelector(selectUser);
    var [colorfulKeyboard, setColorfulKeyboard] = useState(false);
    var [barType, setBarType] = useState(false);
    const [updatedString, setUpdatedString] = useState("");
    function updateString(string){
      setUpdatedString(string);
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
                <div className={`keyboard-select-wrapper`} onClick={()=>setBarType(false)}>
                  <Bars userId="" token="" bar="monkey" time={0} typingContent="word" typingSource="generate" keyboard={false} updatedString={updatedString} updateString={updateString} saveTest={false} sliceString={100}/>
                  <input type="radio"  name="barType" checked={!barType} value={false} id="colorlessKeyboard" />
                    <label for="colorlessKeyboard" className={`SETTINGSECTION_keyboard-selector-wrapper ${barType == false && "selected"}`} onClick={()=>setBarType(false)}>
                      <div className="SETTINGSECTION_keyboard-selector"></div>
                    </label>  
                </div>

                {updatedString != "" && 
                  <div className={`keyboard-select-wrapper`} onClick={()=>setBarType(true)}>
                    <Bars userId="" token="" bar="chat" time={0} typingContent="word" typingSource="generate" keyboard={false} updatedString={updatedString} saveTest={false} sliceString={100}/>
                    <input type="radio"  name="barType" checked={barType} value={true} id="colorlessKeyboard" />
                      <label for="colorlessKeyboard" className={`SETTINGSECTION_keyboard-selector-wrapper ${barType == false && "selected"}`} onClick={()=>setBarType(true)}>
                        <div className="SETTINGSECTION_keyboard-selector"></div>
                      </label>  
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