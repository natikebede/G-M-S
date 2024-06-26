import React, { useEffect, useState } from 'react'
import './Loginpage.css'
import api from './Apis/api';
import { useNavigate } from 'react-router-dom';
import { set_user, set_admin_user } from './store/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { Authverfication } from './functions/BookingGenerator';
import Modals from './components/Modals';
import Password_change_email_modal from './components/Password_change_email_modal';
import Password_change_modal from './components/Password_change_modal';


function Loginpage() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [error_text, settext] = useState('');
  const [error_type, settype] = useState('success');
  const [error_alert, setAlert] = useState(false);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [email, setEmail] = useState('');
  const [tokens,setToken]=useState(null)
  const dispatch= useDispatch();
  const navigate= useNavigate();
  
 useEffect(()=>{
  Authverfication(dispatch,navigate)


 },[])
 const Modal_toggle = () => {
  setModal(!modal);}


    const Modal_toggle2 = () => {
      setModal2(!modal2);}

  const handleLoginSubmit=async(e)=>
  {
    e.preventDefault();
    try {
      const response= await api.post("/Login",{
        username:username,
        password:password
      })
       const token = response.data.data.token
    
        if(response.data.result===1)
        {
          if(response.data.data.user.status=="Active")
          {
           
          if(response.data.data.user.role=="Cashier")
          {
            dispatch(set_user(response.data.data.user));
            setAlert(false);
            if(response.data.data.user.activation=="inactive")
            { 
              setToken(token);
              Modal_toggle2();
            }else
            {
              localStorage.setItem("token",token);
              navigate("/dashbord");
            }
            // navigate("/dashbord");
          }
          else if(response.data.data.user.role=="Admin")
          {
            dispatch(set_user(response.data.data.user));
            setAlert(false);
            if(response.data.data.user.activation=="inactive")
            {     setToken(token);
              Modal_toggle2();
              
            }else
            {
              localStorage.setItem("token",token);
              navigate("/Admin__dashbord");
            }
            // navigate("/Admin__dashbord");
          }
        }
        else
        {
         settype("error");
          setAlert(true);
          settext(" Your account has been suspended please contact you Manager!!!")

        }
         
        }
        else{
          settype("error");
          setAlert(true);
          settext(" Incorrect Username or Password !!!")
        }
      
    } catch (error) {
      
    }
    
  }
 

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/forgotPassword', {
        email: email,
      });
      if (response.data.success) {
        setModal(false);
         settype('success');
        setAlert(true);
        settext('Sent new temporary password to email. Please check your email!');
        setEmail('');
      } else {
        setModal(false);
        settype('error');
        setAlert(true);
        settext('Please try again.');
      }
    } catch (error) {
      setModal(false);
      settype('error');
      console.log('Error:', error);
      setAlert(true);
      settext('Failed to initiate password reset. Please try again.');
    }
  };

  return (
    <div>
        <div className='container contianer_height  rounded'>
            <div className='row h-100 pt-2'>
               
                <div className='col-sm-10 col-lg-5 mx-auto  mt-2 rounded color-contianer'>
                    <div className='top_image_container' >
                        <div className='img_container'>
                            <img src='../Assets/gym_logo_icon.png' className='logo' alt=''/> 
                        <div className='welcome_title'>
                            <h6 > Welcome Back !</h6>
                            <h4 >Please enter your details</h4>
                        </div>
                      </div>
                        
                    </div>
                  { error_alert && <Modals type ={error_type} text={error_text}/>}

                    <div>
                    <form   className='form_container' onSubmit={handleLoginSubmit}>
                        <div className="mb-4 mt-3">
                          <input type="username" required className="inputs" value={username} onChange={(e)=>{setusername(e.target.value)}} id="email" placeholder="Username" name="email"/>
                        </div>
                        <div className="mb-4">
                         
                          <input type="password" required className="inputs" value={password} onChange={(e)=>{setpassword(e.target.value)}}  id="pwd" placeholder="Password" name="pswd"/>
                        </div>
                        <div className="form-check check_container px-3  mb-3">
                          <label className="check_input_lable ">
                            <input className="form-check-input check_input " required type="checkbox" name="remember"/> Remember me for 30 days
                          </label>
                          <div>
                            <span onClick={Modal_toggle}> Forgot password ?</span>
                          </div>
                        </div>
                        <button type="submit" className=" Login_btn" >Log in</button>
                  </form>
                    
                  <Password_change_email_modal modal_status={modal} Modal_toggle={Modal_toggle} handleForgotPasswordSubmit={handleForgotPasswordSubmit} setEmail={setEmail} email={email} error_alert={error_alert} error_type={error_type} error_text={error_text}/>
                  <Password_change_modal modal_status ={modal2} Modal_toggle={Modal_toggle2} token={tokens}/>
                    </div>
                    
                </div>

            </div>
        </div>

   
     

    </div>
  )
}

export default Loginpage