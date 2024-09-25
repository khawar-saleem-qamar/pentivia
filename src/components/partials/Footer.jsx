import React from 'react'
import '../styles/footer.css'
import BlogInvitation from '../footer/BlogInvitation'
import SocialIcons from '../footer/SocialIcons'
import logo from "../../assets/images/pentivia.png"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='FOOTER_main-container'>
      <div className="FOOTER_body wrap-container">
        <BlogInvitation/>
        <SocialIcons />
        <div className="FOOTER_body-logo">
          <span className='FOOTER_logo'>
            <img src={logo} alt="logo" />
            Pentivia
          </span>
          <div className='FOOTER_logo-copyright'>Copyright © 2024 Pentivia, Inc.</div>
          <div className="FOOTER-links">
            <Link className="FOOTER-link">About Us</Link>
            <Link className="FOOTER-link">Privacy Policy</Link>
            <Link className="FOOTER-link">Terms and Conditions</Link>
            <Link className="FOOTER-link">Sitemap</Link>
            <Link className="FOOTER-link">Typing Games</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer