
// variables
const keyboard = document.querySelector(".keyboard")
// variables end




// Eventlisteners
document.addEventListener("keydown", (e)=>{
 if(e.key == "Tab"){
  e.preventDefault();
 }
 const key = e.key;
 pressKey(e, key, keyboard);
})

document.addEventListener("keyup", (e)=>{
 if(e.key == "Tab"){
  e.preventDefault();
 }
 const key = e.key;
 keyRelease(e, key, keyboard);
})

// Eventlisteners ends



// functions
function pressKey(event, selector, from){
 if(event.location == 3){
  if(selector == "+"){
   selector = "plus";
  }else if(selector == "*"){
   selector = "mul";
  }
  var key;
   key = from.querySelector(`[data-name=key][keyid=num-${selector}-num]`);
  key.classList.add("active")
 }else if(selector == "Shift"){
  var key;
  if (event.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT){
   key = from.querySelector("[data-name=key][keyid=Shift-left]");
  } else if (event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT){
   key = from.querySelector("[data-name=key][keyid=Shift-right]");
  }
  key.classList.add("active")
 }else if(selector == "Control"){
  var key;
  if (event.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT){
   key = from.querySelector("[data-name=key][keyid=Ctrl-left]");
  } else if (event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT){
   key = from.querySelector("[data-name=key][keyid=Ctrl-right]");
  }
  key.classList.add("active")
 }else if(selector == "Alt"){
  var key;
  if (event.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT){
   key = from.querySelector("[data-name=key][keyid=Alt-left]");
  } else if (event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT){
   key = from.querySelector("[data-name=key][keyid=Alt-right]");
  }
  key.classList.add("active")
 }else{
  var keysArray = from.querySelectorAll("[data-name=key]");
  keysArray.forEach(key => {
   var keyid = key.getAttribute("keyid");
   var keyids = keyid.split("|");
   if(keyids.includes(selector)){
    key.classList.add("active");
   }
  })
 }
}

function keyRelease(event, selector, from){
 if(event.location == 3){
  if(selector == "+"){
   selector = "plus";
  }else if(selector == "*"){
   selector = "mul";
  }
  var key;
   key = from.querySelector(`[data-name=key][keyid=num-${selector}-num]`);
  key.classList.remove("active")
 }else if(selector == "Shift"){
  if (event.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT){
   key = from.querySelector("[data-name=key][keyid=Shift-left]");
  } else if (event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT){
   key = from.querySelector("[data-name=key][keyid=Shift-right]");
  }
  key.classList.remove("active")
 }else if(selector == "Control"){
  var key;
  if (event.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT){
   key = from.querySelector("[data-name=key][keyid=Ctrl-left]");
  } else if (event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT){
   key = from.querySelector("[data-name=key][keyid=Ctrl-right]");
  }
  key.classList.remove("active")
 }else if(selector == "Alt"){
  var key;
  if (event.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT){
   key = from.querySelector("[data-name=key][keyid=Alt-left]");
  } else if (event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT){
   key = from.querySelector("[data-name=key][keyid=Alt-right]");
  }
  key.classList.remove("active")
 }else{
  var keysArray = from.querySelectorAll("[data-name=key]");
  keysArray.forEach(key => {
   var keyid = key.getAttribute("keyid");
   var keyids = keyid.split("|");
   if(keyids.includes(selector)){
    key.classList.remove("active");
    
   }
  })
 }
}
// functions end