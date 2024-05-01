
import React, { useEffect,useState } from 'react'
import "./TitleHeader.css"
import { useDispatch, useSelector } from 'react-redux'
import { reset_state,set_user } from '../store/Actions';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
import { useNavigate } from 'react-router-dom';

function TitleHeader({title,icon}) {
  const user=localStorage.getItem("g-m-s_account")||null
  const [account,setAccount]= useState(JSON.parse(user));  
  const dispatch= useDispatch();
  const navigate= useNavigate();
  useEffect(()=>{
    const user=localStorage.getItem("g-m-s_account")
    if(user!==null)
    {
      dispatch(set_user(JSON.parse(user)));
      
      setAccount(JSON.parse(user))
      
    }
    else{
        navigate("/");
    }
    
    },[])
  const logout=()=>
  {
    localStorage.removeItem("token");
    localStorage.removeItem("g-m-s_account");
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
              <h5>{account?.username} <SettingsPowerIcon className='sign_out'onClick={logout}/></h5>
        </div>
    </div>
  )
}

export default TitleHeader