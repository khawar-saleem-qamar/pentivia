import React, { useState } from 'react'
import { selectUser } from '../../App/userSlice'
import { useSelector } from 'react-redux'
import Bars from './Bars'



const TypingBar = () => {
  var user = useSelector(selectUser);  
  console.log(user.customLessonRepeat);
  return (
    <>
    <Bars userId={user._id} token={user.token} bar={user.bar} time={user.typingTime} typingContent={user.typingContent} typingSource={user.typingSource} keyboard={true} customLessonContent={user.customLessonContent} customLessonRepeat={user.customLessonRepeat} customLessonShuffle={user.customLessonShuffle}/>
    </>
  )
}

export default TypingBar