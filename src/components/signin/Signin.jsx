import React, {useRef, useState, useEffect} from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import './signin.css'
import signinBanner from '../../assets/images/signinBanner.png'
import logo from "../../assets/images/pentivia.png"
import Input from '../partials/widgets/Input'
import Button from '../partials/widgets/Button'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { selectUser } from '../../App/userSlice'
import {login} from "../../App/userSlice"
import {Link} from 'react-router-dom'

const Signin = () => {
  var [error, setError] = useState("")
  var username = useRef(null);
  var password = useRef(null);
  var remember = useRef(null);
  const [searchParams] = useSearchParams();
  var message = searchParams.get("message")
  var [signup, setSignup] = useState(searchParams.get('success') || false);
  var [nextLoading, setNextLoading] = useState(false);
  const navigate = useNavigate();
  var user = useSelector(selectUser);
  var dispatch = useDispatch();

  useEffect(()=>{
    if(signup){
      setError(message)
      setTimeout(()=>{
        setError("")
        setSignup(false);
      }, 3000)
    }
  }, [])


  useEffect(()=>{
    if(user){
      navigate("/typing")
    }
  }, [user])

  var handleSigninClick = async function (){
    if(nextLoading == false){
      setNextLoading(true);
      if(username.current.value == "" || password.current.value == ""){
        setError("Username or email is wrong");
        return;
      }  
  
      const url = "http://localhost:4000"
  
      const userData = {
        email: username.current.value,
        password: password.current.value,
      };
      try {
        const res = await fetch(`${url}/auth/login`, {
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
          setNextLoading(false);
          console.log("Response: ", data.body)
          var userLogin = data.body.user
          userLogin["bar"] = "monkey";
          userLogin["typingTime"] = 120;
          userLogin["typingContent"] = "word";
          userLogin["typingSource"] = "generate";
          userLogin["colorfulKeyboard"] = true;
          dispatch(login(userLogin))
        }
      } catch (error) {
        console.log(error);
        setError("Something went wrong");
      }
  
      // setShowTyping(true);
    }
  }

  var handleType = function(){
    setError("")
    setSignup(false);
  }
  return (
    <div className="SIGNIN_main-container light">
      <div className="SIGNIN_banner-showcase">
        <img className='SIGNIN_signinBanner' src={signinBanner} />
        <div className="SINGUP_banner-title">
          <img className='SIGNIN_logo' src={logo} />
          <span>Pentivia</span>
        </div>
      </div>
      <div className="SIGNIN_portion">
        <div className="SIGNIN_portion-head">
          <div className="SIGNIN_portion-heading">Welcome to pentivia! 👋🏻</div>
          <div className="SIGNIN_portion-tagline">Please sign-in to your account and start the adventure</div>
          <div className={`SIGNIN_error ${signup ? "success" : ""} ${error == "" ? "" : "active"}`}>{error}</div>
        </div>
        <div className="SIGNIN_portion-body">
          <Input handleType={handleType} reference={username} placeholder="Enter your username or email" type="text" label="Username or Email" />
          <Input handleType={handleType} reference={password} placeholder="Enter your password" type="password" label="Password" />

          <div className="SIGNIN_remember-approve">
            <input className='SIGNIN_remember-check' type="checkbox" ref={remember} onClick={handleType}/>
            <span className='SIGNIN_remember-testimony'><span>Remember me</span> <Link to="/forgot-password">Forgot password?</Link></span>
          </div>
          
          <Button handleClick={handleSigninClick} text="SignIn" />

          <div className='SIGNIN_already-account'>New to pentivia? <Link to="/signup">SignUp now!</Link></div>
        </div>
      </div>
    </div>
  )
}

export default Signin