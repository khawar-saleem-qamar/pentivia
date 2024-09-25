import React, {useRef, useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './forgot.css'
import forgotBanner from '../../assets/images/forgotBanner.png'
import logo from "../../assets/images/pentivia.png"
import Input from '../partials/widgets/Input'
import Button from '../partials/widgets/Button'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../src/App/userSlice'

const Forgot = () => {
  var [step, setStep] = useState("first")
  var [error, setError] = useState("")
  var [successMessage, setSuccessMessage] = useState(false)
  var email = useRef(null);
  var otp = useRef(null);
  var password = useRef(null);
  var repassword = useRef(null);
  var [nextLoading, setNextLoading] = useState(false);
  const navigate = useNavigate();
  var resetGap = 30;
  var [resendTime, setResendTime] = useState(30);
  var [runTime, setRunTime] = useState(false);
  const url = import.meta.env.VITE_REACT_APP_BASE_URL;
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

  var user = useSelector(selectUser);

  useEffect(()=>{
    if(user){
      navigate("/typing")
    }
  }, [user])
  
  var handleForgotClick = async function (){
    if(nextLoading == false){

      setNextLoading(true);
      if(email.current.value == ""){
        setError("Please enter email");
        setNextLoading(false);
        return;
      }
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email.current.value)){
        setError("Please enter valid email")
        setNextLoading(false);
        return
      }  
  
      const userData = {
        email: email.current.value
      };
      try {
        const res = await fetch(`${url}/auth/resetPasswordRequest`, {
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
  
      const userData = {
        otp: otp.current.value,
        email: email.current.value,
      };
      try {
        const res = await fetch(`${url}/auth/verifyPasswordOtp`, {
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
          setStep("third");
          setNextLoading(false);
          console.log("Response: ", data.body)
        }
      } catch (error) {
        setError("Something went wrong");
      }
  
      // setShowTyping(true);
    }
  }

  var handlePassClick = async function (){
    if(nextLoading == false){

      setNextLoading(true);
      if(password.current.value == "" || repassword.current.value == ""){
        setError("Please enter password");
        setNextLoading(false);
        return;
      }

      if(password.current.value != repassword.current.value){
        setError("Both passwords must match");
        setNextLoading(false);
        return;
      }
  
      const userData = {
        newpassword: password.current.value,
        email: email.current.value,
      };
      try {
        const res = await fetch(`${url}/auth/newPassword`, {
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
          navigate("/login?success=true&message=Password changed successfully")
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
  
      const userData = {
        email: email.current.value
      };
      try {
        const res = await fetch(`${url}/auth/resendPasswordOTP`, {
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
    <div className="FORGOT_main-container light">
      <div className="FORGOT_banner-showcase">
          <img className='FORGOT_forgotBanner' src={forgotBanner} />
          <div className="SINGUP_banner-title">
            <img className='FORGOT_logo' src={logo} />
            <span>Pentivia</span>
          </div>
      </div>
      <div className={`FORGOT_portion ${step == "first" ? "show" : "hide"}`}>
        <div className="FORGOT_portion-head">
          <div className="FORGOT_portion-heading">Forgot password? 🚀</div>
          <div className="FORGOT_portion-tagline">Reset it to restart the fun adventure!</div>
          <div className={`FORGOT_error ${error == "" ? "" : "active"}`}>{error}</div>
        </div>
        <div className="FORGOT_portion-body">
          <Input handleType={handleType} reference={email} placeholder="Enter your email" type="email" label="Email" />
          
          <Button handleClick={handleForgotClick} text={nextLoading ? "Loading...":  "Next Step"} />

          <div className='FORGOT_already-account'>Want to signin? <Link to="/login">SignIn!</Link></div>
        </div>
      </div>
      <div className={`OTP_portion ${step == "second" ? "show" : "hide"}`}>
      <div className="FORGOT_portion-head">
        <div className="OTP_portion-back" onClick={()=>{
          setStep("first")
          setResendTime(resendTime)
          setRunTime(true)
          }}>{"< Email again"}</div>
          <div className="FORGOT_portion-heading">Verify otp 🚀</div>
          <div className="FORGOT_portion-tagline">Enter OTP sent to your email and reset the password!</div>
          <div className={`FORGOT_error ${successMessage ? "success": ""} ${error == "" ? "" : "active"}`}>{error}</div>
        </div>
        <div className="FORGOT_portion-body">
          <Input handleType={handleType} reference={otp} placeholder="Enter your otp..." type="number" label="Otp" />
          <div className='FORGOT_resend' onClick={handleResendOtp} >{resendTime != 0 ? `Resend otp in: ${resendTime}s` : "Resend otp?"}</div>
          <Button handleClick={handleOtpClick} text={nextLoading ? "Loading...":  "Verify Otp"} />
        </div>
      </div>

      <div className={`PASS_portion ${step == "third" ? "show" : "hide"}`}>
      <div className="FORGOT_portion-head">
        <div className="OTP_portion-back" onClick={()=>setStep("first")}>{"< Email again"}</div>
          <div className="FORGOT_portion-heading">Reset password</div>
          <div className="FORGOT_portion-tagline">Enter password twice to restart the adventure!</div>
          <div className={`FORGOT_error ${error == "" ? "" : "active"}`}>{error}</div>
        </div>
        <div className="FORGOT_portion-body">
          <Input handleType={handleType} reference={password} placeholder="Enter new password" type="password" label="Password" />
          <Input handleType={handleType} reference={repassword} placeholder="Re-enter your new password" type="password" label="Re-enter new password" />
          
          <Button handleClick={handlePassClick} text={nextLoading ? "Loading...":  "Reset password"} />
        </div>
      </div>
    </div>
  )
}

export default Forgot