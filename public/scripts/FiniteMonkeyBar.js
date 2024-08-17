function initializeFiniteMonkeyBar(typingString, typingBar, barContent, hiddenInput, bodyContent, measurmentCallback){

  typingBar.style.height = "fit-content";
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
 var invisibleKeys = ["Shift", "Tab", "CapsLock", "Control", "Alt", "PageDown", "PageUp", "Delete", "Home", "End", "Backspace", "Insert", "ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", " "]


//   startingString = typingString.split(" ")
//  startingString = startingString.join(" ")

var stringLength = typingString.split(" ").join("").length
console.log(stringLength)

 startBar(typingString, barContent);

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
    // if(e.key == "Backspace"){
    //   var activeWord = contentBar.querySelector(".word.active");
    // var activeLetter = activeWord.querySelector(`letter:not(.done)`);
    // var lastLetter = activeWord.querySelector(`letter:last-child`)
    //   keyFrequency++;
    //  var doneLettersLength = (activeWord.querySelectorAll(`letter.done`)).length
    //  var actualLettersLength = (activeWord.querySelectorAll(`letter:not(.extra)`)).length
    // if(activeWord.querySelector(".extra")){
    //   activeWord.removeChild(activeWord.querySelector("letter:last-child"));
    //   extraLetters--;
    //   extraString = extraString.substring(0, extraString.length - 1);
    //   carot.style.left = (activeWord.querySelector("letter:last-child")).offsetLeft + (activeWord.querySelector("letter:last-child")).offsetWidth+ "px";
    //  }else{
    //   if(activeWord.querySelector("letter.done")){
    //    var dones = activeWord.querySelectorAll(".done");
    //    var lastChild = dones[dones.length - 1]
    //    if(lastChild.classList.contains("correct")){
    //      stringTyped = stringTyped.substring(0, stringTyped.length - 1 );
    //     correctLetters--;
    //     valuedKeys--;
    //    }else if(lastChild.classList.contains("incorrect")){
    //      stringTyped = stringTyped.substring(0, stringTyped.length - 16 );
    //     incorrectLetters--;
    //     valuedKeys--;
    //    }
    //    lastChild.classList.remove("correct");
    //    lastChild.classList.remove("incorrect");
    //    lastChild.classList.remove("done");
    //    carot.style.left = lastChild.offsetLeft + "px"
    //    carot.style.top = lastChild.offsetTop + "px";
    //   }else{
    //    var allChilds = contentBar.querySelectorAll(".word");
    //    var prevActiveWord = null;
    //    var tempPrev;
    //    allChilds.forEach(child => {
    //     if(child == activeWord){
    //      prevActiveWord = tempPrev;
    //     }else{
    //      tempPrev = child
    //     }
    //    })
    //    if(prevActiveWord != null){
    //      var erased = wordsRespect[wordsRespect.length - 1];
    //      erased.type = "erased";
    //      wordsRespect = wordsRespect.slice(0, wordsRespect.length);
    //      console.log("id",wordsRespect)
    //      lastRespect = wordsRespect[wordsRespect.length - 1];
    //      stringTyped = lastRespect.stringTyped;
    //      extraString = lastRespect.extraString;
    //      wordsRespect = wordsRespect.slice(0, wordsRespect.length - 1);
    //      wordsRespect.push(erased);
    //      console.log(wordsRespect)
    //      var untypedPrev = prevActiveWord.querySelectorAll("letter:not(.done):not(.extra)");
    //      untypedPrev.forEach(letter => {
    //        stringTyped = stringTyped.substring(0, stringTyped.length - 13)
    //      })
    //     activeWord.classList.remove("active");
    //     prevActiveWord.classList.add("active");
    //     if(prevActiveWord.querySelector(".extra")){
    //      carot.style.left = prevActiveWord.offsetLeft + prevActiveWord.offsetWidth + "px";
    //     }else{
    //      var doneChilds = prevActiveWord.childNodes;
    //      var lastDoneLetters = prevActiveWord.querySelectorAll("letter.done");
    //      var lastDoneLetter = null;
    //      if(lastDoneLetters.length != 0){
    //       lastDoneLetter = lastDoneLetters[lastDoneLetters.length - 1]
    //      }
    //      if(lastDoneLetter == null){
    //       lastDoneLetter = prevActiveWord.querySelector("letter")
    //       carot.style.left = lastDoneLetter.offsetLeft+ "px";
    //      }else{
    //       carot.style.left = lastDoneLetter.offsetLeft + lastDoneLetter.offsetWidth+ "px";
    //      }
    //     }
    //     carot.style.top = prevActiveWord.offsetTop + "px";
    //     if(prevActiveWord.classList.contains('error')){
    //      prevActiveWord.classList.remove('error');
    //      incorrectWords--;
    //     }else{
    //      correctWords--;
    //     }
    //    }
    //   }
    //  }
    //  if(totalTypedWords != 0){
    //   totalTypedWords--;
    //  }
    // }
  })
  hiddenInput.addEventListener("input", (e)=>{
   var key = e.data;
   hiddenInput.value = "";
   typingBar.classList.add("focus");
   if(!intervalStarted){
    intervalStarted = true;
    measuringInterval = setInterval(() => {
      // console.log(currentSecond)
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
        keyFrequency = 0;
      }

      console.log(valuedKeys)
      var per = (valuedKeys / stringLength) * 100;
      var lpm = (correctLetters + incorrectLetters) / 5;
      (bodyContent.querySelector(".testWpm")).innerText = per + " --- " + nonComputedWpm + " --- " + nonComputedRaw
    }, 1000);
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
       valuedKeys++;
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
        moveToNextWord(contentBar, activeWord);
      }
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
     if(activeWord.classList.contains("last")){
      clearInterval(measuringInterval);
      measurmentCallback(measurment, wordsRespect);
      console.log("Results ===================>");
      console.group("Result:")
      console.log(measurment);
      console.log(wordsRespect)
     }
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
  valuedKeys += untypedIncorrect.length;
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
