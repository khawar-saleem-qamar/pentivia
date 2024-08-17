var participants;
function initializeMultiplayerMonkeyBar(typingString, typingBar, barContent, hiddenInput, bodyContent, userId, game_uuid, gameCanvas, measurmentCallback){
  console.log(typingString)
  typingBar.style.height = "fit-content";
  typingBar.style.width = "calc(100% - 50px)";
  typingBar.style.margin = "0 10px 5px 10px"
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
 var valuedKeys = 0;
 var errorLetters = 0;
 var keepUpdating = true;
 var excludedStatus = 0;
 var inActiveTime = 0;
 var invisibleKeys = ["Shift", "Tab", "CapsLock", "Control", "Alt", "PageDown", "PageUp", "Delete", "Home", "End", "Backspace", "Insert", "ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", " "]
 var timeIncrement = 100;
 var incrementTurn = 0;


//   startingString = typingString.split(" ")
//  startingString = startingString.join(" ")

var stringLength = typingString.split(" ").join("").length
console.log(stringLength)

 startBar(typingString, barContent);

 function startBar(typingString, contentBar){
  populateBar(typingString, contentBar);
  addCarot(contentBar);
  bodyContent.style.paddingTop = "0";
  document.querySelector(".games-info").style.display = "none";
  // gameCanvas.style.marginTop = 10+"px";
  gameCanvas.style.height = (document.body.offsetHeight - (document.querySelector(".gameContent")).offsetHeight) + "px";
  gameCanvas.style.width = "100%";
  gameCanvas.style.backgroundColor = "orange";
  renderGame(gameCanvas);

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
        valuedKeys--;
       }else if(lastChild.classList.contains("incorrect")){
         stringTyped = stringTyped.substring(0, stringTyped.length - 16 );
        incorrectLetters--;
        // valuedKeys--;
       }
       lastChild.classList.remove("correct");
       lastChild.classList.remove("incorrect");
       lastChild.classList.remove("done");
       carot.style.left = lastChild.offsetLeft + "px"
       carot.style.top = lastChild.offsetTop + "px";
      }
     }
    }
  })
  hiddenInput.addEventListener("input", (e)=>{
   var key = e.data;
   hiddenInput.value = "";
   typingBar.classList.add("focus");
   if(!intervalStarted){
    intervalStarted = true;
    sendRequestWithCallback(["userId"], [userId], "POST", `../backend/deletePresenceMultiplayer.php`, (error, res)=>{
      if(error == null){
         if(res == "success"){ 
           var wpm = 0, raw = 0, progress = 0, lpm = 0;
           var timeRatio = 1000 / timeIncrement;
           var secondRatio = 60 / timeRatio;          
           var nonComputedRaw = 0;
           var nonComputedWpm = 0;
           measuringInterval = setInterval(() => {
            incrementTurn++;
            if(incrementTurn * timeIncrement == 1000){
              // alert(incrementTurn);
              incrementTurn = 0;
            // console.log(currentSecond)
            // if(focused == true){
            // computation
            var computedRaw = 0;
            nonComputedRaw = ((keyFrequency) / 5) / (1 / secondRatio);
            var computedWpm = ((correctLetters - incorrectLetters) / 5) / (currentSecond / secondRatio) > 0 ? ((correctLetters - incorrectLetters) / 5) / (currentSecond / secondRatio) : 0;;
            nonComputedWpm = ((correctLetters - incorrectLetters) / 5) / (currentSecond / secondRatio) > 0 ? ((correctLetters - incorrectLetters) / 5) / (currentSecond / secondRatio) : 0;
            var testcomp;
            if(measurment.length != 0 ){
              var lastMeasurment = measurment[measurment.length - 1]
              testcomp = (((correctLetters - lastMeasurment.correctLetters)  - (incorrectLetters - lastMeasurment.incorrectLetters)) / 5) / (1 / secondRatio);
            }else{
              testcomp = ((correctLetters  - incorrectLetters) / 5) / (1 / secondRatio);
            }
            var nonComputedIndividualWpm = testcomp > 0 ? testcomp : 0;
            computedWpm = nonComputedIndividualWpm;
            if(currentSecond == 1){
              computedRaw = ((keyFrequency) / 5) / (1 / secondRatio);
              computedWpm = computedWpm;
            }else if(currentSecond == 2){
              var presentRaw = ((keyFrequency) / 5) / (1 / secondRatio);
              var lastSecondRaw = measurment[measurment.length - 1].raw;
              computedRaw = ( presentRaw + lastSecondRaw ) / 2;
      
              var presentWpm = computedWpm;
              var lastSecondWpm = measurment[measurment.length - 1].wpm;
              computedWpm = ( presentWpm + lastSecondWpm ) / 2;
            }else{
              var presentRaw = ((keyFrequency) / 5) / (1 / secondRatio);
              var lastSecondRaw = measurment[measurment.length - 1].raw;
              computedRaw = ( lastSecondRaw + presentRaw ) / 2;
              measurment[measurment.length - 1].raw = computedRaw
      
              var presentWpm = computedWpm;
              var lastSecondWpm = measurment[measurment.length - 1].wpm;
              computedWpm = ( lastSecondWpm + presentWpm ) / 2;
              measurment[measurment.length - 1].wpm = computedWpm
            }
            //computation ends
      
          //  if(currentSecond < totalTime){
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
            //  }else{
              
              //  }
              if(keyFrequency == 0){
                // inActiveTime++;
                excludedStatus = 1;
              }else{
                // inActiveTime = 0;
                excludedStatus = 0;
              }
              // alert(keyFrequency+"=="+inActiveTime+"__"+excludedStatus);
              keyFrequency = 0;
            // }
      
            // (bodyContent.querySelector(".testWpm")).innerText = progress + " --- " + wpm + " --- " + raw
          }
          console.log(valuedKeys)
          wpm = nonComputedWpm * timeRatio;
          if(wpm == undefined){
            wpm = 0;
          }
          raw = nonComputedRaw * timeRatio;
          if(raw == undefined){
            raw = 0;
          }
          progress = (valuedKeys / stringLength) * 100;
          lpm = (correctLetters + incorrectLetters) / 5;

            // store own data in database for multiplayer:
            if(keepUpdating){
              // if(inActiveTime > 15){
              //   excludedStatus = 1;
              // }else{
              //   excludedStatus = 0;
              // }
              console.log("Excluded Status: "+excludedStatus, "keyfreq: "+inActiveTime);
            var names = ["userId", "progress", "wpm", "raw", "error", "excludedStatus", "gameId"];
            var values = [userId, progress, wpm, raw, errorLetters, excludedStatus, game_uuid];
            sendRequestWithCallback(names, values, "POST", `../backend/storeMultiplayerParticipantData.php`, (error, rest)=>{
              if(error == null){
                console.log(rest);
                var res = JSON.parse(rest);
                  if(res[0] == "stopUpdate"){
                    keepUpdating = false;
                  }else if(res[0] == "stopGame"){
                    clearInterval(measuringInterval);
                    var data = res[1]
                    if(data.length != 0){

                      if(data[0].userId != userId){
                        for(var i = 1; i< data.length; i++){
                          if(data[i].userId == userId){
                            var itemToFind = data[i];
                            const foundIdx = data.findIndex(el => el == itemToFind)
                            data.splice(foundIdx, 1)
                            data.unshift(itemToFind);
                          }
                        }
                        console.log("current data modified: ", data);
                      }
                    }
                    updateGameData(data, true); 
                    console.log("console update");
                    // alert("game ended with update");
                  }else if(res[0] != "continue"){
                    console.log("store fail")
                  }
                  }else{
                  alert(error);
                  }
              })
            }else{
              var names = ["userId", "gameId", "tryStop"];
            var values = [userId, game_uuid, true];
            sendRequestWithCallback(names, values, "POST", `../backend/storeMultiplayerParticipantData.php`, (error, rest)=>{
                if(error == null){
                console.log("error response 2")
                console.log(rest);
                  var res = JSON.parse(rest);
                  if(res[0] == "stopGame"){
                    clearInterval(measuringInterval);
                    var data = res[1]
                    if(data.length != 0){

                      if(data[0].userId != userId){
                        for(var i = 1; i< data.length; i++){
                          if(data[i].userId == userId){
                            var itemToFind = data[i];
                            const foundIdx = data.findIndex(el => el == itemToFind)
                            data.splice(foundIdx, 1)
                            data.unshift(itemToFind);
                          }
                        }
                        console.log("current data modified: ", data);
                      }
                    }
                    updateGameData(data, true);
                    
                    console.log("console update");
                    // alert("game ended with update");
                  }else{
                    // alert("continure")
                    // var data = JSON.parse(res);
                    var data = res[1];
                    if(data[0].userId != userId){
                      for(var i = 1; i< data.length; i++){
                        if(data[i].userId == userId){
                          var itemToFind = data[i];
                          const foundIdx = data.findIndex(el => el == itemToFind)
                          data.splice(foundIdx, 1)
                          data.unshift(itemToFind);
                        }
                      }
                      console.log("current data modified: ", data);
                    }
                    updateGameData(data);
                    
                    console.log("console update");
                    // updateGameData
                  }
                }else{
                  alert(error);
                }
              })
            }
      
              // get other multiplayers' data:
              var names = ["userId", "gameId"];
              var values = [userId, game_uuid];
              sendRequestWithCallback(names, values, "POST", `../backend/getMultiplayerParticipantData.php`, (error, res)=>{
                if(error == null){
                      if(validateJson(res)){
                        var data = JSON.parse(res);
                        console.log("got participants data");
                        console.log(data);
                        var opData = document.querySelector(".opData");
                        if(data[0].userId != userId){
                          for(var i = 1; i< data.length; i++){
                            if(data[i].userId == userId){
                              var itemToFind = data[i];
                              const foundIdx = data.findIndex(el => el == itemToFind)
                              data.splice(foundIdx, 1)
                              data.unshift(itemToFind);
                            }
                          }
                          console.log("current data modified: ", data);
                        }
                        // console.log("userId: ",data[0].userId);
                        updateGameData(data);
                        
                    console.log("console update");
                        // opData.innerHTML = "";
                        // data.forEach(user => {
                        //   var userD = htmlTemp(`
                        //   <div class="op">${user.progress} + " --- " + ${user.wpm} + " --- " + ${user.raw}</div>
                        //   `)
                        //   opData.appendChild(userD);
                        // })
                      }
                    }else{
                    alert(error);
                    }
                })
          }, timeIncrement);
          }else{
            alert("Unable to fetch data!");
          }
        }
      })
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
       valuedKeys++;
       stringTyped += key;
      }else{
       activeLetter.classList.add("incorrect")
       incorrectLetters++;
      //  valuedKeys++;
       errorLetters++;
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
      if(!activeWord.classList.contains("last")){
        // alert("not work")
        var lettersActiveWord = activeWord.querySelectorAll("letter");
        var moveForward = true;
        for(let i = 0; i < lettersActiveWord.length; i++){
         if(!lettersActiveWord[i].classList.contains('correct')){
          moveForward = false;
          break;
         }
        }
        if(moveForward){
          moveToNextWord(contentBar, activeWord);
        }
      }
      // if(activeWord.classList.contains("error")){
        //   incorrectWords++;
        //   var unTyped = activeWord.querySelectorAll("letter:not(.done):not(.extra)");
        //   valuedKeys+=unTyped.length
        //   unTyped.forEach(letter => {
          //     stringTyped += `{|{|[;${letter.innerText};]|}|}`
          //   })
          // }else {
        // correctWords++;
      // }

      wordsRespect.push({
        stringTyped: stringTyped,
        extraString: extraString,
        originalWord: getWord(activeWord),
        type: "original"
      })
     stringTyped = "";
     extraString = "";
     if(activeWord.classList.contains("last")){
      measurmentCallback(measurment, wordsRespect);
      console.log("Results ===================>");
      console.group("Result:")
      console.log(measurment);
      console.log(wordsRespect);
      // sendRequestWithCallback(["gameId"], [gameId], "POST", `../backend/endMultiplayerGame.php`, (error, res)=>{
      //   if(error == null){
      //       if(res == "success"){
      //         console.log("ending success");
      //       }else{
      //         console.log("ending fail")
      //       }
      //     }else{
      //       alert(error);
      //     }
      //   })
     }
    //  scrollTo(0, 0);
     }
    }
   // }
  })
 }

 function moveToNextWord(contentBar, activeWord){
  var nextActiveWord = contentBar.querySelector(".word.active + .word");
  var lettersActiveWord = activeWord.querySelectorAll("letter");
  // for(let i = 0; i < lettersActiveWord.length; i++){
  //  if(!lettersActiveWord[i].classList.contains('correct')){
  //   activeWord.classList.add("error");
  //   break;
  //  }
  // }
  activeWord.classList.remove("active")
  var untypedIncorrect = activeWord.querySelectorAll("letter:not(.done):not(.extra)");
  incorrectLetters += untypedIncorrect.length;
  // valuedKeys += untypedIncorrect.length;
  nextActiveWord.classList.add("active")
  // if(( nextActiveWord.getBoundingClientRect().top - contentBar.getBoundingClientRect().top ) > 50){
  //  var allWords = contentBar.querySelectorAll(".word");
  //  var removeWords = [];
  //  allWords.forEach(word => {
  //   if(( word.getBoundingClientRect().top - contentBar.getBoundingClientRect().top ) < 10){
  //    removeWords.push(word);
  //   }
  //  })
  //  removeWords.forEach(word => {
  //   contentBar.removeChild(word)
  //  })
  //  stringUpdationStatus = true;
  // }
  carot.style.animationDuration = "0s";
  carot.style.top = nextActiveWord.offsetTop+"px";
  carot.style.left = nextActiveWord.offsetLeft +  "px";
  carot.style.animationDuration = "1s"; 

  // if(stringUpdationStatus){
  //  var newWord = typingString[0];
  //  typingString = typingString.slice(1, typingString.length);
  //  addWord(contentBar, newWord);
  // }

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
  typingWords.forEach((word, i) => {
    if(i == (typingWords.length -1 )){
      addWord(contentBar, word, true);
    }else{
      addWord(contentBar, word);
    }
  })
 }

 function addWord(content, word, last = false){
  var wordDom = htmlTemp(`
  <div class="word">
  </div>
  `)
  if(last){
    wordDom = htmlTemp(`
    <div class="word last">
    </div>
    `)
  }
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
}
