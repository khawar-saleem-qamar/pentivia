import React, {useRef, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './signup.css'
import signupBanner from '../../assets/images/signupBanner.png'
import logo from "../../assets/images/pentivia.png"
import Input from '../partials/widgets/Input'
import Button from '../partials/widgets/Button'
import TypingBar from '../typing/TypingBar'

const Signup = () => {
  var [step, setStep] = useState("first")
  var [error, setError] = useState("")
  var [successMessage, setSuccessMessage] = useState(false)
  var [showTyping, setShowTyping] = useState(false);
  var username = useRef(null);
  var email = useRef(null);
  var otp = useRef(null);
  var password = useRef(null);
  var terms = useRef(null);
  var [nextLoading, setNextLoading] = useState(false);
  const navigate = useNavigate();
  var resetGap = 30;
  var [resendTime, setResendTime] = useState(30);
  var [runTime, setRunTime] = useState(false);

  useEffect(()=>{
    if(successMessage){
      setTimeout(()=>{
        setSuccessMessage(false);
        setError("")
      }, 5000)
    }
  }, [successMessage])

  useEffect(()=>{
    if(runTime){
      setTimeout(()=>{
        if(resendTime != 0){
          setResendTime(resendTime - 1);  
        }else{
          setRunTime(false);
        }
      }, 1000)
    }
  }, [resendTime, runTime])
  
  
  var handleSignupClick = async function (){
    if(nextLoading == false){

      setNextLoading(true);
      if(username.current.value == "" || email.current.value == "" || password.current.value == ""){
        setError("Please fill all fields");
        setNextLoading(false);
        return;
      }
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email.current.value)){
        setError("Please enter valid email")
        setNextLoading(false);
        return
      }
  
      if(!terms.current.checked){
        setError("Please check terms and policy!");
        setNextLoading(false);
        return;
      }
  
  
      const url = "http://localhost:4000"
  
      const userData = {
        username: username.current.value,
        password: password.current.value,
        email: email.current.value,
      };
      try {
        const res = await fetch(`${url}/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        const data = await res.json(); // Parse the JSON response
        setNextLoading(false);
        if(!data.success){
          setError(data.body);
        }else{
          setStep("second");
          setNextLoading(false);
          setRunTime(true);
          console.log("Response: ", data.body)
        }
      } catch (error) {
        setError("Something went wrong");
      }
  
      // setShowTyping(true);
    }

  }

  var handleOtpClick = async function (){
    if(nextLoading == false){

      setNextLoading(true);
      if(otp.current.value == ""){
        setError("Please enter otp");
        setNextLoading(false);
        return;
      }
  
  
      const url = "http://localhost:4000"
  
      const userData = {
        otp: otp.current.value,
        email: email.current.value,
      };
      try {
        const res = await fetch(`${url}/auth/verifyOTP`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        const data = await res.json(); // Parse the JSON response
        setNextLoading(false);
        if(!data.success){
          setError(data.body);
        }else{
          setNextLoading(false);
          console.log("Response: ", data.body)
          navigate("/login?success=true&message=Account created successfully")
        }
      } catch (error) {
        setError("Something went wrong");
      }
  
      // setShowTyping(true);
    }
  }

  var handleResendOtp = async function(){
    if(nextLoading == false && resendTime == 0){

      setNextLoading(true);  
      setResendTime(resetGap);
      const url = "http://localhost:4000"
  
      const userData = {
        email: email.current.value
      };
      try {
        const res = await fetch(`${url}/auth/resendOTP`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        const data = await res.json(); // Parse the JSON response
        setNextLoading(false);
        if(!data.success){
          setError(data.body);
        }else{
          setRunTime(true);
          setNextLoading(false);
          setSuccessMessage(true);
          setError("Otp sent successfully")
        }
      } catch (error) {
        setError("Something went wrong");
      }
  
      // setShowTyping(true);
    }
  }

  var handleType = function(){
    setError("")
  }
  return (
    <div className="SIGNUP_main-container light">
      <div className="SIGNUP_banner-showcase">
        {!showTyping && 
        <>
          <img className='SIGNUP_signupBanner' src={signupBanner} />
          <div className="SINGUP_banner-title">
            <img className='SIGNUP_logo' src={logo} />
            <span>Pentivia</span>
          </div>
        </>
        }
        {
          showTyping &&
          <TypingBar />
        }
      </div>
      <div className={`SIGNUP_portion ${step == "first" ? "show" : "hide"}`}>
        <div className="SIGNUP_portion-head">
          <div className="SIGNUP_portion-heading">Adventure starts here! 🚀</div>
          <div className="SIGNUP_portion-tagline">Start getting lightening typing with fun!</div>
          <div className={`SIGNUP_error ${error == "" ? "" : "active"}`}>{error}</div>
        </div>
        <div className="SIGNUP_portion-body">
          <Input handleType={handleType} reference={username} placeholder="Enter your username" type="text" label="Username" />
          <Input handleType={handleType} reference={email} placeholder="Enter your email" type="email" label="Email" />
          <Input handleType={handleType} reference={password} placeholder="Enter your password" type="password" label="Password" />

          <div className="SIGNUP_terms-approve">
            <input className='SIGNUP_terms-check' type="checkbox" ref={terms} onClick={handleType}/>
            <span className='SIGNUP_terms-testimony'>I agree to <a>terms and policies</a></span>
          </div>
          
          <Button handleClick={handleSignupClick} text={nextLoading ? "Loading...":  "Next Step"} />

          <div className='SIGNUP_already-account'>Already have an account? <a href="/login">SignIn instead!</a></div>
        </div>
      </div>
      <div className={`OTP_portion ${step == "second" ? "show" : "hide"}`}>
      <div className="SIGNUP_portion-head">
        <div className="OTP_portion-back" onClick={()=>{
          setStep("first")
          setResendTime(resendTime)
          setRunTime(true)
          }}>{"< Signup again"}</div>
          <div className="SIGNUP_portion-heading">Verify otp 🚀</div>
          <div className="SIGNUP_portion-tagline">Enter OTP sent to your email and register for adventure!</div>
          <div className={`SIGNUP_error ${successMessage ? "success": ""}  ${error == "" ? "" : "active"}`}>{error}</div>
        </div>
        <div className="SIGNUP_portion-body">
          <Input handleType={handleType} reference={otp} placeholder="Enter your otp..." type="number" label="Otp" />
          <div className='SIGNUP_resend' onClick={handleResendOtp} >{resendTime != 0 ? `Resend otp in: ${resendTime}s` : "Resend otp?"}</div>

          <Button handleClick={handleOtpClick} text={nextLoading ? "Loading...":  "Verify Otp"} />
        </div>
      </div>
    </div>
  )
}

export default Signup