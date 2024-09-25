import React from 'react'
import { Link } from 'react-router-dom'
import "./style/socialIcons.css"
import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";

const SocialIcons = () => {
  return (
    <div className="FOOTER_social-icons-container">
        <div className="FOOTER_social-icons-decor"></div>
        <div className="FOOTER_social-icons">
            <Link to="facebook.com" className='FOOTER_social-icon'>
                <FaFacebookF style={{fontSize: "2.5rem", color: "var(--text-color)"}} />
            </Link>
            <Link to="instagram.com" className='FOOTER_social-icon'>
                <RiInstagramFill style={{fontSize: "2.5rem", color: "var(--text-color)"}} />
            </Link>
            <Link to="twitter.com" className='FOOTER_social-icon'>
                <FaTwitter style={{fontSize: "2.5rem", color: "var(--text-color)"}} />
            </Link>
            <Link to="youtube.com" className='FOOTER_social-icon'>
                <IoLogoYoutube style={{fontSize: "2.5rem", color: "var(--text-color)"}} />
            </Link>
        </div>
        <div className="FOOTER_social-icons-decor"></div>
    </div>
  )
}

export default SocialIcons