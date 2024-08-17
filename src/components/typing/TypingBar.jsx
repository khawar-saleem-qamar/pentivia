import React, {useEffect} from 'react'
import Keyboard from './Keyboard'
import './typingBar.css'


const TypingBar = () => {
    useEffect(() => {
        var scriptMonkeybarJs = document.createElement('script');
        scriptMonkeybarJs.src = "/scripts/MonkeyBar.js";
        scriptMonkeybarJs.async = true;
        scriptMonkeybarJs.type = "module";
        document.body.appendChild(scriptMonkeybarJs)

        
        var scriptKeyboardJs = document.createElement('script');
        scriptKeyboardJs.src = "/scripts/keyboardscript.js";
        scriptKeyboardJs.async = true;
        scriptKeyboardJs.type = "module";
        document.body.appendChild(scriptKeyboardJs)
        
        var scriptTyperJs = document.createElement('script');
        scriptTyperJs.src = "/scripts/Typer.js";
        scriptTyperJs.async = true;
        scriptTyperJs.type = "module";
        document.body.appendChild(scriptTyperJs)
        return () => {
            document.body.removeChild(scriptMonkeybarJs);
            document.body.removeChild(scriptTyperJs);
            document.body.removeChild(scriptKeyboardJs);
        }
      }, []);
  return (
    <div className="bodyContent focus" type="practice">
      {/* <div className="typingMenu">
        <div className="menuIcon">
          <ion-icon name="grid-outline"></ion-icon>
        </div>
        <div className="menuItem" position="top">
          <div className="title">Bar</div>
          <div className="menuItemContent">
            <ul name="bar">
              <li name="monkey" data-title="Monkey"><ion-icon name="accessibility-outline"></ion-icon></li>
              <li name="chat" data-title="Chat"><ion-icon name="chatbubble-outline"></ion-icon></li>
            </ul>
          </div>
        </div>
        <div className="menuItem" position="right">
          <div className="title">Content</div>
          <div className="menuItemContent">
            <ul name="content">
              <li name="word" data-title="Words"><ion-icon name="logo-wordpress"></ion-icon></li>
              <li name="punctuation" data-title="Punctuation"><ion-icon name="alert-outline"></ion-icon></li>
              <li name="key" data-title="All Keys"><ion-icon name="keypad-outline"></ion-icon></li>
            </ul>
          </div>
        </div>
        <div className="menuItem" position="bottom">
          <div className="title">Time</div>
          <div className="menuItemContent">
            <ul name="time">
            <li name="t15" data-title="15sec">15s</li>
            <li name="t30" data-title="30sec">30s</li>
            <li name="t60" data-title="60sec">60s</li>
            <li name="t120" data-title="120sec">120s</li>
            </ul>
          </div>
        </div>
        <div className="menuItem" position="left">
          <div className="title">Source</div>
          <div className="menuItemContent">
            <ul name="source">
              <li name="generate" data-title="Generate">Generate</li>
              <li name="custom" data-title="Custom">Custom</li>
            </ul>
          </div>
        </div>
      </div> */}

      <div id="countDown">
        <span id="min">00</span>:
        <span id="sec">00</span>
      </div>
      <div uid="typingBar">
        <div uid="content"></div>
      </div>

      <div id="sidewayTypingBar">
        <div uid="content">
        <div className="contentLeft subContent">
          <div className="word active"></div>
        </div>
        <div className="carrotOutter">
          <div id="sidewayCarrot"></div>
        </div>
        <div className="contentRight subContent"></div>
        </div>
      </div>

      <Keyboard />

       {/* <div id="resultGraph">
         <canvas id="resultCanvas"></canvas>
       </div> */}

       {/* <div id="colorWordsWrapper">
    //     <div id="colorIndicator">
    //     <div className="typeBox correct">
    //       <div className="type">Correct: </div>
    //       <div className="typeColor">word</div>
    //     </div>
    //     <div className="typeBox incorrect">
    //       <div className="type">Incorrect: </div>
    //       <div className="typeColor">word</div>
    //     </div>
    //     <div className="typeBox extra">
    //       <div className="type">Extra: </div>
    //       <div className="typeColor">word</div>
    //     </div>
    //     <div className="typeBox missed">
    //       <div className="type">Missed: </div>
    //       <div className="typeColor">word</div>
    //     </div>
    //     </div>
    //     <div id="colorWords"></div>
       </div> */}

      <input id="hiddenInput" type="text" style={{marginLeft: "200px", position: "absolute", opacity: 0, pointerEvents: "none", width: 0, height: 0}} />
    </div>
  )
}

export default TypingBar