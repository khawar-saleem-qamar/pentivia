import React, {useState} from 'react'
import './styles/body.css'
import Header from './partials/Header'
import Footer from './partials/Footer'

const Body = () => {
  const [theme, setTheme] = useState("light");
  return (
    <div className={`BODY_main-container ${theme}`}>
      <Header setTheme={setTheme} theme={theme}/>
      <div className='BODY_content'>
        lorem5000
      </div>
      <Footer/>
    </div>
  )
}

export default Body