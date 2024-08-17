import React from 'react'
import './signup.css'
import signupBanner from '../../assets/images/signupBanner.png'
import logo from "../../assets/images/pentivia.png"
import Input from '../partials/widgets/Input'

const Signup = () => {
  return (
    <div className="SIGNUP_main-container light">
      <div className="SIGNUP_banner-showcase">
        <img className='SIGNUP_signupBanner' src={signupBanner} />
        <div className="SINGUP_banner-title">
          <img className='SIGNUP_logo' src={logo} />
          <span>Pentivia</span>
        </div>
      </div>
      <div className="SIGNUP_portion">
        <div className="SIGNUP_portion-head">
          <div className="SIGNUP_portion-heading">Adventure starts here! 🚀</div>
          <div className="SIGNUP_portion-tagline">Start getting lightening typing with fun!</div>
        </div>
        <div className="SIGNUP_portion-body">
          <Input placeholder="Enter your username" type="text" label="Username" />
          <Input placeholder="Enter your email" type="email" label="Email" />
          <Input placeholder="Enter your password" type="password" label="Password" />
        </div>
      </div>
    </div>
  )
}

export default Signup