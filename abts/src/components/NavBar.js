import React, { useState,useEffect } from 'react';
import "./Navbar.css";
import ListIcon from '@mui/icons-material/List';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { reset_state } from '../store/Actions';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
function NavBar({children,NavItem}) {
  const [isopen, Setopen]= useState(false);
  const user= useSelector(state=>state.cashier_reducer.user)


  
  const toggle=()=>
  {
    Setopen(!isopen);
    
  }
  return (
    <div className='app_contianer'>
        <div className='app_sidebar' style={{width:isopen? "230px":"50px"}}>
            <div className='top_section'>
                <div className='logo container' style={{display:isopen? "block":"none"}}>
                <img src='../Assets/Logo.png' className='sidebar_logo' alt=''/> 
                </div>
                <div style={{fontSize:isopen? "20px":"40px"}}>
                    <ListIcon onClick={toggle} className='bars'/>
                </div>
            </div>
          
            <div className='nav_section'>
               
            {
                NavItem.map((nav ,index)=>{
                    return(
                    <Link  key= {index} to={nav.path} className='nav_options'>
                
                    <div className='nav_icons'>
                        {nav.icon}
                    </div>
                    <div className='nav_options_text' style={{display:isopen? "block":"none"}}>
                        <h2> {nav.name} </h2>
                    </div>
                </Link> 

                    )
                })
            }
               
                
          
              
              
            </div>
        </div>
        <div className=' content-container' style={{width:isopen? "90%":"98%"}}>{children}</div>
    </div>
  )
}

export default NavBar