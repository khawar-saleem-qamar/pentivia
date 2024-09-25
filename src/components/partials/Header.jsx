import React,{useContext, useEffect, useRef, useState} from 'react'
import '../styles/header.css'
import logo from "../../assets/images/pentivia.png";
import avatar from "../../assets/images/avatar.svg";
import { Link } from 'react-router-dom';
import { fetchApi } from '../helpers/requestHelpers.js';

import { RiProfileLine } from "react-icons/ri";
import { MdLightMode } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { CiCircleInfo } from "react-icons/ci";
import { MdOutlineDataUsage } from "react-icons/md";
import { FaUsersRays } from "react-icons/fa6";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { SiTransmission } from "react-icons/si";
import { FaChevronDown } from "react-icons/fa";
import { IoCarSportOutline } from "react-icons/io5";
import { IoRocket } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from 'react-redux';
import {logout} from '../../App/userSlice';
import { useSelector } from 'react-redux'
import { selectUser } from '../../App/userSlice'
import { IoIosNotifications } from "react-icons/io";
import { NotificationsContext } from '../../App/notificationsContext.jsx';





const Header = ({setTheme, theme}) => {
  var user = useSelector(selectUser);
  var [unseen, setUnseen] = useState(0);
  var notifications = useContext(NotificationsContext);

  useEffect(()=>{
    setUnseen(notifications.filter(obj => !obj.seen).length)
  }, [notifications])
  
  var dispatch = useDispatch();
  var [headerOpen, setHeaderOpen] = useState(false);
  return (
    <div className={`HEADER_main-container ${headerOpen && "show"}`}>
      <div className='HEADER_content max-container'>
        <div className="HEADER_hamburger" onClick={()=> headerOpen ? setHeaderOpen(false) : setHeaderOpen(true)}>
          { headerOpen ? <RxCross1 style={{color: "var(--hover-color)", fontSize: "3rem"}} /> : <RxHamburgerMenu style={{color: "var(--hover-color)", fontSize: "3rem"}} />}
        </div>
        <div className='HEADER_logonlist'>
          <div className='HEADER_logo'>
            <img className='HEADER_logoimg' src={logo} />
          </div>
          <ul className='HEADER_list'>
            <li>
            <Link to="/typing">typing</Link></li>
            <li>
              <div className="HEADER-list-inner">
              games <span className='HEADER_list-rotate-icon'><FaChevronDown style={{color: 'var(--navbar-list-color)'}} /></span>
              </div>
              <div className="HEADER_list-dropdown">
                <ul className='list-left'>
                  <li>
                    <a href="/game/multiplay-cars">
                      <div className="HEADER_listdropdown-icon" style={{background: "#F0ABFC"}}>
                        <IoCarSportOutline style={{color: "black"}}  />
                      </div>
                      <div className="HEADER_listdropdown-cont">
                        <div className="HEADER_listdropdown-def">Multiplay cars</div>
                        <div className="HEADER_listdropdown-subtitle">Play multiplay cars 3d game</div>
                      </div>
                    </a>
                    </li>
                  <li>
                    <a href="/game/ztype">
                      <div className="HEADER_listdropdown-icon" style={{background: "#FCA5A5"}}>
                        <IoRocket style={{color: "black"}}  />
                      </div>
                      <div className="HEADER_listdropdown-cont">
                        <div className="HEADER_listdropdown-def">Shooting start</div>
                        <div className="HEADER_listdropdown-subtitle">Invaders shooting typing game</div>
                      </div>
                    </a>
                    </li>
                </ul>
              </div>
            </li>
            <li>
            <div className="HEADER-list-inner">
            company <span className='HEADER_list-rotate-icon'><FaChevronDown style={{color: 'var(--navbar-list-color)'}} /></span>
            </div>
              <div className="HEADER_list-dropdown">
                <ul className='list-left'>
                  <li>
                    <a href="/landing#usage">
                      <div className="HEADER_listdropdown-icon" style={{background: "#A5B4FC"}}>
                        <MdOutlineDataUsage style={{color: "black"}} />
                      </div>
                      <div className="HEADER_listdropdown-cont">
                        <div className="HEADER_listdropdown-def">Usage</div>
                        <div className="HEADER_listdropdown-subtitle">Learn about using this typing website</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="/landing#testimonials">
                      <div className="HEADER_listdropdown-icon" style={{background: "rgb(94, 234, 212)"}}>
                        <FaUsersRays style={{color: "black"}}  />
                      </div>
                      <div className="HEADER_listdropdown-cont">
                        <div className="HEADER_listdropdown-def">Testimonials</div>
                        <div className="HEADER_listdropdown-subtitle">Know what our users say about us and how we helped them</div>
                      </div>
                    </a>
                    </li>
                  <li>
                    <a href="/landing#features">
                      <div className="HEADER_listdropdown-icon" style={{background: "#F0ABFC"}}>
                        <MdOutlineFeaturedPlayList style={{color: "black"}}  />
                      </div>
                      <div className="HEADER_listdropdown-cont">
                        <div className="HEADER_listdropdown-def">Features</div>
                        <div className="HEADER_listdropdown-subtitle">How will this webiste help you get better productivity with fun</div>
                      </div>
                    </a>
                    </li>
                  <li>
                    <a href="/landing#mission">
                      <div className="HEADER_listdropdown-icon" style={{background: "#FCA5A5"}}>
                        <SiTransmission style={{color: "black"}}  />
                      </div>
                      <div className="HEADER_listdropdown-cont">
                        <div className="HEADER_listdropdown-def">Mission</div>
                        <div className="HEADER_listdropdown-subtitle">The mission we intend to achieve</div>
                      </div>
                    </a>
                    </li>
                </ul>
                <div className="HEADER_list-dropdown-side">
                  <a href="/about-us" className="HEADER_list-dropdown-side-item">About us</a>
                  <a href="/term-of-usage" className="HEADER_list-dropdown-side-item">Term of usage</a>
                  <a href="/privacy-policy" className="HEADER_list-dropdown-side-item">Privacy policy</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className='HEADER_searchnprofile'>
          {/* <div className="HEADER_searchbutton">
            <div className="HEADER_searchbutton-label">Search...</div>
            <div className="HEADER_searchbutton-commant">⌘K</div>
            <div className="HEADER_searchbutton-small"><CiSearch /></div>
          </div> */}
          <div className="HEADER_notification-wrapper">
            <div className={`HEADE_notification-bell ${unseen > 0 && "unread"}`}>
              <div className="readCount">{unseen <= 8 ? "0"+unseen : "9+"}</div>
              <IoIosNotifications style={{fontSize: "3rem", color: "var(--text-color)"}} />
            </div>
          </div>
          <div className="HEADER_profile active">
            <div className="HEADER_profileavatar">
              <img src={user.profilePic} />
            </div>
            <div className="HEADER_profilename">{user.username}</div>
            <div className="HEADER_dropdown">
              <ul>
                <li>
                  <div className="HEADER_profiledropdown-icon" style={{background: "#A5B4FC"}}>
                    <RiProfileLine style={{color: "black"}} />
                  </div>
                  Profile
                </li>
                <li onClick={()=> theme == "light" ? setTheme("dark") : setTheme("light")}><div className="HEADER_profiledropdown-icon" style={{background: "rgb(94, 234, 212)"}}>
                    <MdLightMode style={{color: "black"}}  />
                  </div>
                  {theme == "light" ? "dark" : "light"} theme</li>
                <Link to="/settings">
                  <li>
                    <div className="HEADER_profiledropdown-icon" style={{background: "#F0ABFC"}}>
                      <IoSettings style={{color: "black"}}  />
                    </div>
                    settings
                  </li>
                </Link>
                <li onClick={async ()=> {
                  const fcmTokenData = {
                    userid: user._id,
                    fcmtoken: user.fcmtoken
                  };
                  await fetchApi(`/auth/deleteFcmToken`, 'PATCH', fcmTokenData, async (success, res)=>{
                      if(!success){
                        alert("Unable to logout")
                      }else{
                        dispatch(logout())
                      }
                  });
                }}><div className="HEADER_profiledropdown-icon" style={{background: "#FCA5A5"}}>
                    <CiCircleInfo style={{color: "black"}}  />
                  </div>
                  logout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header