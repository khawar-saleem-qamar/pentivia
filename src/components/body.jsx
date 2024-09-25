import React, {useState, useEffect} from 'react'
import './styles/body.css'
import Header from './partials/Header'
import Footer from './partials/Footer'
import TypingBar from './typing/TypingBar'
import { selectUser } from '../App/userSlice'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Body = () => {
  var user = useSelector(selectUser);
  // var navigate = useNavigate();

  // useEffect(()=>{
  //   console.log("user: ", user)
  //   if(!user){
  //     navigate("/login")
  //   }
  // }, [user])
  const [theme, setTheme] = useState("light");
  return (
    <div className={`BODY_main-container ${theme} container-wrapper`}>
      <Header setTheme={setTheme} theme={theme}/>
      <div className='BODY_content light wrap-container'>
        <TypingBar />
      </div>
      <Footer/>
    </div>
  )
}

export default Body