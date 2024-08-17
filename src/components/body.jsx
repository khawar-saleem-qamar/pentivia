import React, {useState} from 'react'
import './styles/body.css'
import Header from './partials/Header'
import Footer from './partials/Footer'
import TypingBar from './typing/TypingBar'

const Body = () => {
  const [theme, setTheme] = useState("light");
  return (
    <div className={`BODY_main-container ${theme}`}>
      <Header setTheme={setTheme} theme={theme}/>
      <div className='BODY_content light'>
        <TypingBar />
      </div>
      <Footer/>
    </div>
  )
}

export default Body