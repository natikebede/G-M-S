
import React ,{useEffect, useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Modals from '../components/Modals';
import {  useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { check_password_match } from '../functions/BookingGenerator';
import api from '../Apis/api';
function Password_change_modal({modal_status,Modal_toggle}) {
    const user= useSelector(state=>state.cashier_reducer.user);
    const [success_dialog, setsuccess]=useState(false);
    const [error_dialog ,setdialog]= useState(false);
    const [Error_text,set_text]=useState("");
    const navigate= useNavigate();
    const [user_info,setInfo]= useState({
        old_password:"",
        new_password:"",
        confirm_password:""
    })
    const[show,setShow]= useState({
        new_password:false,
        confirm_password:false,
        old_password:false,
    })

    // for handeling visiblity of password
    const show_old_password=()=>{
        setShow((pre)=>({
            ...pre,
            old_password:!pre.old_password
        }))
    }
    const show_new_password=()=>{
        setShow((pre)=>({
            ...pre,
            new_password:!pre.new_password
        }))
    }
    const show_confirm_password=()=>{
        setShow((pre)=>({
            ...pre,
            confirm_password:!pre.confirm_password
        }))
    }
    const toggle = () => Modal_toggle();
    //for handling change in password for input fields
   const onHandelChange=(e)=>{
    setInfo( (prev)=>({
        ...prev,
        [e.target.name]:e.target.value
      }))
    }
    const onSubmit=async(e)=>{
        e.preventDefault()
        if(check_password_match(user_info.old_password,user.password)){
            if(check_password_match(user_info.new_password,user_info.confirm_password))
            {
                try {
                    const response= await api.post("/Accounts/Change-password",{
                       user:user.account_id,
                        user_info
                    })

                    if (response.data.status=="success"){
                        setsuccess(true);
                        set_text("Password change successful")
                       
                            navigate("/");
                        
                    }
                    else{
                        setdialog(true);
                    set_text(response.data.error)
                    }
                } catch (error) {
                    alert(error)
                }
            }
            else{
                setdialog(true);
                set_text("Password don't match ")
            }
        }
        else{

        setdialog(true);
        set_text("Old password enterd is incorrect")
        }
    }
  return (
    <div className='container-fluid'>
                  <Modal isOpen={modal_status} size="xl" toggle={toggle} >
        <ModalHeader  className='modal_color' toggle={toggle}>Change Password</ModalHeader>
        <ModalBody className='modal_color'>
       
          <form onSubmit={onSubmit}>
          <div className='container-fluid p-2'>
            <div className='row'>
              <div className='col-sm-12 col-md-4'>
                <img src='../Assets/bigpics.png' className='img-fluid img-round'/>
              </div>
              <div className='col-sm-12 col-md-8 bg-white p-3 rounded'>
              {error_dialog && <Modals type="error" text={Error_text}/>}
              { success_dialog && <Modals type="success" text={Error_text}/>}

              <div className="mb-3 mt-3">
              <label for="email" className="form-label">Old Password:</label>
              <div class="input-group">
                <span class="input-group-text fw-bold">*</span>
                <input type={show.old_password?"text":"password"} className="form-control" required value={user_info.old_password} onChange={onHandelChange} id="cashier_name" placeholder="" name="old_password"/>
              <span class="input-group-text fw-bold" onClick={show_old_password}><VisibilityIcon/></span>
              </div>
            </div>


            <div className="mb-3 mt-3">
              <label for="email" className="form-label">New password:</label>
              <div class="input-group">
                <span class="input-group-text fw-bold">*</span>
              <input type={show.new_password?"text":"password"} className="form-control" required value={user_info.new_password}  onChange={onHandelChange} id="new_-password" placeholder="" name="new_password"/>
              <span class="input-group-text fw-bold" onClick={show_new_password}><VisibilityIcon/></span>
              </div>
            </div>

            <div className="mb-3 mt-3">
              <label for="email" className="form-label">Confirm password:</label>
              <div class="input-group">
                <span class="input-group-text fw-bold">*</span>
              <input type={show.confirm_password?"text":"password"} className="form-control" required value={user_info.confirm_password}  onChange={onHandelChange} id="confirm_password" placeholder="" name="confirm_password"/>
              <span class="input-group-text fw-bold" onClick={show_confirm_password}><VisibilityIcon/></span>
              </div>
            </div>

        
            <button type='submit'  className='register' >
           Update
          </button>
              
              </div>

            </div>
            
            </div> 
          
          </form>
        </ModalBody>
        <ModalFooter className='modal_color'>
         
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        
        </ModalFooter>
        
      </Modal>

    </div>
  )
}

export default Password_change_modal