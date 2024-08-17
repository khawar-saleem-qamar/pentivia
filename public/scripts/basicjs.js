function htmlTemp(string) {
var template = document.createElement("template");
template.innerHTML = string.trim();
return template.content.firstElementChild;
}

// document.addEventListener("keydown", (e)=>{
//  e.preventDefault();
// })

function sendRequestWithCallback(names,  values , type, path, callback){
var form = new FormData();
names.forEach((name , i) => {
form.append(names[i] , values[i]);
})

var xmlHttp = new XMLHttpRequest();
xmlHttp.open(type , path);
xmlHttp.send(form);

xmlHttp.onreadystatechange = function(){
if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
callback(null, xmlHttp.responseText);
}else if(xmlHttp.readyState == 4 && xmlHttp.status == 404){
callback("Route not found", null);
}
else if(xmlHttp.readyState == 4 && xmlHttp.status != 200){
callback("Error in state 200", null);
}
}
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

function checkCookie() {
let username = getCookie("username");
if (username != "") {
alert("Welcome again " + username);
} else {
username = prompt("Please enter your name:", "");
if (username != "" && username != null) {
    setCookie("username", username, 365);
}
}
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


function updateSeconds(userId){
sendRequestWithCallback(["userId"], [userId], "POST", `../backend/updateSeconds.php`, (error, res)=>{
if(error != null){
    alert("Unable to update!");
}
})
}

function updateStartedTestsCount(userId){
sendRequestWithCallback(["userId"], [userId], "POST", `../backend/updateStartedTestsCount.php`, (error, res)=>{
if(error != null){
    alert("Unable to update!");
}
})
}

function updateEndedTestsCount(userId){
sendRequestWithCallback(["userId"], [userId], "POST", `../backend/updateEndedTestsCount.php`, (error, res)=>{
if(error != null){
    alert("Unable to update!");
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

typingString = ""
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
    }else if(parseInt(duration) == 120){
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
    nexP = points[i + 1];
    if (nexP) {
        m = gradient(preP, nexP);
        dx2 = (nexP.x - curP.x) * -f;
        dy2 = dx2 * m * t;
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

