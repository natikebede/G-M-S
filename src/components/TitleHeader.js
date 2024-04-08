
import React, { useEffect } from 'react'
import "./TitleHeader.css"
import { useDispatch, useSelector } from 'react-redux'
import { reset_state } from '../store/Actions';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
import { useNavigate } from 'react-router-dom';
function TitleHeader({title,icon}) {
  const user= useSelector(state=>state.cashier_reducer.user);
  const dispatch= useDispatch();
  const navigate= useNavigate();
  useEffect(()=>{
   if(user==null||undefined)
   return  navigate("/");
  
  
  
  },[])
  const logout=()=>
  {
    localStorage.removeItem("token");
    dispatch(reset_state());
  navigate("/");

  }
  return (
    <div className='container title_container p-2 '>
        <div>
        <h4 className='header_title'>
        {icon}   {title}
        </h4>
        </div>
        
        <div>
        <h6>Welcome Back !</h6> 
              <h5>{user?.username} <SettingsPowerIcon className='sign_out'onClick={logout}/></h5>
        </div>
    </div>
  )
}

export default TitleHeader