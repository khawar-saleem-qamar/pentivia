import React, {useState, useRef} from 'react'
import { CiCircleInfo } from "react-icons/ci";
import Input from '../partials/widgets/Input';
import { selectUser } from '../../App/userSlice'
import { useSelector } from 'react-redux'
import Keyboard from '../typing/Keyboard';
import Bars from '../typing/Bars';
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import {login} from "../../App/userSlice"

const TypingSettings = () => {
    var user = useSelector(selectUser);
    var dispatch = useDispatch();
    var barTypeInput = useRef(null);
    var typingTimeInput = useRef(null);
    var typingCustomLesson = useRef(null);
    var [showCustomInputError, setShowCustomInputError] = useState(false)
    var colorfulKeyboard = user.colorfulKeyboard;
    var barType = user.bar;
    var typingTime = user.typingTime;
    var customLesson = user.typingSource == "custom"
    var [customLessonContent, setCustomInputValue] = useState(user.customLessonContent);
    var customLessonRepeat = user.customLessonRepeat;
    var customLessonShuffle = user.customLessonShuffle;
    const [updatedString, setUpdatedString] = useState("");
    function updateString(string){
      setUpdatedString(string);
    }
    function updateBarType(string){
      if(["chat", "monkey"].includes(string)){
        barTypeInput.current.value = string;
        // setBarType(string);
        
        dispatch(login({
          ...user,
          bar: string
        }))
      }
    }

    function updateTypingTime(number){
      if([15, 30, 60, 120].includes(number)){
        typingTimeInput.current.value = number;
        
        dispatch(login({
          ...user,
          typingTime: number
        }))
      }
    }

    function updateCustomLesson(){
      // if(customLesson){
        
      dispatch(login({
        ...user,
        typingSource: customLesson ? "generate" : "custom"
      }))
      // }
    }

    function setColorfulKeyboard(value){
      dispatch(login({
        ...user,
        colorfulKeyboard: value
      }))
    }

    function customHandleChangeType(e){
      setCustomInputValue(e.target.value)
      if(e.target.value.split(" ").length < 20){
        setShowCustomInputError(true)
        return;
      }
      setShowCustomInputError(false)
      dispatch(login({
        ...user,
        customLessonContent: e.target.value
      }))
    }


    function setCustomLessonRepeat(e){
      dispatch(login({
        ...user,
        customLessonRepeat: !customLessonRepeat
      }))
    }

    function setCustomLessonShuffle(){
      dispatch(login({
        ...user,
        customLessonShuffle: !customLessonShuffle
      }))
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
              <div className="SETTINGSECTION_wrap-title">Lesson Duration</div>
              <div className="SETTINGSECTION_wrap-body">
                <input className="settingFormInput" type="text" name="time" value={typingTime} ref={typingTimeInput}/>
                <div className="SETTINGSSECTION_typing-times">
                  <div className={`SETTINGSSECTION_typing-time ${typingTime == 15 && "selected"}`} value={typingTime} onClick={() => updateTypingTime(15)}>15 seconds</div>
                  <div className={`SETTINGSSECTION_typing-time ${typingTime == 30 && "selected"}`} value={typingTime} onClick={() => updateTypingTime(30)}>30 seconds</div>
                  <div className={`SETTINGSSECTION_typing-time ${typingTime == 60 && "selected"}`} value={typingTime} onClick={() => updateTypingTime(60)}>1 minute</div>
                  <div className={`SETTINGSSECTION_typing-time ${typingTime == 120 && "selected"}`} value={typingTime} onClick={() => updateTypingTime(120)}>2 minutes</div>
                </div>
              </div>
            </div>
            <div className="SETTINGSECTION_wrap">
              <div className="SETTINGSECTION_wrap-title">Custom Lesson</div>
              <div className="SETTINGSECTION_wrap-body customLesson">
                <div className="customLesson_selection">
                  <div class="checkbox-wrapper-41" onClick={updateCustomLesson}>
                    <input name="customLessons" checked={customLesson} type="checkbox" ref={typingCustomLesson} />
                  </div>
                  <div className="customLesson_selection-heading">Use custom content in typing lessons</div>
                </div>
                <Input placeholder="Hi there!👋 put your custom text you want to be used for typing lessons here!" type="textarea" label="Biography" fullSize={true} bottomBorder={false} customValue={customLessonContent} name="customLessonContent" showHead={false} customClass={customLesson ?"customLessonInput" : "generateLessonInput"} disabled={!customLesson} customHandleChangeType={customHandleChangeType} />
                <div className={`customLesson_input-er ${showCustomInputError && "show"}`}>Please add atleast 20 words</div>
                <div className="customLesson_selection-options">
                <div className="customLesson_selection">
                  <div class="checkbox-wrapper-41" onClick={setCustomLessonShuffle}>
                    <input disabled={!customLesson} name="shuffleCustomLesson" checked={customLessonShuffle} type="checkbox"/>
                  </div>
                  <div className="customLesson_selection-heading">Shuffle</div>
                  </div>
                  <div className="customLesson_selection">
                    <div class="checkbox-wrapper-41" onClick={setCustomLessonRepeat}>
                      <input disabled={!customLesson} name="repeatCustomLesson" checked={customLessonRepeat} type="checkbox"/>
                    </div>
                    <div className="customLesson_selection-heading">Repeat</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="SETTINGSECTION_wrap">
              <div className="SETTINGSECTION_wrap-title">Typing Bar</div>
              <div className="SETTINGSECTION_wrap-body barType">
                {/* set this */}
                  <input id="barTypeInput" type="text" name="bar" value={barType} ref={barTypeInput}/>
                <div className={`bar-select-wrapper`} onClick={()=>updateBarType("monkey")}>
                  <span className={`bar-title ${barType == "monkey" && "selected"}`}>Monkey type Bar
                    <div className="bar-title-icon">
                      <FaCheckCircle style={{fontSize: "1.5rem", color: "var(--primary-color)"}}/>
                      </div> 
                      </span>
                  <Bars userId="" token="" bar="monkey" time={0} typingContent="word" typingSource="generate" keyboard={false} updatedString={updatedString} updateString={updateString} saveTest={false} sliceString={30}/>
                </div>

                {updatedString != "" && 
                  <div className={`bar-select-wrapper`} onClick={()=>updateBarType("chat")}>
                    <span className={`bar-title ${barType == "chat" && "selected"}`}>Live chat Bar
                      <div className="bar-title-icon">
                        <FaCheckCircle style={{fontSize: "1.5rem", color: "var(--primary-color)"}}/>
                        </div> 
                        </span>
                    <Bars userId="" token="" bar="chat" time={0} typingContent="word" typingSource="generate" keyboard={false} updatedString={updatedString} saveTest={false} sliceString={30}/>
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