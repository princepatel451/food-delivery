import React from 'react'
import { assets } from '../../assets/assets'
import './Footer.css'

const Footer = () => {
  return (
   <div className="footer" id="footer">
    <div className="footer-content">
        <div className="footer-content-left">
        <img src={assets.logo} alt="" />
        <p>Tomato provides a platform for users to find restaurants, access menus, read user reviews, check ratings, and view photos to make dining decisions.It supplies high-quality ingredients to restaurant partners to ensure better food quality.</p>
        <div className="footer-social-icon">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
        </div>
        </div>

        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>

        </div>

        <div className="footer-content-right">
        <h2>GET IN TOUCH</h2>
        <ul>
            <li>+91 6202765479</li>
            <li>contact@tomato.com</li>
        </ul>
        </div>
    </div>
    <hr/>
    <p className="footer-copyright">Copyright 2024 © Tomato.com - All Rights Reserved</p>
   </div>
  )
}

export default Footer