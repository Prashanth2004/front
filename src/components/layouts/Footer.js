import React from 'react'
import "../Footer.css"
const Footer = () => {
  return (
    // <div className='bg-dark text-light'>
    //   <h6 className='text-center'>All rights reserved</h6>
      
    // </div>
      <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p> This application helps to keep an accurate record of your money inflow and outflow</p>
        </div>
        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li>Mail Us on varshithpyla@gmail.com</li>
            <li>FAQ</li>
            <li>contact no 9876543210</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Connect With Us</h4>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Expense Tracker</p>
      </div>
    </footer>
  )
}

export default Footer
