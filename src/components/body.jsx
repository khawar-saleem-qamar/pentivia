import React from 'react'
import './styles/body.css'
import Header from './partials/Header'
import Footer from './partials/Footer'

const Body = () => {
  return (
    <div className='BODY_main-container light'>
      <Header/>
      <div className='BODY_content'>
        lorem5000
      </div>
      <Footer/>
    </div>
  )
}

export default Body