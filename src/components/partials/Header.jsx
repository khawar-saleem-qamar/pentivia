import React from 'react'
import '../styles/header.css'
import logo from "../../assets/images/pentivia.png";
import avatar from "../../assets/images/avatar.svg";

import { RiProfileLine } from "react-icons/ri";
import { MdLightMode } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { CiCircleInfo } from "react-icons/ci";




const Header = () => {
  return (
    <div className='HEADER_main-container'>
      <div className='HEADER_content max-container'>
        <div className='HEADER_logonlist'>
          <div className='HEADER_logo'>
            <img className='HEADER_logoimg' src={logo} />
          </div>
          <ul className='HEADER_list'>
            <li>typing</li>
            <li>games</li>
            <li>company
              <div className="HEADER_list-dropdown">
                <ul className='list-left'>
                  <li>
                    <a>
                      <div className="HEADER_listdropdown-icon" style={{background: "#A5B4FC"}}>
                        <RiProfileLine style={{color: "black"}} />
                      </div>
                      <div className="HEADER_listdropdown-cont">
                        <div className="HEADER_listdropdown-def">Usage</div>
                        <div className="HEADER_listdropdown-subtitle">Learn about using this typing website</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a>
                      <div className="HEADER_listdropdown-icon" style={{background: "rgb(94, 234, 212)"}}>
                        <MdLightMode style={{color: "black"}}  />
                      </div>
                      <div className="HEADER_listdropdown-cont">
                        <div className="HEADER_listdropdown-def">Testimonials</div>
                        <div className="HEADER_listdropdown-subtitle">Know what our users say about us and how we helped them</div>
                      </div>
                    </a>
                    </li>
                  <li>
                    <a>
                      <div className="HEADER_listdropdown-icon" style={{background: "#F0ABFC"}}>
                        <IoSettings style={{color: "black"}}  />
                      </div>
                      <div className="HEADER_listdropdown-cont">
                        <div className="HEADER_listdropdown-def">Features</div>
                        <div className="HEADER_listdropdown-subtitle">How will this webiste help you get better productivity with fun</div>
                      </div>
                    </a>
                    </li>
                  <li>
                    <a>
                      <div className="HEADER_listdropdown-icon" style={{background: "#FCA5A5"}}>
                        <CiCircleInfo style={{color: "black"}}  />
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
          <div className="HEADER_searchbutton">
            <div className="HEADER_searchbutton-label">Search...</div>
            <div className="HEADER_searchbutton-commant">⌘K</div>
          </div>
          <div className="HEADER_profile active">
            <div className="HEADER_profileavatar">
              <img src={avatar} />
            </div>
            <div className="HEADER_profilename">Username</div>
            <div className="HEADER_dropdown">
              <ul>
                <li>
                  <div className="HEADER_profiledropdown-icon" style={{background: "#A5B4FC"}}>
                    <RiProfileLine style={{color: "black"}} />
                  </div>
                  Profile
                </li>
                <li><div className="HEADER_profiledropdown-icon" style={{background: "rgb(94, 234, 212)"}}>
                    <MdLightMode style={{color: "black"}}  />
                  </div>
                  dark theme</li>
                <li><div className="HEADER_profiledropdown-icon" style={{background: "#F0ABFC"}}>
                    <IoSettings style={{color: "black"}}  />
                  </div>
                  settings</li>
                <li><div className="HEADER_profiledropdown-icon" style={{background: "#FCA5A5"}}>
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