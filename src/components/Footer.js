import React from 'react'
import "./Footer.css"
function Footer() {
    const date= new Date()
    const year= date.getFullYear();
  return (
    <footer className='footer-background p-1'>
  
    <div className=" ">
      <div className="container p-0 rounded text-center">
        <p className="text-muted mb-0 pt-2  fw-bold">© {year} <h6 className=' fw-bold'>Cubeaddis Solutions All rights reserved</h6>.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer