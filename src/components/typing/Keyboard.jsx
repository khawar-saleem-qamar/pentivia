import React, {useEffect, useRef} from 'react'
import './keyboardstyle.css'

const Keyboard = ({fillEnabled= true}) => {
  var keyboard = useRef(null)
  useEffect(() => {
    var keyboardWidth = keyboard.current.clientWidth
    var keyboardHeight = keyboard.current.clientHeight
    if (keyboard.current != null) {
      let scale = 1;
      let startDistance = 0;
      let isDragging = false;
      let startX, startY, offsetX = 0, offsetY = 0;
  
      // Function to get distance between two touch points
      function getDistance(touches) {
        const [touch1, touch2] = touches;
        const dx = touch2.clientX - touch1.clientX;
        const dy = touch2.clientY - touch1.clientY;
        return Math.sqrt(dx * dx + dy * dy);
      }
  
      // Handle pinch to zoom
      var keepZooming = true;
      keyboard.current.addEventListener("touchmove", function (event) {
        if (event.touches.length === 2) {
          event.preventDefault();
          const currentDistance = getDistance(event.touches);
          if (startDistance) {
            if(keepZooming){
              scale *= currentDistance / startDistance;
              // keyboard.current.style.transform = `scale(${scale})`;
              checkToZoom();
            }
          }
          startDistance = currentDistance;
        }
      });
  
      keyboard.current.addEventListener("touchend", function () {
        startDistance = 0;
      });
  
      // Handle scroll zoom
      keyboard.current.addEventListener("wheel", function (event) {
        event.preventDefault();
        if(keepZooming){
          scale += event.deltaY * -0.001;
          scale = Math.min(Math.max(0.5, scale), 3); // Limit the zoom scale
          // keyboard.current.style.transform = `scale(${scale})`;
          checkToZoom();
        }
      });

      function checkToZoom(){
        keyboard.current.style.maxWidth = "none"
        var newWidth = (keyboardWidth * scale)
        var newHeight = (keyboardHeight * scale)
        if(newWidth >= document.body.clientWidth){
          return;
        }
        keyboard.current.style.width = newWidth+"px"
        keyboard.current.style.height = newHeight+"px"

        if(offsetX < 0){
          offsetX = 0;
        }
        if(offsetX + keyboard.current.clientWidth >  document.body.clientWidth){
          offsetX = document.body.clientWidth - keyboard.current.clientWidth;
        }
        if(offsetY < 0){
          offsetY = 0;
        }
        if(offsetY + keyboard.current.clientHeight >  document.body.clientHeight){
          offsetY = document.body.clientHeight - keyboard.current.clientHeight;
        }
        keyboard.current.style.left = `${offsetX}px`;
        keyboard.current.style.top = `${offsetY}px`;

        // keyboard.current.style.top = offsetY + "px"
        // console.log("start x distance: ", rect.left);
        // console.log("right x distance: ", document.body.clientWidth - (rect.left + keyboard.current.clientWidth));
        // console.log("start y distance: ", rect.top);
        // console.log("bottom y distance: ", document.body.clientHeight - (rect.top + keyboard.current.clientHeight));
      }
  
      // Handle dragging
      function changeKeyboard() {
        if (!keyboard.changed) {
          keyboard.changed = true;
          const rect = keyboard.current.getBoundingClientRect();
          keyboard.current.style.position = "absolute";
          keyboard.current.style.left = `${rect.left}px`;
          keyboard.current.style.top = `${rect.top}px`;
          offsetX = rect.left;
          offsetY = rect.top;
        }
      }
  
      function startDragging(event) {
        changeKeyboard();
        isDragging = true;
  
        const rect = keyboard.current.getBoundingClientRect();
        offsetX = rect.left;  // Update the offsetX to the current position of the div
        offsetY = rect.top;   // Update the offsetY to the current position of the div
  
        if (event.type === "mousedown") {
          startX = event.clientX - offsetX;
          startY = event.clientY - offsetY;
        } else if (event.type === "touchstart") {
          startX = event.touches[0].clientX - offsetX;
          startY = event.touches[0].clientY - offsetY;
        }
      }
  
      function dragging(event) {
        if (isDragging) {
          if (event.type === "mousemove") {
            offsetX = event.clientX - startX;
            offsetY = event.clientY - startY;
          } else if (event.type === "touchmove") {
            offsetX = event.touches[0].clientX - startX;
            offsetY = event.touches[0].clientY - startY;
          }
          if(offsetX < 0){
            offsetX = 0;
          }
          if(offsetX + keyboard.current.clientWidth >  document.body.clientWidth){
            offsetX = document.body.clientWidth - keyboard.current.clientWidth;
          }
          if(offsetY < 0){
            offsetY = 0;
          }
          if(offsetY + keyboard.current.clientHeight >  document.body.clientHeight){
            offsetY = document.body.clientHeight - keyboard.current.clientHeight;
          }
          keyboard.current.style.left = `${offsetX}px`;
          keyboard.current.style.top = `${offsetY}px`;
        }
      }
  
      function stopDragging() {
        isDragging = false;
      }
  
      keyboard.current.addEventListener("mousedown", startDragging);
      document.addEventListener("mousemove", dragging);
      document.addEventListener("mouseup", stopDragging);

      // Add touch event listeners
      keyboard.current.addEventListener("touchstart", startDragging);
      document.addEventListener("touchmove", dragging);
      document.addEventListener("touchend", stopDragging);

      document.querySelector(".BODY_content").addEventListener("mouseleave", stopDragging);
    }
  }, [keyboard]);
  
  return (
    <div className="keyboard" ref={keyboard}>
        <svg keyid="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 830 190">
        <g keyid=" " data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG3"}`} x="118" y="154.9" width="320" height="35.6" />
        </g>
        <g keyid="`|~" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="0.02" y="0.66" width="34.09" height="35.6" /><text fill={fillEnabled && "white"} className={`cls-2 ${fillEnabled && "colorG1"}`}
          transform="translate(2.03 15.7)">~</text><text className={`cls-2 ${fillEnabled && "colorG1"}`} transform="translate(5.16 43.2)">`</text>
        </g>
        <g keyid="1|!" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="37.59" y="0.5" width="34.09" height="35.6" /><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(44.8 14.27)">!</text><text className={`cls-3 ${fillEnabled && "colorG1"}`}  transform="translate(43.99 30.78)">1</text>
        </g>
        <g keyid="2|@" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG2"}`} x="74.67" y="0.5" width="34.09" height="35.6" /><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(81.78 14.27) scale(0.66 1)">@</text><text className={`cls-3 ${fillEnabled && "colorG1"}`}    transform="translate(82.25 30.78) scale(0.66 1)">2</text>
        </g>
        <g keyid="3|#" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG4"}`} x="111.76" y="0.5" width="34.09" height="35.6" /><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(118.32 15.27)">#</text><text className={`cls-3 ${fillEnabled && "colorG1"}`} transform="translate(117.51 31.78)">3</text>
        </g>
        <g keyid="4|$" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG5"}`} x="148.85" y="0.5" width="34.09" height="35.6" /><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(156.13 14.79)">$</text><text className={`cls-3 ${fillEnabled && "colorG1"}`} transform="translate(155.32 31.29)">4</text>
        </g>
        <g keyid="5|%" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG5"}`} x="185.93" y="0.5" width="34.09" height="35.6" /><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(193.89 14.63)">%</text><text className={`cls-3 ${fillEnabled && "colorG1"}`} transform="translate(193.08 31.13)">5</text>
        </g>
        <g keyid="6|^" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG6"}`} x="223.02" y="0.5" width="34.09" height="35.6" /><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(229.49 14.79)">^</text><text className={`cls-3 ${fillEnabled && "colorG1"}`} transform="translate(228.68 31.3)">6</text>
        </g>
        <g keyid="7|and" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG6"}`} x="260.11" y="0.5" width="34.09" height="35.6" /><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(266.65 15.33)">&amp;</text><text className={`cls-3 ${fillEnabled && "colorG1"}`} transform="translate(265.84 31.83)">7</text>
        </g>
        <g keyid="8|*" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG4"}`} x="297.2" y="0.5" width="34.09" height="35.6" /><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(303.77 15.14)">*</text><text className={`cls-3 ${fillEnabled && "colorG1"}`} transform="translate(302.96 31.65)">8</text>
        </g>
        <g keyid="9|(" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG2"}`} x="334.28" y="0.5" width="34.09" height="35.6" /><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(341.27 14.75)">(</text><text className={`cls-3 ${fillEnabled && "colorG1"}`} transform="translate(340.46 31.26)">9</text>
        </g>
        <g keyid="0|)" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="371.37" y="0.5" width="34.09" height="35.6" /><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(380.15 14.24)">)</text><text className={`cls-3 ${fillEnabled && "colorG1"}`} transform="translate(379.34 30.75)">0</text>
        </g>
        <g keyid="-|_" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="408.46" y="0.5" width="34.09" height="35.6" /><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(414.46 14.24)">_</text><text className={`cls-3 ${fillEnabled && "colorG1"}`} transform="translate(413.65 30.75)">-</text>
        </g>
        <g keyid="=|+" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="445.54" y="0.5" width="34.09" height="35.6" /><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(451.79 15.09)">+</text><text className={`cls-3 ${fillEnabled && "colorG1"}`} transform="translate(450.98 31.6)">=</text>
        </g>
        <g keyid="Backspace" data-name="key">
          <polygon key-type="special" className={`cls-1 ${fillEnabled && "backG1"}`}
          points="516.72 0.5 512 0.5 482.63 0.5 482.63 36.1 512 36.1 516.72 36.1 553.8 36.1 553.8 0.5 516.72 0.5" /><text className={`cls-4 ${fillEnabled && "colorG1"}`} transform="translate(488.43 21.61)">BACKSPACE</text>
        </g>
        <g keyid="Tab" data-name="key">
          <rect key-type="special" className={`cls-1 ${fillEnabled && "backG1"}`} x="0.5" y="39.1" width="53.5" height="35.6" /><text className={`cls-4 ${fillEnabled && "colorG1"}`}          transform="translate(4.77 61.72)">TAB</text>
        </g>
        <g keyid="CapsLock" data-name="key">
          <rect key-type="special" className={`cls-1 ${fillEnabled && "backG1"}`} x="0.5" y="77.7" width="61.5" height="35.6" /><text className={`cls-4 ${fillEnabled && "colorG1"}`}          transform="translate(4.55 98.45)">CAPS LOCK</text>
        </g>
        <g keyid="Shift-left" data-name="key">
          <rect key-type="special" className={`cls-1 ${fillEnabled && "backG1"}`} x="0.5" y="116.3" width="82.5" height="35.6" /><text className={`cls-4 ${fillEnabled && "colorG1"}`}          transform="translate(6.17 138.32)">SHIFT</text>
        </g>
        <g keyid="Ctrl-left" data-name="key">
          <rect key-type="special" className={`cls-1 ${fillEnabled && "backG1"}`} x="0.5" y="154.9" width="56.5" height="35.6" /><text className={`cls-4 ${fillEnabled && "colorG1"}`}          transform="translate(6.86 177.26)">CTRL</text>
        </g>
        <g keyid="Alt-left" data-name="key">
          <rect key-type="special" className={`cls-1 ${fillEnabled && "backG1"}`} x="60" y="154.9" width="54.67" height="35.6" /><text className={`cls-4 ${fillEnabled && "colorG1"}`}          transform="translate(67.97 177.1)">ALT</text>
        </g>
        <g keyid="Alt-right" data-name="key">
          <rect key-type="special" className={`cls-1 ${fillEnabled && "backG1"}`} x="441" y="154.9" width="59.72" height="35.6" /><text className={`cls-4 ${fillEnabled && "colorG1"}`}          transform="translate(451.7 177.07)">ALT</text>
        </g>
        <g keyid="Ctrl-right" data-name="key">
          <rect key-type="special" className={`cls-1 ${fillEnabled && "backG1"}`} x="504" y="154.9" width="49.8" height="35.6" /><text className={`cls-4 ${fillEnabled && "colorG1"}`}          transform="translate(514.34 177.23)">CTRL</text>
        </g>
        <g keyid="Shift-right" data-name="key">
          <rect key-type="special" className={`cls-1 ${fillEnabled && "backG1"}`} x="458" y="116.3" width="95.8" height="35.6" /><text className={`cls-4 ${fillEnabled && "colorG1"}`}          transform="translate(467.86 137.38)">SHIFT</text>
        </g>
        <g keyid="Enter" data-name="key">
          <rect key-type="special" className={`cls-1 ${fillEnabled && "backG1"}`} x="475" y="77.7" width="78.8" height="35.6" /><text className={`cls-4 ${fillEnabled && "colorG1"}`}          transform="translate(485.83 99.04)">ENTER</text>
        </g>
        <g keyid="[|{" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="428.46" y="39.1" width="34.09" height="35.6" /><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(434.81 52.4) scale(0.66 1)">{"{"}</text><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(435.28 68.91) scale(0.66 1)">[</text>
        </g>
        <g keyid="\" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="503" y="39.1" width="50.8" height="35.6" /><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(509.34 52.45) scale(0.66 1)">|</text><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(509.81 68.96) scale(0.66 1)">\</text>
        </g>
        <g keyid="]|}" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="465.54" y="39.1" width="34.09" height="35.6" /><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(471.23 52.41) scale(0.66 1)">{"}"}</text><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(471.7 68.92) scale(0.66 1)">]</text>
        </g>
        <g keyid="'" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="437.54" y="77.7" width="34.09" height="35.6" /><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(443.96 91.16) scale(0.66 1)">“</text><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(444.43 107.66) scale(0.66 1)">‘</text>
        </g>
        <g keyid=";|:" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="400.46" y="77.7" width="34.09" height="35.6" /><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(406.55 90.39) scale(0.66 1)">:</text><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(407.02 106.9) scale(0.66 1)">;</text>
        </g>
        <g keyid="/|?" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="420.46" y="116.3" width="34.09" height="35.6" /><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(426.45 129.31) scale(0.66 1)">?</text><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(426.92 145.82) scale(0.66 1)">/</text>
        </g>
        <g keyid=".|brright" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG2"}`} x="383.37" y="116.3" width="34.09" height="35.6" /><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(390.15 129.62) scale(0.66 1)">&gt;</text><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(390.62 146.12) scale(0.66 1)">.</text>
        </g>
        <g keyid=",|brleft" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG4"}`} x="346.28" y="116.3" width="34.09" height="35.6" /><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(351.98 129.33) scale(0.66 1)">&lt;</text><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(352.45 145.84) scale(0.66 1)">,</text>
        </g>
        <g keyid="q|Q" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="57.59" y="39.1" width="34.09" height="35.6" /><text className={`cls-5 ${fillEnabled && "colorG1"}`}          transform="translate(65.83 62.48)">Q</text>
        </g>
        <g keyid="w|W" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG2"}`} x="94.67" y="39.1" width="34.09" height="35.6" /><text className={`cls-5 ${fillEnabled && "colorG1"}`}          transform="translate(100.13 64.87)">W</text>
        </g>
        <g keyid="e|E" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG4"}`} x="131.76" y="39.1" width="34.09" height="35.6" /><text className={`cls-5 ${fillEnabled && "colorG1"}`}          transform="translate(143.37 64.05) scale(1.2 1)">E</text>
        </g>
        <g keyid="r|R" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG5"}`} x="168.85" y="39.1" width="34.09" height="35.6" /><text className={`cls-5 ${fillEnabled && "colorG1"}`}          transform="translate(179.33 64.78)">R</text>
        </g>
        <g keyid="t|T" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG5"}`} x="205.93" y="39.1" width="34.09" height="35.6" /><text className={`cls-5 ${fillEnabled && "colorG1"}`}          transform="translate(214.05 63.25)">T</text>
        </g>
        <g keyid="y|Y" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG6"}`} x="243.02" y="39.1" width="34.09" height="35.6" /><text className={`cls-5 ${fillEnabled && "colorG1"}`}          transform="translate(253.26 65.78)">Y</text>
        </g>
        <g keyid="u|U" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG6"}`} x="280.11" y="39.1" width="34.09" height="35.6" /><text className={`cls-5 ${fillEnabled && "colorG1"}`}          transform="translate(287.71 64.02)">U</text>
        </g>
        <g keyid="i|I" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG4"}`} x="317.2" y="39.1" width="34.09" height="35.6" /><text className={`cls-5 ${fillEnabled && "colorG1"}`}          transform="translate(329.89 64.61)">I</text>
        </g>
        <g keyid="o|O" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG2"}`} x="354.28" y="39.1" width="34.09" height="35.6" /><text className={`cls-5 ${fillEnabled && "colorG1"}`}          transform="translate(361.52 63.43)">O</text>
        </g>
        <g keyid="p|P" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="391.37" y="39.1" width="34.09" height="35.6" /><text className={`cls-5 ${fillEnabled && "colorG1"}`}          transform="translate(401.61 65.38)">P</text>
        </g>
        <g keyid="a|A" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="66.67" y="77.7" width="34.09" height="35.6" /><text className={`cls-5 ${fillEnabled && "colorG1"}`}          transform="translate(76.14 101.16)">A</text>
        </g>
        <g keyid="s|S" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG2"}`} x="103.76" y="77.7" width="34.09" height="35.6" /><text className={`cls-5 ${fillEnabled && "colorG1"}`}          transform="translate(114.86 101.59)">S</text>
        </g>
        <g keyid="d|D" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG4"}`} x="140.85" y="77.7" width="34.09" height="35.6" /><text className={`cls-5 ${fillEnabled && "colorG1"}`}          transform="translate(149.27 101.14)">D</text>
        </g>
        <g keyid="f|F" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG5"}`} x="177.93" y="77.7" width="34.09" height="35.6" /><text className={`cls-5 ${fillEnabled && "colorG1"}`}          transform="translate(188.76 101.59)">F</text>
        </g>
        <g keyid="g|G" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG5"}`} x="215.02" y="77.7" width="34.09" height="35.6" /><text className={`cls-5 ${fillEnabled && "colorG1"}`}          transform="translate(224.2 102.17)">G</text>
        </g>
        <g keyid="h|H" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG6"}`} x="252.11" y="77.7" width="34.09" height="35.6" /><text className={`cls-5 ${fillEnabled && "colorG1"}`}          transform="translate(260.12 102.02)">H</text>
        </g>
        <g keyid="j|J" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG6"}`} x="289.2" y="77.7" width="34.09" height="35.6" /><text className={`cls-5 ${fillEnabled && "colorG1"}`}          transform="translate(301.42 101.89)">J</text>
        </g>
        <g keyid="k|K" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG4"}`} x="326.28" y="77.7" width="34.09" height="35.6" /><text className={`cls-5 ${fillEnabled && "colorG1"}`}          transform="translate(336.44 102.3)">K</text>
        </g>
        <g keyid="l|L" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG2"}`} x="363.37" y="77.7" width="34.09" height="35.6" /><text className={`cls-5 ${fillEnabled && "colorG1"}`}          transform="translate(374.78 101.75)">L</text>
        </g>
        <g keyid="z|Z" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="86.67" y="116.3" width="34.09" height="35.6" /><text className={`cls-5 ${fillEnabled && "colorG1"}`}          transform="translate(97.65 140.45)">Z</text>
        </g>
        <g keyid="x|X" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG2"}`} x="123.76" y="116.3" width="34.09" height="35.6" /><text className={`cls-5 ${fillEnabled && "colorG1"}`}          transform="translate(133.42 140.92)">X</text>
        </g>
        <g keyid="c|C" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG4"}`} x="160.85" y="116.3" width="34.09" height="35.6" /><text className={`cls-6 ${fillEnabled && "colorG1"}`}          transform="translate(171.23 140.71)">C</text>
        </g>
        <g keyid="v|V" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG5"}`} x="197.93" y="116.3" width="34.09" height="35.6" /><text className={`cls-5 ${fillEnabled && "colorG1"}`}          transform="translate(207.88 140.96)">V</text>
        </g>
        <g keyid="b|B" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG5"}`} x="235.02" y="116.3" width="34.09" height="35.6" /><text className={`cls-5 ${fillEnabled && "colorG1"}`}          transform="translate(244.95 141.06)">B</text>
        </g>
        <g keyid="n|N" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG6"}`} x="272.11" y="116.3" width="34.09" height="35.6" /><text className={`cls-5 ${fillEnabled && "colorG1"}`}          transform="translate(281.29 140.76)">N</text>
        </g>
        <g keyid="m|M" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG6"}`} x="309.2" y="116.3" width="34.09" height="35.6" /><text className={`cls-5 ${fillEnabled && "colorG1"}`}          transform="translate(315.82 140.96)">M</text>
        </g>
        <g keyid="Insert" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="564.87" y="0.5" width="34.09" height="35.6" /><text className={`cls-7 ${fillEnabled && "colorG1"}`}          transform="translate(567.58 14.89)">INSERT</text>
        </g>
        <g keyid="Home" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="601.96" y="0.5" width="34.09" height="35.6" /><text className={`cls-7 ${fillEnabled && "colorG1"}`}          transform="translate(606.19 15.44)">HOME</text>
        </g>
        <g keyid="PageUp" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="639.04" y="0.5" width="34.09" height="35.6" /><text className={`cls-7 ${fillEnabled && "colorG1"}`}          transform="translate(642.47 15.31)">PAGE<tspan x="0" y="9.6">UP</tspan></text>
        </g>
        <g keyid="Delete" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="564.87" y="39.1" width="34.09" height="35.6" /><text className={`cls-7 ${fillEnabled && "colorG1"}`}          transform="translate(567.4 53.56)">DELETE</text>
        </g>
        <g keyid="End" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="601.96" y="39.1" width="34.09" height="35.6" /><text className={`cls-7 ${fillEnabled && "colorG1"}`}          transform="translate(606.01 54.11)">END</text>
        </g>
        <g keyid="PageDown" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="639.04" y="39.1" width="34.09" height="35.6" /><text className={`cls-7 ${fillEnabled && "colorG1"}`}          transform="translate(642.28 53.98)">PAGE<tspan x="0" y="9.6">DOWN</tspan></text>
        </g>
        <g keyid="ArrowUp" data-name="key" type="arrow">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="601.96" y="116.3" width="34.09" height="35.6" />
          <polygon points="612.58 138.75 626.34 139.01 619.39 128.61 612.58 138.75" />
        </g>
        <g keyid="ArrowRight" data-name="key" type="arrow">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="639.04" y="154.9" width="34.09" height="35.6" />
          <polygon points="651.38 165.47 651.12 179.23 661.53 172.28 651.38 165.47" />
        </g>
        <g keyid="ArrowDown" data-name="key" type="arrow">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="601.96" y="154.9" width="34.09" height="35.6" />
          <polygon points="625.3 167.61 611.55 167.35 618.5 177.75 625.3 167.61" />
        </g>
        <g keyid="ArrowLeft" data-name="key" type="arrow">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="564.87" y="154.9" width="34.09" height="35.6" />
          <polygon points="586.94 179.5 587.2 165.75 576.79 172.69 586.94 179.5" />
        </g>
        <g keyid="NumLock" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG6"}`} x="685.15" y="0.5" width="34.09" height="35.6" /><text className={`cls-7 ${fillEnabled && "colorG1"}`}          transform="translate(690.13 15.24)">NUM<tspan x="0" y="9.6">LOCK</tspan></text>
        </g>
        <g keyid="num-/-num" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG4"}`} x="722.24" y="0.5" width="34.09" height="35.6" /><text className={`cls-8 ${fillEnabled && "colorG1"}`}          transform="translate(735.72 23.39)">/</text>
        </g>
        <g keyid="num-mul-num" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG2"}`} x="759.33" y="0.5" width="34.09" height="35.6" /><text className={`cls-8 ${fillEnabled && "colorG1"}`}          transform="translate(772.85 24.55)">*</text>
        </g>
        <g keyid="num-9-num" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG2"}`} x="759.33" y="39.1" width="34.09" height="35.6" /><text className={`cls-8 ${fillEnabled && "colorG1"}`}          transform="translate(772.21 61.79)">9</text>
        </g>
        <g keyid="num---num" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG1"}`} x="796.41" y="0.5" width="34.09" height="35.6" /><text className={`cls-8 ${fillEnabled && "colorG1"}`}          transform="translate(810.46 22.65)">-</text>
        </g>
        <g keyid="num-8-num" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG4"}`} x="722.24" y="39.1" width="34.09" height="35.6" /><text className={`cls-8 ${fillEnabled && "colorG1"}`}          transform="translate(735.01 62.01)">8</text>
        </g>
        <g keyid="num-7-num" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG6"}`} x="685.15" y="39.1" width="34.09" height="35.6" /><text className={`cls-8 ${fillEnabled && "colorG1"}`}          transform="translate(698.22 62.11)">7</text>
        </g>
        <g keyid="num-6-num" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG2"}`} x="759.33" y="77.7" width="34.09" height="35.6" /><text className={`cls-8 ${fillEnabled && "colorG1"}`}          transform="translate(771.42 100.37)">6</text>
        </g>
        <g keyid="num-5-num" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG4"}`} x="722.24" y="77.7" width="34.09" height="35.6" /><text className={`cls-8 ${fillEnabled && "colorG1"}`}          transform="translate(734.22 100.6)">5</text>
        </g>
        <g keyid="num-4-num" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG6"}`} x="685.15" y="77.7" width="34.09" height="35.6" /><text className={`cls-8 ${fillEnabled && "colorG1"}`}          transform="translate(697.43 100.7)">4</text>
        </g>
        <g keyid="num-3-num" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG2"}`} x="759.33" y="116.3" width="34.09" height="35.6" /><text className={`cls-8 ${fillEnabled && "colorG1"}`}          transform="translate(771.8 139.54)">3</text>
        </g>
        <g keyid="num-2-num" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG4"}`} x="722.24" y="116.3" width="34.09" height="35.6" /><text className={`cls-8 ${fillEnabled && "colorG1"}`}          transform="translate(734.6 139.77)">2</text>
        </g>
        <g keyid="num-1-num" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG6"}`} x="685.15" y="116.3" width="34.09" height="35.6" /><text className={`cls-8 ${fillEnabled && "colorG1"}`}          transform="translate(697.81 139.87)">1</text>
        </g>
        <g keyid="num-0-num" data-name="key">
          <polygon className={`cls-1 ${fillEnabled && "backG3"}`}
          points="719.24 154.9 712 154.9 685.15 154.9 685.15 190.5 712 190.5 719.24 190.5 756.33 190.5 756.33 154.9 719.24 154.9" />
          <text className="cls-8" transform="translate(699.39 177.76)">0</text>
        </g>
        <g keyid="num-Delete-num" data-name="key">
          <rect className={`cls-1 ${fillEnabled && "backG2"}`} x="759.33" y="154.9" width="34.09" height="35.6" /><text className={`cls-3 ${fillEnabled && "colorG1"}`}          transform="translate(763.99 176.57)">DEL</text>
        </g>
        <g keyid="num-plus-num" data-name="key">
          <polygon className={`cls-1 ${fillEnabled && "backG1"}`}
          points="796.41 39.1 796.41 77.7 796.41 82.5 796.41 113.3 830.5 113.3 830.5 82.5 830.5 77.7 830.5 39.1 796.41 39.1" />
          <text className={`cls-8 ${fillEnabled && "colorG1"}`} transform="translate(817.88 63.36)">+</text>
        </g>
        <g keyid="num-Enter-num" data-name="key">
          <polygon className={`cls-1 ${fillEnabled && "backG1"}`}
          points="796.41 116.3 796.41 154.9 796.41 156.5 796.41 190.5 830.5 190.5 830.5 156.5 830.5 154.9 830.5 116.3 796.41 116.3" />
          <text className={`cls-9 ${fillEnabled && "colorG1"}`} transform="translate(798.6 135.94)">ENTER</text>
        </g>
        </svg>
      </div>
  )
}

export default Keyboard