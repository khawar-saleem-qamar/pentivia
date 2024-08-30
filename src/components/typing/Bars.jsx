import React, {useEffect, useRef} from 'react'
import './bars.css'
import Keyboard from './Keyboard'

const Bars = ({userId, token, bar, time, typingContent, typingSource, keyboard, updateString = null, updatedString="", saveTest = true, sliceString=0}) => {
    var scriptsAdded = useRef(null);

  useEffect(() => {
    if (!scriptsAdded.current) {
      var element = document.createElement('script')
      element.src = "/scripts/MonkeyBar.js";
      element.async = true;
      element.type = "module";
      document.body.appendChild(element)
      scriptsAdded.current = element;

      element.onload =()=>{
        element = document.createElement('script')
        element.src = "/scripts/keyboardscript.js";
        element.async = true;
        element.type = "module";
        document.body.appendChild(element)
        
        // scriptKeyboardJs.onLoad(()=>{
          var userSeconds = 0;
          function htmlTemp(string) {
              var template = document.createElement("template");
              template.innerHTML = string.trim();
              return template.content.firstElementChild;
            }
            
            
            function validateJson(json){
              try{
                JSON.parse(json);
              }catch{
                return false;
              }
              return true;
            }
            
            function setCookie(cname, cvalue, exdays) {
              const d = new Date();
              d.setTime(d.getTime() + (exdays*24*60*60*1000));
              let expires = "expires="+ d.toUTCString();
              document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            }
            
            function getCookie(cname) {
              let name = cname + "=";
              let decodedCookie = decodeURIComponent(document.cookie);
              let ca = decodedCookie.split(';');
              for(let i = 0; i <ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                  c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                  return c.substring(name.length, c.length);
                }
              }
              return "";
            }
            
            
            function getRandomItem(arr) {
            
              // get random index value
              const randomIndex = Math.floor(Math.random() * arr.length);
            
              // get random item
              const item = arr[randomIndex];
            
              return item;
            }
            
            const merge = (first, second) => {
              for(let i=0; i<second.length; i++) {
                first.push(second[i]);
              }
              return first;
            }
            
            function create_UUID(){
              var dt = new Date().getTime();
              var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                  var r = (dt + Math.random()*16)%16 | 0;
                  dt = Math.floor(dt/16);
                  return (c=='x' ? r :(r&0x3|0x8)).toString(16);
              });
              return uuid;
            }
            
            function removeSpecific(array, item){
              const index = array.indexOf(item);
            if (index > -1) { // only splice array when item is found
              array.splice(index, 1); // 2nd parameter means remove one item only
            }
            }
  
  
            async function fetchApi(url, method, body, callback){
              try {
                const res = await fetch(`http://localhost:4000${url}`, {
                  method: method,
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(body),
                })
          
                const data = await res.json();
                if(!data.success){
                  callback(false, data.body);
                }else{
                  callback(true, data.body)
                }
              } catch (error) {
                callback(false, "Something went wrong");
              }
            }
            
            
            function updateSeconds(userId){
              userSeconds = ++userSeconds
            }
            
            function updateStartedTestsCount(userId){
              fetchApi("/user/setTestStarted", "PATCH", {
                userid: userId
              }, (success, res)=>{
                if(!success){
                  alert(res);
                }
              })
            }
            
            function updateEndedTestsCount(userId){
              fetchApi("/user/setTestEnded", "PATCH", {
                userid: userId,
                seconds: userSeconds
              }, (success, res)=>{
                if(!success){
                  alert(res);
                }
              })
            }
            
            function resetTypingString(w, p, n, stringLength = 100){  
              var word = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, earum quisquam esse ab distinctio inventore nobis id perferendis culpa eos quidem tempore, omnis est? Quisquam itaque officiis, minus consectetur dignissimos adipisci quo placeat iure, aliquid, sit animi beatae fugiat possimus sed natus odit et voluptatum. Optio, eligendi. Alias inventore dignissimos eaque nobis repudiandae aliquam? Alias, repellendus doloribus numquam, iusto possimus ipsum, minus saepe beatae mollitia sunt necessitatibus assumenda consequuntur unde consequatur aperiam? Voluptatum ducimus vero minima Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, earum quisquam esse ab distinctio inventore nobis id perferendis culpa eos quidem tempore, omnis est? Quisquam itaque officiis, minus consectetur dignissimos adipisci quo placeat iure, aliquid, sit animi beatae fugiat possimus sed natus odit et voluptatum. Optio, eligendi. Alias inventore dignissimos eaque nobis repudiandae aliquam? Alias, repellendus doloribus numquam, iusto possimus ipsum, minus saepe beatae mollitia sunt necessitatibus assumenda consequuntur unde consequatur aperiam? Voluptatum ducimus vero minima Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, earum quisquam esse ab distinctio inventore nobis id perferendis culpa eos quidem tempore, omnis est? Quisquam itaque officiis, minus consectetur dignissimos adipisci quo placeat iure, aliquid, sit animi beatae fugiat possimus sed natus odit et voluptatum. Optio, eligendi. Alias inventore dignissimos eaque nobis repudiandae aliquam? Alias, repellendus doloribus numquam, iusto possimus ipsum, minus saepe beatae mollitia sunt necessitatibus assumenda consequuntur unde consequatur aperiam? Voluptatum ducimus vero minima Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur`;
              word = word.split(" ")
              
              var punctuation = `- = \` [ ] \ ; ' , . / ~ ! @ # $ % ^ & * ( ) _ + { } | : " < > ? ' - = \` [ ] \ ; ' , . / ~ ! @ # $ % ^ & * ( ) _ + { } | : " < > ? ' - = \` [ ] \ ; ' , . / ~ ! @ # $ % ^ & * ( ) _ + { } | : " < > ? ' - = \` [ ] \ ; ' , . / ~ ! @ # $ % ^ & * ( ) _ + { } | : " < > ? ' - = \` [ ] \ ; ' , . / ~ ! @ # $ % ^ & * ( ) _ + { } | : " < > ? ' - = \` [ ] \ ; ' , . / ~ ! @ # $ % ^ & * ( ) _ + { } | : " < > ? ' - = \` [ ] \ ; ' , . / ~ ! @ # $ % ^ & * ( ) _ + { } | : " < > ? ' - = \` [ ] \ ; ' , . / ~ ! @ # $ % ^ & * ( ) _ + { } | : " < > ? ' - = \` [ ] \ ; ' , . / ~ ! @ # $ % ^ & * ( ) _ + { } | : " < > ? ' - = \` [ ] \ ; ' , . / ~ ! @ # $ % ^ & * ( ) _ + { } | : " < > ? ' - = \` [ ] \ ; ' , . / ~ ! @ # $ % ^ & * ( ) _ + { } | : " < > ? ' - = \` [ ] \ ; ' , . / ~ ! @ # $ % ^ & * ( ) _ + { } | : " < > ? ' - = \` [ ] \ ; ' , . / ~ ! @ # $ % ^ & * ( ) _ + { } | : " < > ? ' - = \` [ ] \ ; ' , . / ~ ! @ # $ % ^ & * ( ) _ + { } | : " < > ? ' - = \` [ ] \ ; ' , . / ~ ! @ # $ % ^ & * ( ) _ + { } | : " < > ? ' - = \` [ ] \ ; ' , . / ~ ! @ # $ % ^ & * ( ) _ + { } | : " < > ? ' - = \` [ ] \ ; ' , . / ~ ! @ # $ % ^ & * ( ) _ + { } | : " < > ? ' - = \` [ ] \ ; ' , . / ~ ! @ # $ % ^ & * ( ) _ + { } | : " < > ? ' - = \` [ ] \ ; ' , . / ~ ! @ # $ % ^ & * ( ) _ + { } | : " < > ? ' - = \` [ ] \ ; ' , . / ~ ! @ # $ % ^ & * ( ) _ + { } | : " < > ? ' - = \` [ ] \ ; ' , . / ~ ! @ # $ % ^ & * ( ) _ + { } | : " < > ? '`;
              punctuation = punctuation.split(" ");
              
              var number = `0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9`;
              number = number.split(" ");
              
              var typingString = ""
              var stringSource = [];
              if(n == true){
                  stringSource = merge(stringSource, number)
              }
              if(p == true){
                  stringSource = merge(stringSource, punctuation)
              }
              if(w == true){
                  stringSource = merge(stringSource, word)
              }
            
              for(var i = 1; i <= stringLength; i++){
                  if(i == stringLength){
                      typingString += getRandomItem(stringSource)
                  }else{
                      typingString += getRandomItem(stringSource) + " ";
                  }
              }
              return typingString;
            }
            
            
            function getMaxPlotValue(wpms, raws){
              var largest = wpms[0];
              for(let i = 1; i < wpms.length; i++){
              if(wpms[i] > largest){
              largest = wpms[i];
              }
              }
              for(let i = 0; i < wpms.length; i++){
              if(raws[i] > largest){
              largest = raws[i];
              }
              }
              return largest;
              }
            
              function setResultCanvas(canvas, profile=false){
                  var bodyContent = document.querySelector(".bodyContent");
                  if(profile){
                      bodyContent = document.querySelector(".bodyContent[type=profile]")
                  }
                  // var parent = ;
              canvas.width = ((bodyContent.offsetWidth )- 60) - 100;
              canvas.height = "200";
              //  canvas.style.backgroundColor = "green";
              // canvas.style = "border: 1px solid white";
              }
            
              function initGraph(duration, canvas, speedBlocks, wpms, raws, errorLetters, marginLeft, marginRight, marginBottom, marginTop, roundedLargest, aggregate){
                  var c = canvas.getContext('2d');
                  // c.transform(1, 0, 0, -1, 0, canvas.height);
                  var xBlock;
                  var xBlockLength;
                  var yBlock;
                  var yBlockLength;
                  var valInc = 1;
                  if(parseInt(duration) == 240){
                      valInc = 12;
                  }else if(parseInt(duration) == min){
                      valInc = 6;
                  }else if(parseInt(duration) == 60){
                      valInc = 3;
                  }else if(parseInt(duration) == 30){
                      valInc = 2;
                  }else{
                  }
                  xBlock = duration - 1;
                  xBlockLength = (( canvas.width - (marginLeft + marginRight) ) / xBlock );
                  yBlock = speedBlocks;
                  var maxErrors = getMaxArrayValue(errorLetters);
                  var errorInc = Math.round(maxErrors / yBlock);
                  if(maxErrors <= yBlock){
                      errorInc = 1;
                      maxErrors = yBlock;
                  }
                  var errorBlock = maxErrors;
                  var errorBlockLength = (canvas.height - (marginBottom + marginTop)) / errorBlock;
                  yBlockLength = ( canvas.height - (marginTop + marginBottom) ) / yBlock;
                  // drawErrorPoints
                  drawGrid(c, canvas, xBlock, xBlockLength, yBlock, yBlockLength, marginLeft, canvas.width - marginRight, marginBottom, canvas.height - marginTop, "rgba(0, 0, 0, 0.1)", 1, valInc, duration, aggregate, errorLetters, marginBottom, marginTop, maxErrors, errorInc, errorBlock, errorBlockLength);
                  var rawPoints = generatePointsArray(raws, duration, yBlockLength, xBlockLength*valInc, marginLeft, marginBottom, marginTop, canvas.height, yBlock, roundedLargest, valInc)
                  console.log("rawPoints ")
                  console.log(rawPoints)
                  var errorColor= "red";
                  var wpmColor= "orange";
                  var rawColor= "grey";
                  drawPointedFilledLine(canvas, rawPoints, 3, 3, rawColor, "rgba(0,0,0,0.3)", marginLeft, marginRight, marginBottom, marginTop);
                  var wpmPoints = generatePointsArray(wpms, duration, yBlockLength, xBlockLength*valInc, marginLeft, marginBottom, marginTop, canvas.height, yBlock, roundedLargest, valInc)
                  console.log("wpmPoints ")
                  console.log(wpmPoints)
                  drawPointedFilledLine(canvas, wpmPoints, 3, 3, wpmColor, "rgba(0,0,0,0.2)", marginLeft, marginRight, marginBottom, marginTop)
                  var errorPoints = generateErrorPointsArray(errorLetters, duration, xBlockLength, xBlockLength*valInc, marginLeft, marginBottom, marginTop, canvas.height, xBlock, maxErrors, valInc, errorBlock, errorBlockLength);
                  console.log("errorPoints");
                  console.log(errorLetters)
                  console.log(errorPoints);
                  drawErrorPoints(canvas, errorPoints, 3, errorColor, marginLeft, marginRight, marginBottom, marginTop);
                  var hoverResultBox = htmlTemp(`
                  <div id="hoverResultBox">
                      <div class="currentsecond info" id="cSecondVal">34</div>
                      <div class="error infoBox" style="--clr: ${errorColor}">
                          <div class="repBox"></div>
                          <span class="info" class="errors">
                              Errors: <span id="errorVal">0</span>
                          </span>
                      </div>
                      <div class="wpm infoBox" style="--clr: ${wpmColor}">
                          <div class="repBox"></div>
                          <span class="info" class="wpms">
                              Wpm: <span id="wpmVal">0</span>
                          </span>
                      </div>
                      <div class="raw infoBox" style="--clr: ${rawColor}">
                          <div class="repBox"></div>
                          <span class="info" class="raws">
                              Raw: <span id="rawVal">0</span>
                          </span>
                      </div>
                  </div>
                  `);
                  document.body.appendChild(hoverResultBox)
                  
                  console.log("wmps", wpms)
                  console.log("errors", errorLetters)
                  console.log("raws",raws)
                  addHoverResult(canvas, marginLeft, marginRight, marginBottom, marginTop, xBlock, xBlockLength, hoverResultBox, wpms, raws, errorLetters);
              }
            
              function getMaxArrayValue(array){
                  var largest = array[0];
                  for(let i = 1; i < array.length; i++){
                      if(array[i] > largest){
                          largest = array[i];
                      }
                  }
                  return largest;
              }
              
              function drawGrid(c, canvas, xBlock, xBlockLength, yBlock, yBlockLength, startX, endX, startY, endY, gridColor, gridWidth, valInc, duration, aggregate, errorLetters, marginBottom, marginTop, maxErrors, errorInc, errorBlock, errorBlockLength){
            
                  c.font = "12px Robot Mono";
                  if(document.body.classList.contains("light")){
                      c.fillStyle = "black"
                  }else{
                      c.fillStyle = "white";
            
                  }
            
                  // for errors
                  if(maxErrors != 0){
                      // var maxErrors = getMaxArrayValue(errorLetters);
                      // var errorInc = Math.round(maxErrors / yBlock);
                      // var errorBlock = yBlock;
                      // var errorBlockLength = (canvas.height - (marginBottom + marginTop)) / errorBlock;
                      console.log("error info")
                      console.log(errorBlockLength)
                      console.log(errorBlock)
                      
                      for(let i= 0; i <= yBlock - 1; i++){
                          c.beginPath();
                          c.fillText(`${i * errorInc}`, canvas.width - 40, canvas.height - ((i * yBlockLength) + marginBottom));
                          // c.arc(canvas.width - 30, (i * errorBlockLength) - startY, 4, 0, Math.PI * 2, false);
                          c.fill();
                      }
                      c.beginPath();
                          c.fillText(`${maxErrors}`, canvas.width - 40, canvas.height - ((yBlock * yBlockLength) + marginBottom));
                          c.fill();
                  }
            
                  //for errors
            
                  var x = -15;
                  var y = 100;
                  c.save();
                  c.translate(x, y);
                  c.rotate(-Math.PI / 2);
            
                  c.textAlign = 'right';
                  c.fillText('Words Per Minute', 50, 30);
            
                  c.restore();
            
                  x = canvas.width - 40
                  y = 160
            
                  c.save();
                  c.translate(x, y);
                  c.rotate(-Math.PI / 2);
            
                  c.textAlign = 'left';
                  c.fillText('Errors', 50, 30);
            
                  c.restore();
                  c.fillText("1", startX, canvas.height - 10)
                  for(let i = 1; i < xBlock; i++){ 
                  if(i % valInc == 0){
                  c.fillText(`${i + 1}`, startX + ( i * xBlockLength ), canvas.height - 10)
                  }
                  }
                  c.fillText("0", startX - 20, endY - 12)
                  for(let i = 1; i <= yBlock; i++){
                  c.fillText(`${i * aggregate}`, startX - 20, endY -  ((i * yBlockLength) + 12))
                  }
                  c.transform(1, 0, 0, -1, 0, canvas.height);
                  c.strokeStyle = gridColor;
                  c.lineWidth = gridWidth;
                  for(let i = 0; i <= xBlock; i++){ 
                  if(i == 0){
                  c.beginPath();
                  c.moveTo(startX, startY);
                  c.lineTo(startX, endY)
                  }else if(i % valInc == 0){
                  c.beginPath();
                  c.moveTo(startX + ( i * xBlockLength ), startY);
                  c.lineTo(startX + ( i * xBlockLength ), endY)
                  }else if(i == xBlock){
                  c.beginPath();
                  c.moveTo(startX + ( i * xBlockLength ), startY);
                  c.lineTo(startX + ( i * xBlockLength ), endY)
                  }
                  c.stroke();
                  }
                  for(let j = 0; j <= yBlock; j++){
                  if(j == 0){
                  c.beginPath();
                  c.moveTo(startX, startY);
                  c.lineTo(endX, startY)
                  }else{
                  c.beginPath();
                  c.moveTo(startX, startY + ( j * yBlockLength ) );
                  c.lineTo(endX, startY + ( j * yBlockLength ))
                  }
                  c.stroke();
                  }
              }
            
              function generatePointsArray(array, duration, yBlockLength, xBlockLength, marginLeft, marginBottom, marginTop, cHeight, yBlock, roundedLargest, valInc){
                  var arrayGenerated = [];
                  console.log("rounded largest: "+roundedLargest)
                  arrayGenerated.push({
                  x: marginLeft,
                  y: ((((array[0] / roundedLargest) * 100) / 100) * (cHeight - (marginBottom + marginTop))) + marginBottom
                  })
                  for(let i = 1; i < duration; i++){
                  arrayGenerated.push({
                  x: arrayGenerated[i - 1].x + (xBlockLength / valInc),
                  y: ((((array[i] / roundedLargest) * 100) / 100) * (cHeight - (marginBottom + marginTop)) ) + marginBottom
                  })
                  }
                  console.log(arrayGenerated)
                  return arrayGenerated;
                  }
                  
              function generateErrorPointsArray(array, duration, yBlockLength, xBlockLength, marginLeft, marginBottom, marginTop, cHeight, yBlock, roundedLargest, valInc, errorBlock, errorBlockLength){
                  var arrayGenerated = [];
                  console.log("rounded largest: "+roundedLargest)
                  arrayGenerated.push({
                  x: marginLeft,
                  y: (array[0] * errorBlockLength) + marginBottom
                  })
                  for(let i = 1; i < duration; i++){
                  arrayGenerated.push({
                  x: arrayGenerated[i - 1].x + (xBlockLength / valInc),
                  y: (array[i] * errorBlockLength ) + marginBottom
                  })
                  }
                  console.log(arrayGenerated)
                  return arrayGenerated;
              }
            
              function generateTestArray(canvas, duration, yBlockLength, xBlockLength, marginLeft){
              var arrayGenerated = [];
              arrayGenerated.push({
              x: marginLeft,
              y: Math.floor(Math.random() * (canvas.height) / yBlockLength) * yBlockLength + 5
              })
              for(let i = 1; i <= duration; i++){
              arrayGenerated.push({
              x: arrayGenerated[i - 1].x + xBlockLength,
              y: Math.floor(Math.random() * (canvas.height) / yBlockLength) * yBlockLength + 5
              })
              }
              return arrayGenerated;
              }
            
            
            
            
              function drawPointedLine(c, a, lineWidth, dotwidth, color){
              c.lineWidth = lineWidth;
              c.fillStyle = color;
              c.strokeStyle = color;
              for(let i = 0; i < a.length; i++){
              if(i == 0){
              c.beginPath();
              c.arc(a[i].x, a[i].y, dotwidth, 0, Math.PI * 2, false);
              c.fill();
              }else{
              c.beginPath();
              c.moveTo(a[i - 1].x, a[i - 1].y);
              c.lineTo(a[i].x, a[i].y);
              c.stroke();
              c.beginPath();
              c.arc(a[i].x, a[i].y, dotwidth, 0, Math.PI * 2, false);
              c.fill();
              }
              }
              }
            
              function drawErrorPoints(canvas, a, dotWidth,  fillColor, marginLeft, marginRight, marginBottom, marginTop){
                  var c = canvas.getContext('2d');
                  c.fillStyle = fillColor;
                  var yTop = canvas.height - (marginTop);
                  for(let i = 0; i < a.length; i++){
                      if(a[i].y > marginBottom){
                          if(a[i].y >= yTop){
                              a[i].y = yTop;
                          }
                          if(i == 0){
                              c.beginPath();
                              c.arc(a[i].x, a[i].y, dotWidth, 0, Math.PI * 2, false);
                              c.fill();
                          }else{
                              c.beginPath();
                              c.arc(a[i].x, a[i].y, dotWidth, 0, Math.PI * 2, false);
                              c.fill();
                          }
                      }
                  }
              }
            
              function drawPointedFilledLine(canvas, a, lineWidth, dotwidth, strokeColor, fillColor, marginLeft, marginRight, marginBottom, marginTop){
              var c = canvas.getContext('2d');
              // c.transform(1, 0, 0, -1, 0, canvas.height)
              c.lineWidth = lineWidth;
              c.fillStyle = strokeColor;
              c.strokeStyle = strokeColor;
              var yTop = canvas.height - (marginTop);
              for(let i = 0; i < a.length; i++){
              if(a[i].y >= yTop){
              a[i].y = yTop;
              }
              if(i == 0){
              c.beginPath();
              c.arc(a[i].x, a[i].y, dotwidth, 0, Math.PI * 2, false);
              c.fill();
              }else{
              c.beginPath();
              c.arc(a[i].x, a[i].y, dotwidth, 0, Math.PI * 2, false);
              c.fill();
              }
              }
              
              bzCurve(a, 0.3, 1, c);
              c.stroke();
              
              c.fillStyle =fillColor;
                  
              bzCurve(a, 0.3, 1, c);
              c.lineTo(canvas.width - marginRight, marginBottom);
              
              c.lineTo(a[0].x, marginBottom);
              
              c.lineTo(a[0].x, a[0].y)
              c.fill();
            
              }
            
            
              function gradient(a, b) {
              return (b.y-a.y)/(b.x-a.x);
              }
              
              function bzCurve(points, f, t, ctx) {
              if (typeof(f) == 'undefined') f = 0.0;
              if (typeof(t) == 'undefined') t = 0.0;
            
              ctx.beginPath();
              ctx.moveTo(points[0].x, points[0].y);
            
              var m = 0;
              var dx1 = 0;
              var dy1 = 0;
              
              var preP = points[0];
              
              for (var i = 1; i < points.length; i++) {
                  var curP = points[i];
                  var nexP = points[i + 1];
                  if (nexP) {
                      m = gradient(preP, nexP);
                      var dx2 = (nexP.x - curP.x) * -f;
                      var dy2 = dx2 * m * t;
                  } else {
                      dx2 = 0;
                      dy2 = 0;
                  }
                  
                  ctx.bezierCurveTo(
                      preP.x - dx1, preP.y - dy1,
                      curP.x + dx2, curP.y + dy2,
                      curP.x, curP.y
                  );
              
                  dx1 = dx2;
                  dy1 = dy2;
                  preP = curP;
              }
              }
            
              function addHoverResult(canvas, marginLeft, marginRight, marginBottom, marginTop, xBlock, xBlockLength, hoverResultBox, wpms, raws, errorLetters){
                  var c = canvas.getContext('2d')
                  canvas.addEventListener("mouseleave", (e)=>{
                      hoverResultBox.style.display = "none"
                  })
                  canvas.addEventListener("mousemove", (e)=>{
                      console.log("wmps", wpms)
                      console.log("errors", errorLetters)
                      console.log("raws", raws)
                      var rect = canvas.getBoundingClientRect();
                      var clickX = e.clientX - rect.left;
                      var clickY = e.clientY - rect.top;
                      console.log("clickx: ", clickX)
                      console.log("marginleft: ",parseInt(marginLeft))
                      console.log("marginright: ",marginRight)
                      console.log("clicky: ",clickY)
                      if(clickX > marginLeft && clickX < canvas.width - marginRight && clickY > marginTop && clickY < canvas.height - marginBottom){
                          hoverResultBox.style.display = "flex"
                          clickY = canvas.height - clickY;
                          clickX = clickX - marginLeft;
                          // c.beginPath();
                          // c.fillStyle = "orange";
                          // c.arc(marginLeft + clickX, clickY, 2, 0, Math.PI * 2, false);
                          // c.fill()
                          // c.beginPath();
                          // c.fillStyle = "green"   ;
                          var estimatedX = Math.round(clickX / xBlockLength) * xBlockLength;
                          // c.arc(marginLeft + estimatedX, clickY, 2, 0, Math.PI * 2, false);
                          // c.fill();
                          if((estimatedX + marginLeft) < (marginLeft + (canvas.width - (marginLeft + marginBottom))) / 2){
                              hoverResultBox.style.left = (marginLeft + estimatedX + (hoverResultBox.offsetWidth / 2)) + document.querySelector(".bodyContent").getBoundingClientRect().left +"px";
                              hoverResultBox.style.right = "auto";
                          }else{
                              hoverResultBox.style.right = canvas.width - (marginLeft + estimatedX -  (hoverResultBox.offsetWidth / 2))  +"px";
                              hoverResultBox.style.left = "auto";
                          }
                          hoverResultBox.style.top = (canvas.getBoundingClientRect().top + ((canvas.height - hoverResultBox.offsetHeight) / 2))+ "px"
                          var currentSecond = Math.round((estimatedX / xBlockLength) + 1);
                          console.log("Point Clicked: "+`(x: ${clickX} | y: ${clickY} | estimatedY: ${estimatedX} | SecondNumber: ${currentSecond})`);
                          (hoverResultBox.querySelector("#cSecondVal")).innerText = currentSecond;
                          (hoverResultBox.querySelector("#errorVal")).innerText = errorLetters[currentSecond - 1 ];
                          (hoverResultBox.querySelector("#wpmVal")).innerText = wpms[currentSecond - 1 ];
                          (hoverResultBox.querySelector("#rawVal")).innerText = raws[currentSecond - 1 ];
                          // hoverResultBox.innerText = "Current Second: "+currentSecond;
                      }
                  })
              }
            
              function normalize(val, max, min){
                  var norm = (val - min) / (max - min);
                  return norm;
              }
            
              function initWords(words, colorWords){
                  var wordHover = colorWords.appendChild(htmlTemp(`<div id="wordInfoHover"></div>`));
                  words.forEach(word => {
                      var wordHtml = `<div class="word ${word.type}" original-data="${word.originalWord}">`;
                      if(word.stringTyped.includes("{|{|[")){
                          var wordsplit = word.stringTyped.split("{|{|[");
                          console.log("before word",wordsplit)
                          if(!wordsplit[0].includes("]|}|}")){
                              if(wordsplit[0].trim() != ""){
                                  wordHtml += `<div class="correct">${wordsplit[0]}</div>`
                              }
                              wordsplit = wordsplit.slice(1, wordsplit.length)
                          }
                          console.log("after word",wordsplit)
                          wordsplit.forEach(split => {
                              var splitsplit = split.split("]|}|}");
                              console.log("splitsplit: ", splitsplit)
                              var sign = splitsplit[0][0];
                              console.log("sign: ", sign)
                              var mainLetter = ((splitsplit[0]).split(sign))[1];
                              if(sign == ":"){
                                  var incorrectSplit = mainLetter.split("&&");
                                  wordHtml += `<div class="incorrect" correct-data="${incorrectSplit[1]}">${incorrectSplit[0]}
                                      <div class="hover"><span>Typed: </span>${incorrectSplit[1]}</div>
                                  </div>`
                              }else if(sign == ";"){
                                  wordHtml += `<div class="unTyped">${mainLetter}</div>`                
                              }
                              if(splitsplit[1].trim() != ""){
                                  wordHtml += `<div class="correct">${splitsplit[1]}</div>`
                              }
                          })
                      }else{
                          if(word.stringTyped.trim() != ""){
                              wordHtml += `
                              <div class="correct pin">${word.stringTyped}</div>
                              `;
                          }
                      }
                      if(word.extraString != ""){
                          wordHtml += `<div class="extra">${word.extraString}</div>`
                      }
                      wordHtml += "</div>"
                      var wordHtmlG = htmlTemp(wordHtml)
                      colorWords.appendChild(wordHtmlG)
                      // var incorrectLetters = wordHtmlG.querySelectorAll(".incorrect");
                      // incorrectLetters.forEach(incorrectLetter => {
                      //     incorrectLetter.addEventListener("mouseenter", (e)=>{
                      //         var letter = e.target;
                      //         var hover = letter.querySelector(".hover");
                      //     })
                      // })
                      wordHtmlG.addEventListener("mouseenter", (e)=>{
                          wordHover.innerText = word.originalWord;
                          if(word.type == "erased"){
                              wordHover.innerText += " (ERASED <-)"
                          }
                          var x = ((wordHtmlG.offsetLeft + (wordHtmlG.offsetWidth / 2))) - (wordHover.offsetWidth)
                          x = ((wordHtmlG.offsetLeft + (wordHtmlG.offsetWidth / 2)));
                          var y = (wordHtmlG.offsetTop + (wordHtmlG.offsetHeight)) + 10;
                          wordHover.style.left = x + "px";
                          wordHover.style.top = y + "px";
                          wordHover.style.display = "flex";
                      })
                      wordHtmlG.addEventListener("mouseleave", ()=>{
                          wordHover.style.display = "none";
                      })
                  })
              }
            
              
  
  
    function initializeSidewayBar(typingString, typingBar, barContent, duration, carot, contentLeftSidewayBar, contentRightSidewayBar, hiddenInput, countDown, measurmentCallback){
        var focused = true;
        typingBar.style.display= "flex"
        
        
        document.addEventListener("click", (e)=>{
            var target = e.target;
            console.log(target)
            if(target.getAttribute("uid") == "content"){
            hiddenInput.focus();
            console.log("fs")
            }
            console.log("ds")
        })
        
        var typingRect = typingBar.getBoundingClientRect();
        hiddenInput.style.top = typingRect.top + "px";
        hiddenInput.style.left = typingRect.left + "px";
        
        var bodyContent = document.querySelector(".bodyContent")
        hiddenInput.addEventListener("focus", ()=>{
            focused = true;
            bodyContent.classList.add("focus");
        })
        
        hiddenInput.addEventListener("blur", ()=>{
            focused = false;
            bodyContent.classList.remove("focus");
            console.log("blurred");
        })
        hiddenInput.focus();
        console.log("fs")
        
        
        // carot.style.left = contentRightSidewayBar.offsetLeft+ "px";
        var carot;
        var stringUpdationStatus = false;
        var correctWords = 0;
        var incorrectWords = 0;
        var totalTypedWords = 0;
        var correctLetters = 0;
        var incorrectLetters = 0;
        var extraLetters = 0;
        var measuringInterval = null;
        var measurment = [];
        var wordsRespect = [];
        var currentSecond = 1;
        var intervalStarted = false;
        var totalTime = duration;
        var completeCurrent = "";
        var invisibleKeys = ["Shift", "Tab", "CapsLock", "Control", "Alt", "PageDown", "PageUp", "Delete", "Home", "End", "Backspace", "Insert", "ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", " "]
        
        var startingString = (typingString.split(" ")).slice(0, 10);
        startingString = startingString.join(" ")
        var sliceCount = 10;
        if(sliceString != 0){
            sliceCount = sliceString;
        }
        typingString = typingString.slice(sliceCount, typingString.length);
        startBar(startingString, barContent);
        
        function startBar(typingString, contentBar){
        populateBar(typingString, contentRightSidewayBar);
        carot.style.left = contentRightSidewayBar.getBoundingClientRect.left+ "px";
        // carot.style.display = "none";
        startTyping(contentBar);
        }
        
        function startTyping(contentBar){
        document.addEventListener("mousemove", e => {
            typingBar.classList.remove("focus");
            if(measuringInterval != null){
            // pause counting interval
            }
        })
        var keyFrequency = 0;
        var stringTyped = ""; // {|{|[:incorrectKey:]|}|}  Notation for incorrect key;
        var extraString = "";
        document.addEventListener("keydown", (e)=>{
            var key = e.key;
            if(key == "Backspace"){
            var leftActiveWord = contentLeftSidewayBar.querySelector(".word.active");
            var activeWord = contentRightSidewayBar.querySelector(".word.active");
            var activeLetter = activeWord.querySelector(`letter`);
            keyFrequency++;
            var leftWordLength = (leftActiveWord.querySelectorAll("letter")).length
            var activeWordLength = (activeWord.querySelectorAll("letter")).length
            var leftLastLetter = leftActiveWord.querySelector("letter:last-child");
            var doneLettersLength = (leftActiveWord.querySelectorAll(`letter`)).length
            var actualLettersLength = (activeWord.querySelectorAll(`letter:not(.extra)`)).length
            if(leftActiveWord.querySelector(".extra")){
                leftActiveWord.removeChild(leftActiveWord.querySelector("letter:last-child"));
                extraLetters--;
                extraString = extraString.substring(0, extraString.length - 1);
                //carot.style.left = (activeWord.querySelector("letter:last-child")).offsetLeft + (activeWord.querySelector("letter:last-child")).offsetWidth+ "px";
                }else{
                //  if(leftActiveWord.querySelector("letter:not(.extra)")){
                var dones = leftActiveWord.querySelector("letter:not(.extra)");
                var lastChild = leftActiveWord.querySelector("letter:last-child")
                if(lastChild.classList.contains("correct")){
                    stringTyped = stringTyped.substring(0, stringTyped.length - 1 );
                correctLetters--;
                var letterHtml = htmlTemp(`
                <letter>${(leftActiveWord.querySelector("letter:last-child")).innerText}</letter>
                `)
                    activeWord.insertBefore(letterHtml, activeLetter);
                }else if(lastChild.classList.contains("incorrect")){
                    stringTyped = stringTyped.substring(0, stringTyped.length - 16 );
                incorrectLetters--;
                }
                leftActiveWord.removeChild(lastChild);
                // if(!leftActiveWord.querySelector("letter.incorrect")){
                //   leftActiveWord.classList.remove("incorrect")
                // }
                // lastChild.classList.remove("correct");
                // lastChild.classList.remove("incorrect");
                // lastChild.classList.remove("done");
                //carot.style.left = lastChild.offsetLeft + "px"
                //carot.style.top = lastChild.offsetTop + "px";
                //  }else{
                //   var allChilds = contentBar.querySelectorAll(".word");
                //   var prevActiveWord = null;
                //   var tempPrev;
                //   allChilds.forEach(child => {
                //    if(child == activeWord){
                //     prevActiveWord = tempPrev;
                //    }else{
                //     tempPrev = child
                //    }
                //   })
                //   if(prevActiveWord != null){
                //     var erased = wordsRespect[wordsRespect.length - 1];
                //     erased.type = "erased";
                //     wordsRespect = wordsRespect.slice(0, wordsRespect.length);
                //     console.log("id",wordsRespect)
                //     lastRespect = wordsRespect[wordsRespect.length - 1];
                //     stringTyped = lastRespect.stringTyped;
                //     extraString = lastRespect.extraString;
                //     wordsRespect = wordsRespect.slice(0, wordsRespect.length - 1);
                //     wordsRespect.push(erased);
                //     console.log(wordsRespect)
                //     var untypedPrev = prevActiveWord.querySelectorAll("letter:not(.done):not(.extra)");
                //     untypedPrev.forEach(letter => {
                //       stringTyped = stringTyped.substring(0, stringTyped.length - 13)
                //     })
                //    activeWord.classList.remove("active");
                //    prevActiveWord.classList.add("active");
                //    if(prevActiveWord.querySelector(".extra")){
                //     //carot.style.left = prevActiveWord.offsetLeft + prevActiveWord.offsetWidth + "px";
                //    }else{
                //     var doneChilds = prevActiveWord.childNodes;
                //     var lastDoneLetters = prevActiveWord.querySelectorAll("letter.done");
                //     var lastDoneLetter = null;
                //     if(lastDoneLetters.length != 0){
                //      lastDoneLetter = lastDoneLetters[lastDoneLetters.length - 1]
                //     }
                //     if(lastDoneLetter == null){
                //      lastDoneLetter = prevActiveWord.querySelector("letter")
                //      //carot.style.left = lastDoneLetter.offsetLeft+ "px";
                //     }else{
                //      //carot.style.left = lastDoneLetter.offsetLeft + lastDoneLetter.offsetWidth+ "px";
                //     }
                //    }
                //    //carot.style.top = prevActiveWord.offsetTop + "px";
                //    if(prevActiveWord.classList.contains('error')){
                //     prevActiveWord.classList.remove('error');
                //     incorrectWords--;
                //    }else{
                //     correctWords--;
                //    }
                //   }
                //  }
                }
                if(!leftActiveWord.querySelector("letter.incorrect") && 
                !leftActiveWord.querySelector("letter.extra")){
                leftActiveWord.classList.remove("incorrect")
                }
                if(totalTypedWords != 0){
                totalTypedWords--;
                }
            }
        })
        hiddenInput.addEventListener("input", (e)=>{
            var key = e.data;
            hiddenInput.value = "";
            typingBar.classList.add("focus");
            if(!intervalStarted){
            intervalStarted = true;
            if(sliceString == 0){
            updateStartedTestsCount(userId);
                measuringInterval = setInterval(() => {
                if(focused == true){
                // computation
                var computedRaw = 0;
                var nonComputedRaw = ((keyFrequency) / 5) / (1 / 60);
                var computedWpm = ((correctLetters - incorrectLetters) / 5) / (currentSecond / 60) > 0 ? ((correctLetters - incorrectLetters) / 5) / (currentSecond / 60) : 0;;
                var nonComputedWpm = ((correctLetters - incorrectLetters) / 5) / (currentSecond / 60) > 0 ? ((correctLetters - incorrectLetters) / 5) / (currentSecond / 60) : 0;
                var testcomp;
                if(measurment.length != 0 ){
                    var lastMeasurment = measurment[measurment.length - 1]
                    testcomp = (((correctLetters - lastMeasurment.correctLetters)  - (incorrectLetters - lastMeasurment.incorrectLetters)) / 5) / (1 / 60);
                }else{
                    testcomp = ((correctLetters  - incorrectLetters) / 5) / (1 / 60);
                }
                var nonComputedIndividualWpm = testcomp > 0 ? testcomp : 0;
                computedWpm = nonComputedIndividualWpm;
                if(currentSecond == 1){
                    computedRaw = ((keyFrequency) / 5) / (1 / 60);
                    computedWpm = computedWpm;
                }else if(currentSecond == 2){
                    var presentRaw = ((keyFrequency) / 5) / (1 / 60);
                    var lastSecondRaw = measurment[measurment.length - 1].raw;
                    computedRaw = ( presentRaw + lastSecondRaw ) / 2;
            
                    var presentWpm = computedWpm;
                    var lastSecondWpm = measurment[measurment.length - 1].wpm;
                    computedWpm = ( presentWpm + lastSecondWpm ) / 2;
                }else{
                    var presentRaw = ((keyFrequency) / 5) / (1 / 60);
                    var lastSecondRaw = measurment[measurment.length - 1].raw;
                    computedRaw = ( lastSecondRaw + presentRaw ) / 2;
                    measurment[measurment.length - 1].raw = computedRaw
            
                    var presentWpm = computedWpm;
                    var lastSecondWpm = measurment[measurment.length - 1].wpm;
                    computedWpm = ( lastSecondWpm + presentWpm ) / 2;
                    measurment[measurment.length - 1].wpm = computedWpm
                }
                //computation ends
            
                if(currentSecond < totalTime){
                if(measurment.length == 0){
                    measurment.push({
                    correctLetters: correctLetters,
                    incorrectLetters: incorrectLetters,
                    extrasLetters: extraLetters,
                    correctWords: correctWords,
                    totalTypedWords: totalTypedWords,
                    incorrectWords: incorrectWords,
                    wpm: nonComputedWpm,
                    raw: nonComputedRaw
                    
                    })
                }else{
                    measurment.push({
                    correctLetters: correctLetters,
                    incorrectLetters: incorrectLetters,
                    extrasLetters: extraLetters,
                    correctWords: correctWords,
                    totalTypedWords: totalTypedWords,
                    incorrectWords: incorrectWords,
                    wpm: nonComputedWpm,
                    raw: nonComputedRaw
                    
                    })
                }
                currentSecond++;
                var min = (totalTime - currentSecond) / 60;
                var sec = (totalTime - currentSecond) % 60;
                sec = sec > 59 ? 0 : sec;
                if(sec <= 9){
                    sec = `0${sec}`;
                }
                sec = `${sec}`
                countDown.querySelector("#sec").innerText = sec;
                min = Math.trunc(min, 0);
                if(min <= 9){
                    min = `0${min}`
                }
                countDown.querySelector("#min").innerText = min;
                }else{
                clearInterval(measuringInterval);
                updateEndedTestsCount(userId);
                if(activeWord.querySelector('.done')){
                    if(activeWord.querySelector(".incorrect") || activeWord.querySelector(".extra")){
                    incorrectWords++;
                    }else{
                    correctWords++;
                    }
                    totalTypedWords++;
                    measurment.push({
                    correctLetters: correctLetters,
                    incorrectLetters: incorrectLetters,
                    extrasLetters: extraLetters,
                    correctWords: correctWords,
                    totalTypedWords: totalTypedWords,
                    incorrectWords: incorrectWords,
                    wpm: nonComputedWpm,
                    raw: nonComputedRaw
                    
                    })
                }else{
                    measurment.push({
                    correctLetters: correctLetters,
                    incorrectLetters: incorrectLetters,
                    extrasLetters: extraLetters,
                    correctWords: correctWords,
                    totalTypedWords: totalTypedWords,
                    incorrectWords: incorrectWords,
                    wpm: nonComputedWpm,
                    raw: nonComputedRaw
                    
                    })
                }
                console.log(totalTime)
                measurmentCallback(measurment, totalTime, wordsRespect);
                console.log("Results ===================>");
                console.group("Result:")
                console.log(measurment);
                console.log(wordsRespect)
                }
                keyFrequency = 0;
                updateSeconds(userId);
                }
                }, 1000);
            }
            }
            var leftActiveWord = contentLeftSidewayBar.querySelector(".word.active");
            var activeWord = contentRightSidewayBar.querySelector(".word.active");
            var activeLetter = activeWord.querySelector(`letter`);
            if(!invisibleKeys.includes(key)){
            keyFrequency++;
            var leftWordLength = (leftActiveWord.querySelectorAll("letter")).length
            var activeWordLength = (activeWord.querySelectorAll("letter")).length
            var leftLastLetter = leftActiveWord.querySelector("letter:last-child");
            var doneLettersLength = (leftActiveWord.querySelectorAll(`letter`)).length
            var actualLettersLength = (activeWord.querySelectorAll(`letter:not(.extra)`)).length
        
            if(leftWordLength != 0){
            if(activeWordLength != 0){
                if(!leftLastLetter.classList.contains("incorrect") && key == activeLetter.innerText){
                var correctLetter = htmlTemp(`
                <letter class="correct">${key}</letter>
                `);
                leftActiveWord.appendChild(correctLetter);
                activeWord.removeChild(activeLetter);
                leftActiveWord.classList.remove("incorrect")
                correctLetters++;
                stringTyped += key;
                }else{
                var incorrectLetter = htmlTemp(`
                <letter class="incorrect">${key}</letter>
                `);
                leftActiveWord.appendChild(incorrectLetter);
                leftActiveWord.classList.add("incorrect")
                incorrectLetters++;
                stringTyped += `{|{|[:${activeLetter.innerText}&&${key}:]|}|}`
                }
            }else{
                var extraLetter = htmlTemp(`
                <letter class="extra">${key}</letter>
                `);
                leftActiveWord.appendChild(extraLetter);
                leftActiveWord.classList.add("incorrect")
                extraLetters++;
                extraString += key;
            }
            }else{
            if(key == activeLetter.innerText){
                var correctLetter = htmlTemp(`
                <letter class="correct">${key}</letter>
                `);
                leftActiveWord.appendChild(correctLetter);
                activeWord.removeChild(activeLetter);
                leftActiveWord.classList.remove("incorrect")
                correctLetters++;
                stringTyped += key;
            }else{
                var incorrectLetter = htmlTemp(`
                <letter class="incorrect">${key}</letter>
                `);
                leftActiveWord.appendChild(incorrectLetter);
                leftActiveWord.classList.add("incorrect");
                incorrectLetters++;
                stringTyped += `{|{|[:${activeLetter.innerText}&&${key}:]|}|}`
            }
            }
        
            //  if(doneLettersLength == actualLettersLength){
            //   if( ((activeWord.querySelectorAll(".extra")).length <= 4)){
            //    var extraDom = htmlTemp(`
            //    <letter class="incorrect extra">${key}</letter>
            //    `)
            //    activeWord.appendChild(extraDom);
            //    //carot.style.left = (parseInt(extraDom.offsetLeft) + parseInt(extraDom.offsetWidth))+"px";
            //    //carot.style.top = extraDom.offsetTop+"px";
            //    extraLetters++;
            //    extraString += key;
            //   }
            //  }else{
                
            //    var letterDom = htmlTemp(`
            //    <letter>${key}</letter>
            //    `)
            //    var typedLetter = activeWord.querySelector("letter");
            //    activeWord.removeChild(typedLetter);
            //    leftActiveWord.appendChild(letterDom);
            //   if(activeLetter.innerText == key){
            //    letterDom.classList.add("correct")
            //    correctLetters++;
            //    stringTyped += key;
            //   }else{
            //     letterDom.classList.add("incorrect")
            //    incorrectLetters++;
            //    stringTyped += `{|{|[:${activeLetter.innerText}&&${key}:]|}|}`
            //   }
            //   activeLetter.classList.add("done");
            //   //carot.style.animationDuration = "0.1s";
            //   //carot.style.left = (parseInt(activeLetter.offsetLeft) + parseInt(activeLetter.offsetWidth))+"px";
            //   //carot.style.top = activeLetter.offsetTop+"px";
            //   //carot.style.animationDuration = "1s";
            //  }
            }else{
            if(key == " " && (leftActiveWord.querySelectorAll("letter")).length != 0){
            totalTypedWords++;
            var activeWordLengthTo = (activeWord.querySelectorAll("letter")).length
            moveToNextWord(contentBar, activeWord, leftActiveWord, activeWordLengthTo);
            if(leftActiveWord.classList.contains("incorrect") || activeWordLength != 0 ){
                incorrectWords++;
                var unTyped = activeWord.querySelectorAll("letter");
                unTyped.forEach(letter => {
                stringTyped += `{|{|[;${letter.innerText};]|}|}`
                })
            }else {
                correctWords++;
            }
        
            wordsRespect.push({
                stringTyped: stringTyped,
                extraString: extraString,
                originalWord: completeCurrent,
                type: "original"
            })
            completeCurrent = getWord(contentRightSidewayBar.querySelector(".word.active"))
            stringTyped = "";
            extraString = "";
            }else if(key == "Backspace"){
            
            }
            }
        })
        }
        
        function moveToNextWord(contentBar, activeWord, leftActiveWord, activeWordLength){
            var lettersActiveWord = leftActiveWord.querySelectorAll("letter");
            var transferWord = htmlTemp(`<div class="word"></div>`);
            if(leftActiveWord.classList.contains("incorrect") || activeWordLength != 0){
            transferWord = htmlTemp(`<div class="word incorrect"></div>`);
            }
            lettersActiveWord.forEach(letter => {
            transferWord.appendChild(htmlTemp(letter.outerHTML));
            })
            contentLeftSidewayBar.insertBefore(transferWord, leftActiveWord);
            leftActiveWord.innerHTML = "";
            leftActiveWord.classList.remove("incorrect");
            var untypedIncorrect = activeWord.querySelectorAll("letter");
            contentRightSidewayBar.removeChild(activeWord)
            var nextActiveWord = contentRightSidewayBar.querySelector(".word");
            nextActiveWord.classList.add("active")
            activeWord = nextActiveWord;
            console.log(typingString)
            typingString = typingString.split(" ");
                var newWord = typingString[0];
            typingString = typingString.slice(1, typingString.length);
            typingString =  typingString.join(" ");
            if(sliceString == 0){
            addWord(contentRightSidewayBar, newWord);
            }
        
        }
        
        function addCarot(contentBar){
        carot = htmlTemp(`
            <div id="carot"></div>
        `)
        var sampleWord = contentBar.querySelector(".word");
        contentBar.appendChild(carot);
        sampleWord.classList.add("active");
        }
        
        function populateBar(typingString, contentRightSidewayBar){
        var typingWords = typingString.split(" ");
        typingWords.forEach(word => {
            addWord(contentRightSidewayBar, word);
        })
        contentRightSidewayBar.querySelector(".word").classList.add("active")
        completeCurrent = getWord(contentRightSidewayBar.querySelector(".word"))
        }
        
    function addWord(contentRightSidewayBar, word){
        var wordDom = htmlTemp(`
        <div class="word">
        </div>
        `)
            contentRightSidewayBar.appendChild(wordDom);
        var typingLetters = word.split("");
        typingLetters.forEach(letter => {
            var letterDom = htmlTemp(`
            <letter>${letter}</letter>
            `)
            wordDom.appendChild(letterDom);
        })
        }
        
        }

    function initializeMonkeyBar(typingString, typingBar, barContent, duration, hiddenInput, countDown, measurmentCallback){
      var focused = true;
      typingBar.style.display= "flex"
    
      document.addEventListener("click", (e)=>{
        var target = e.target;
        if(target == typingBar){
          hiddenInput.focus();
        }
      })
    
      var typingRect = typingBar.getBoundingClientRect();
      hiddenInput.style.top = typingRect.top + "px";
      hiddenInput.style.left = typingRect.left + "px";
      var bodyContent = document.querySelector(".bodyContent")
    
      hiddenInput.addEventListener("focus", ()=>{
        focused = true;
        bodyContent.classList.add("focus")
      })
      
      hiddenInput.addEventListener("blur", ()=>{
        focused = false;
        bodyContent.classList.remove("focus")
        console.log("blurred")
      })
      hiddenInput.focus();
    
    
      var carot;
      var stringUpdationStatus = false;
      var correctWords = 0;
      var incorrectWords = 0;
      var totalTypedWords = 0;
      var correctLetters = 0;
      var incorrectLetters = 0;
      var extraLetters = 0;
      var measuringInterval = null;
      var measurment = [];
      var wordsRespect = [];
      var currentSecond = 1;
      var intervalStarted = false;
      var totalTime = duration;
      var invisibleKeys = ["Shift", "Tab", "CapsLock", "Control", "Alt", "PageDown", "PageUp", "Delete", "Home", "End", "Backspace", "Insert", "ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", " "]
    
      var sliceCount = 100;
      if(sliceString != 0){
        sliceCount = sliceString;
      }
      var startingString = (typingString.split(" ")).slice(0, sliceCount);
      if(typingString.split(" ").length <= sliceCount){
      startingString = typingString.split(" ")
      }
      startingString = startingString.join(" ")
      typingString = typingString.slice(sliceCount, typingString.length);
      startBar(startingString, barContent);
    
      function startBar(typingString, contentBar){
      populateBar(typingString, contentBar);
      addCarot(contentBar);
      startTyping(contentBar);
      }
    
      function startTyping(contentBar){
      document.addEventListener("mousemove", e => {
        typingBar.classList.remove("focus");
        if(measuringInterval != null){
        // pause counting interval
        }
      })
      var keyFrequency = 0;
      var stringTyped = ""; // {|{|[:incorrectKey:]|}|}  Notation for incorrect key;
      var extraString = "";
      document.addEventListener("keydown", (e)=>{
        var key = e.key;
        if(e.key == "Backspace"){
          var activeWord = contentBar.querySelector(".word.active");
        var activeLetter = activeWord.querySelector(`letter:not(.done)`);
        var lastLetter = activeWord.querySelector(`letter:last-child`)
          keyFrequency++;
          var doneLettersLength = (activeWord.querySelectorAll(`letter.done`)).length
          var actualLettersLength = (activeWord.querySelectorAll(`letter:not(.extra)`)).length
        if(activeWord.querySelector(".extra")){
          activeWord.removeChild(activeWord.querySelector("letter:last-child"));
          extraLetters--;
          extraString = extraString.substring(0, extraString.length - 1);
          carot.style.left = (activeWord.querySelector("letter:last-child")).offsetLeft + (activeWord.querySelector("letter:last-child")).offsetWidth+ "px";
          }else{
          if(activeWord.querySelector("letter.done")){
            var dones = activeWord.querySelectorAll(".done");
            var lastChild = dones[dones.length - 1]
            if(lastChild.classList.contains("correct")){
              stringTyped = stringTyped.substring(0, stringTyped.length - 1 );
            correctLetters--;
            }else if(lastChild.classList.contains("incorrect")){
              stringTyped = stringTyped.substring(0, stringTyped.length - 16 );
            incorrectLetters--;
            }
            lastChild.classList.remove("correct");
            lastChild.classList.remove("incorrect");
            lastChild.classList.remove("done");
            carot.style.left = lastChild.offsetLeft + "px"
            carot.style.top = lastChild.offsetTop + "px";
          }else{
            var allChilds = contentBar.querySelectorAll(".word");
            var prevActiveWord = null;
            var tempPrev;
            allChilds.forEach(child => {
            if(child == activeWord){
              prevActiveWord = tempPrev;
            }else{
              tempPrev = child
            }
            })
            if(prevActiveWord != null){
              var erased = wordsRespect[wordsRespect.length - 1];
              erased.type = "erased";
              wordsRespect = wordsRespect.slice(0, wordsRespect.length);
              console.log("id",wordsRespect)
              lastRespect = wordsRespect[wordsRespect.length - 1];
              stringTyped = lastRespect.stringTyped;
              extraString = lastRespect.extraString;
              wordsRespect = wordsRespect.slice(0, wordsRespect.length - 1);
              wordsRespect.push(erased);
              console.log(wordsRespect)
              var untypedPrev = prevActiveWord.querySelectorAll("letter:not(.done):not(.extra)");
              untypedPrev.forEach(letter => {
                stringTyped = stringTyped.substring(0, stringTyped.length - 13)
              })
            activeWord.classList.remove("active");
            prevActiveWord.classList.add("active");
            if(prevActiveWord.querySelector(".extra")){
              carot.style.left = prevActiveWord.offsetLeft + prevActiveWord.offsetWidth + "px";
            }else{
              var doneChilds = prevActiveWord.childNodes;
              var lastDoneLetters = prevActiveWord.querySelectorAll("letter.done");
              var lastDoneLetter = null;
              if(lastDoneLetters.length != 0){
              lastDoneLetter = lastDoneLetters[lastDoneLetters.length - 1]
              }
              if(lastDoneLetter == null){
              lastDoneLetter = prevActiveWord.querySelector("letter")
              carot.style.left = lastDoneLetter.offsetLeft+ "px";
              }else{
              carot.style.left = lastDoneLetter.offsetLeft + lastDoneLetter.offsetWidth+ "px";
              }
            }
            carot.style.top = prevActiveWord.offsetTop + "px";
            if(prevActiveWord.classList.contains('error')){
              prevActiveWord.classList.remove('error');
              incorrectWords--;
            }else{
              correctWords--;
            }
            }
          }
          }
          if(totalTypedWords != 0){
          totalTypedWords--;
          }
        }
      })
      hiddenInput.addEventListener("input", (e)=>{
        var key = e.data;
        hiddenInput.value = "";
        typingBar.classList.add("focus");
        if(!intervalStarted){
        intervalStarted = true;
        if(sliceString == 0){
        updateStartedTestsCount(userId);
            measuringInterval = setInterval(() => {
            if(focused == true){
            // computation
            var computedRaw = 0;
            var nonComputedRaw = ((keyFrequency) / 5) / (1 / 60);
            var computedWpm = ((correctLetters - incorrectLetters) / 5) / (currentSecond / 60) > 0 ? ((correctLetters - incorrectLetters) / 5) / (currentSecond / 60) : 0;;
            var nonComputedWpm = ((correctLetters - incorrectLetters) / 5) / (currentSecond / 60) > 0 ? ((correctLetters - incorrectLetters) / 5) / (currentSecond / 60) : 0;
            var testcomp;
            if(measurment.length != 0 ){
                var lastMeasurment = measurment[measurment.length - 1]
                testcomp = (((correctLetters - lastMeasurment.correctLetters)  - (incorrectLetters - lastMeasurment.incorrectLetters)) / 5) / (1 / 60);
            }else{
                testcomp = ((correctLetters  - incorrectLetters) / 5) / (1 / 60);
            }
            var nonComputedIndividualWpm = testcomp > 0 ? testcomp : 0;
            computedWpm = nonComputedIndividualWpm;
            if(currentSecond == 1){
                computedRaw = ((keyFrequency) / 5) / (1 / 60);
                computedWpm = computedWpm;
            }else if(currentSecond == 2){
                var presentRaw = ((keyFrequency) / 5) / (1 / 60);
                var lastSecondRaw = measurment[measurment.length - 1].raw;
                computedRaw = ( presentRaw + lastSecondRaw ) / 2;
        
                var presentWpm = computedWpm;
                var lastSecondWpm = measurment[measurment.length - 1].wpm;
                computedWpm = ( presentWpm + lastSecondWpm ) / 2;
            }else{
                var presentRaw = ((keyFrequency) / 5) / (1 / 60);
                var lastSecondRaw = measurment[measurment.length - 1].raw;
                computedRaw = ( lastSecondRaw + presentRaw ) / 2;
                measurment[measurment.length - 1].raw = computedRaw
        
                var presentWpm = computedWpm;
                var lastSecondWpm = measurment[measurment.length - 1].wpm;
                computedWpm = ( lastSecondWpm + presentWpm ) / 2;
                measurment[measurment.length - 1].wpm = computedWpm
            }
            //computation ends
        
            if(currentSecond < totalTime){
            if(measurment.length == 0){
                measurment.push({
                correctLetters: correctLetters,
                incorrectLetters: incorrectLetters,
                extrasLetters: extraLetters,
                correctWords: correctWords,
                totalTypedWords: totalTypedWords,
                incorrectWords: incorrectWords,
                wpm: nonComputedWpm,
                raw: nonComputedRaw
                
                })
            }else{
                measurment.push({
                correctLetters: correctLetters,
                incorrectLetters: incorrectLetters,
                extrasLetters: extraLetters,
                correctWords: correctWords,
                totalTypedWords: totalTypedWords,
                incorrectWords: incorrectWords,
                wpm: nonComputedWpm,
                raw: nonComputedRaw
                
                })
            }
            currentSecond++;
            console.log(currentSecond +"--"+totalTime)
            var min = (totalTime - currentSecond) / 60;
            var sec = (totalTime - currentSecond) % 60;
            sec = sec > 59 ? 0 : sec;
            if(sec <= 9){
                sec = `0${sec}`;
            }
            sec = `${sec}`
            countDown.querySelector("#sec").innerText = sec;
            min = Math.trunc(min, 0);
            if(min <= 9){
                min = `0${min}`
            }
            countDown.querySelector("#min").innerText = min;
            }else{
            clearInterval(measuringInterval);
            updateEndedTestsCount(userId);
            if(activeWord.querySelector('.done')){
                if(activeWord.querySelector(".incorrect") || activeWord.querySelector(".extra")){
                incorrectWords++;
                }else{
                correctWords++;
                }
                totalTypedWords++;
                measurment.push({
                correctLetters: correctLetters,
                incorrectLetters: incorrectLetters,
                extrasLetters: extraLetters,
                correctWords: correctWords,
                totalTypedWords: totalTypedWords,
                incorrectWords: incorrectWords,
                wpm: nonComputedWpm,
                raw: nonComputedRaw
                
                })
            }else{
                measurment.push({
                correctLetters: correctLetters,
                incorrectLetters: incorrectLetters,
                extrasLetters: extraLetters,
                correctWords: correctWords,
                totalTypedWords: totalTypedWords,
                incorrectWords: incorrectWords,
                wpm: nonComputedWpm,
                raw: nonComputedRaw
                
                })
            }
            console.log(totalTime)
            measurmentCallback(measurment, totalTime, wordsRespect);
            console.log("Results ===================>");
            console.group("Result:")
            console.log(measurment);
            console.log(wordsRespect)
            }
            keyFrequency = 0;
            updateSeconds(userId);
            }
        
        
            }, 1000);
        }
        }
        var activeWord = contentBar.querySelector(".word.active");
        var activeLetter = activeWord.querySelector(`letter:not(.done)`);
        var lastLetter = activeWord.querySelector(`letter:last-child`)
        if(!invisibleKeys.includes(key)){
          keyFrequency++;
          var doneLettersLength = (activeWord.querySelectorAll(`letter.done`)).length
          var actualLettersLength = (activeWord.querySelectorAll(`letter:not(.extra)`)).length
          if(doneLettersLength == actualLettersLength){
          if( ((activeWord.querySelectorAll(".extra")).length <= 4)){
            var extraDom = htmlTemp(`
            <letter class="incorrect extra">${key}</letter>
            `)
            activeWord.appendChild(extraDom);
            carot.style.left = (parseInt(extraDom.offsetLeft) + parseInt(extraDom.offsetWidth))+"px";
            carot.style.top = extraDom.offsetTop+"px";
            extraLetters++;
            extraString += key;
          }
          }else{
          if(activeLetter.innerText == key){
            activeLetter.classList.add("correct")
            correctLetters++;
            stringTyped += key;
          }else{
            activeLetter.classList.add("incorrect")
            incorrectLetters++;
            stringTyped += `{|{|[:${activeLetter.innerText}&&${key}:]|}|}`
          }
          activeLetter.classList.add("done");
          carot.style.animationDuration = "0.1s";
          carot.style.left = (parseInt(activeLetter.offsetLeft) + parseInt(activeLetter.offsetWidth))+"px";
          carot.style.top = activeLetter.offsetTop+"px";
          carot.style.animationDuration = "1s";
          }
        }else{
          if(key == " "){
          totalTypedWords++;
          moveToNextWord(contentBar, activeWord);
          if(activeWord.classList.contains("error")){
            incorrectWords++;
            var unTyped = activeWord.querySelectorAll("letter:not(.done):not(.extra)");
            unTyped.forEach(letter => {
              stringTyped += `{|{|[;${letter.innerText};]|}|}`
            })
          }else {
            correctWords++;
          }
    
          wordsRespect.push({
            stringTyped: stringTyped,
            extraString: extraString,
            originalWord: getWord(activeWord),
            type: "original"
          })
          stringTyped = "";
          extraString = "";
        //  scrollTo(0, 0);
          }else if(key == "Backspace"){
          
          }
        }
        // }
      })
      }
    
      function moveToNextWord(contentBar, activeWord){
      var nextActiveWord = contentBar.querySelector(".word.active + .word");
      var lettersActiveWord = activeWord.querySelectorAll("letter");
      for(let i = 0; i < lettersActiveWord.length; i++){
        if(!lettersActiveWord[i].classList.contains('correct')){
        activeWord.classList.add("error");
        break;
        }
      }
      activeWord.classList.remove("active")
      var untypedIncorrect = activeWord.querySelectorAll("letter:not(.done):not(.extra)");
      incorrectLetters += untypedIncorrect.length;
      nextActiveWord.classList.add("active")
      if(( nextActiveWord.getBoundingClientRect().top - contentBar.getBoundingClientRect().top ) > 50){
        var allWords = contentBar.querySelectorAll(".word");
        var removeWords = [];
        allWords.forEach(word => {
        if(( word.getBoundingClientRect().top - contentBar.getBoundingClientRect().top ) < 10){
          removeWords.push(word);
        }
        })
        removeWords.forEach(word => {
        contentBar.removeChild(word)
        })
        stringUpdationStatus = true;
      }
      carot.style.animationDuration = "0s";
      carot.style.top = nextActiveWord.offsetTop+"px";
      carot.style.left = nextActiveWord.offsetLeft +  "px";
      carot.style.animationDuration = "1s"; 
    
      if(stringUpdationStatus){
        var newWord = typingString[0];
        typingString = typingString.slice(1, typingString.length);
        if(sliceString == 0){
        addWord(contentBar, newWord);
        }
      }
    
      }
    
      function addCarot(contentBar){
      carot = htmlTemp(`
        <div id="carot"></div>
      `)
      var sampleWord = contentBar.querySelector(".word");
      carot.style.height = sampleWord.offsetHeight+"px";
      carot.style.width = "3px";
      carot.style.backgroundColor = "orange";
      carot.style.position = "absolute";
      carot.style.marginTop = "5px";
      contentBar.appendChild(carot);
      sampleWord.classList.add("active");
      }
    
      function populateBar(typingString, contentBar){
      var typingWords = typingString.split(" ");
      typingWords.forEach(word => {
        addWord(contentBar, word);
      })
      }
    
      function addWord(content, word){
      var wordDom = htmlTemp(`
      <div class="word">
      </div>
      `)
      if(content.querySelector("#carot")){
        content.insertBefore(wordDom,content.querySelector("#carot"));
      }else{
        content.appendChild(wordDom);
      }
      var typingLetters = word.split("");
      typingLetters.forEach(letter => {
        var letterDom = htmlTemp(`
        <letter>${letter}</letter>
        `)
        wordDom.appendChild(letterDom);
      })
      }
    }
                      
    function getWord(word){
    var gen = "";
    var letters = word.querySelectorAll("letter");
    letters.forEach(letter => {
        if(letter.classList.contains("done")){
        gen += letter.innerText;
        }else if(!letter.classList.contains("extra")){
        gen += letter.innerText;
        }
    })
    return gen;
    }

        var measuringInterval;
        var monkeyInterval = true;
        var chatInterval = true;

        var countDown = document.querySelector("#countDown");
        const monkeyTypingBar = document.querySelector("[uid=typingBar]");
        const monkeyBarContent = monkeyTypingBar.querySelector("[uid=content]");
        const monkeyResultCanvas = document.querySelector("#monkeyResultGraph canvas#resultCanvas");

        const hiddenInput = document.getElementById("hiddenInput")

        const typingBar = document.getElementById("sidewayTypingBar");
        const barContent = typingBar.querySelector("[uid=content]");

        const colorWords = document.querySelector("#colorWordsWrapper #colorWords")
        const sidewayCarot = document.querySelector("#sidewayTypingBar [uid=content] #sidewayCarrot");
        const contentLeftSidewayBar = document.querySelector("#sidewayTypingBar [uid=content] .contentLeft");
        const contentRightSidewayBar = document.querySelector("#sidewayTypingBar [uid=content] .contentRight");

        const menuItems = document.querySelectorAll(".typingMenu .menuItem ul li");

        var typingString;
        
        if(typingSource == "generate"){
            if(updatedString == ""){
                if(typingContent == "word"){
                    typingString = resetTypingString(true, false, false);
                    if(updateString){
                        updateString(typingString);
                    }
                }else if(typingContent == "punctuation"){
                    typingString = resetTypingString(true, true, false);
                    if(updateString){
                        updateString(typingString);
                    }
                }else if(typingContent == "key"){
                    typingString = resetTypingString(true, true, true);
                    if(updateString){
                        updateString(typingString);
                    }
                } 
            }else{
                typingString = updatedString;
            }
        }else if(typingSource == "custom"){
            console.log("Current source is custom!");
        }

        if(bar == "monkey"){
            initializeMonkeyBar(typingString, monkeyTypingBar, monkeyBarContent, time, hiddenInput, countDown, (measurments, duration, words)=>{
                var corrects = 0;
                var incorrects = 0;
                var wpms = 0;
                var raws = 0;
                var count = measurments.length;
                measurments.forEach(measurment => {
                    corrects += measurment.correctLetters;
                    incorrects += measurment.incorrectLetters;
                    wpms += measurment.wpm;
                    raws += measurment.raw;
                })
                var averageWpm = Math.trunc(wpms / count, 1);
                var averageRaw = Math.trunc(raws / count, 1);
                var accuracy = Math.trunc((corrects / (corrects + incorrects) ) * 100, 1);
                if(saveTest){
                plotResult(measurments, duration, words, averageWpm, averageRaw, accuracy);
                    saveTestInfo(measurments, words, bar, time, typingContent, typingSource, averageWpm, averageRaw, accuracy);
                }
            })
        }
        else if(bar == "chat"){

            initializeSidewayBar(typingString, typingBar, barContent,   time, sidewayCarot, contentLeftSidewayBar, contentRightSidewayBar, hiddenInput, countDown, (measurments, duration, words)=>{
                var corrects = 0;
                var incorrects = 0;
                var wpms = 0;
                var raws = 0;
                var count = measurments.length;
                measurments.forEach(measurment => {
                    corrects += measurment.correctLetters;
                    incorrects += measurment.incorrectLetters;
                    wpms += measurment.wpm;
                    raws += measurment.raw;
                })
                var averageWpm = Math.trunc(wpms / count, 1);
                var averageRaw = Math.trunc(raws / count, 1);
                var accuracy = Math.trunc((corrects / (corrects + incorrects) ) * 100, 1);
                if(saveTest){
                    saveTestInfo(measurments, words, bar, time, typingContent, typingSource, averageWpm, averageRaw, accuracy);
                    plotResult(measurments, duration, words, averageWpm, averageRaw, accuracy);
                }
            });
        }
        function plotResult(measurments, duration, words, averageWpm, averageRaw, accuracy){
            var resultDivOuter = htmlTemp(`<div id="resultDivOutter"></div>`);
            var resultDiv = htmlTemp(`<div id="resultDiv">
            </div>`)
            resultDivOuter.appendChild(resultDiv);
        var wpms = [];
        var raws = [];
        var errorLetters = [];
        let i = 0;
        measurments.forEach(m => {
        console.log(m)
        if(i == 0)
            errorLetters.push(m.incorrectLetters);
        else{
            var dcs = (m.incorrectLetters - measurments[i - 1].incorrectLetters);
            console.log(dcs + ": error")
            errorLetters.push( dcs > 0 ? dcs : 0);
        }
        i++;
        if(m.raw > 10){
        wpms.push(Math.round(m.wpm));
        raws.push(Math.round(m.raw));
        }else{
        wpms.push(0)
        raws.push(0)
        }
        })
        console.log("raws")
        console.log(raws)
        var largestValue = getMaxPlotValue(wpms, raws);
        console.log("larget value: "+largestValue)
        largestValue = Math.round(largestValue);
        var aggregate = ((Math.round(largestValue / 50) * 50) / 50) * 10;
        if(aggregate == 0){
        aggregate = 10;
        }
        console.log('aggreaget')
        console.log(aggregate)
        if(largestValue >= 100 && largestValue <= 150){
        aggregate = 30;
        }else if(largestValue >= 50 && largestValue < 100){
        aggregate = 20;
        }
        var roundedLargest = (Math.round(largestValue / aggregate) * aggregate);

        var createdCanvas = htmlTemp(`
        <canvas class="createdCanvas"></canvas>
        `)
        
        resultDiv.appendChild(createdCanvas);
        var infoDiv = htmlTemp(`
            <div class="testInfo">
                <div class="info">
                <div class="value">${averageWpm}WPM</div>
                <div class="tag">SPEED</div>
                </div>
                <div class="info">
                <div class="value">${averageRaw}WPM</div>
                <div class="tag">RAW SPEED</div>
                </div>
                <div class="info">
                <div class="value">${accuracy}%</div>
                <div class="tag">ACCURACY</div>
                </div>
            </div>
        `)
        resultDiv.appendChild(infoDiv);
        var createdWordsDiv = htmlTemp(`
        <div id="colorWordsWrapper">
                <div id="colorIndicator">
                <div class="typeBox correct">
                <div class="type">Correct: </div>
                <div class="typeColor">word</div>
                </div>
                <div class="typeBox incorrect">
                <div class="type">Incorrect: </div>
                <div class="typeColor">word</div>
                </div>
                <div class="typeBox extra">
                <div class="type">Extra: </div>
                <div class="typeColor">word</div>
                </div>
                <div class="typeBox missed">
                <div class="type">Missed: </div>
                <div class="typeColor">word</div>
                </div>
                </div>
                <div id="colorWords"></div>
                <div class="control-btns">
                    <div class="control-btn new" title="New Test">
                        <ion-icon name="newspaper-outline"></ion-icon>
                    </div>
                </div>
            </div>
        `);
        resultDiv.appendChild(createdWordsDiv);
        document.body.appendChild(resultDivOuter);
        setResultCanvas(createdCanvas);
        initGraph(duration, createdCanvas,  roundedLargest /aggregate, wpms, raws, errorLetters, 50, 50, 30, 15, roundedLargest, aggregate);

        var wordsColor = createdWordsDiv.querySelector("#colorWords")
        initWords(words, wordsColor);
        console.log("words",words);

        resultDivOuter.querySelector(".control-btn.new").addEventListener("click", (e) => {
          alert("sldf")
            window.location.reload();
        })

        }

        async function saveTestInfo(measurments, words, bar, time, typingContent, typingSource, averageWpm, averageRaw, accuracy){
            await fetchApi("/typing/saveTestInfo", "POST", {userid: userId, measurments, words, bar, time, typingContent, typingSource, averageWpm, averageRaw, accuracy}, (success, res)=>{
              if(!success){
                alert(res);
              }
            })
        }

      }
    }
  }, []); 
  return (
    <div className="bodyContent focus" type="practice">
        {sliceString == 0 &&
            <div id="countDown">
                <span id="min">00</span>:
                <span id="sec">00</span>
            </div>
        }
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
    {keyboard && 
      <Keyboard />
    }
      <input id="hiddenInput" type="text" style={{marginLeft: "200px", position: "absolute", opacity: 0, pointerEvents: "none", width: 0, height: 0}} />
    </div>
  )
}

export default Bars