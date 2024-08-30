import React, { useState } from 'react'
import { selectUser } from '../../App/userSlice'
import { useSelector } from 'react-redux'
import Bars from './Bars'



const TypingBar = () => {
  var user = useSelector(selectUser);  
  return (
    <>
    <Bars userId={user._id} token={user.token} bar="chat" time={user.typingTime} typingContent={user.typingContent} typingSource={user.typingSource} keyboard={true}/>
    </>
  )
}

export default TypingBar