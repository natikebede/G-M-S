import React ,{useEffect, useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Modals from '../components/Modals';
import moment from 'moment'
import { Checkphonenumber,  username_validation } from '../functions/BookingGenerator';

import api from '../Apis/api';
import { useSelector } from 'react-redux';
function Edit_user_modal({modal_status,Modal_toggle}) {
    const user=useSelector(state=>state.admin_reducer.selected_user);
  
console.log(user);
const [user_info, setInfo]= useState({
    fullname:"",
    username:"",
    phonenumber:"",
    password:"123456aaAA$",
    status:"Active",
    role:"Cashier",
    gender:"Female",
    sallery:"",
    email:"",
    created_date:"",
});
useEffect(()=>{
    if(user!==null)
    { 
        setsuccess(false);
        set_text("");
        setdialog(false);
      
    setInfo    ({
        fullname:user.fullname,
        username:user.username,
        phonenumber:user.contact_number,
        status:user.status,
        role:user.role,
        sallery:user.sallery,
        gender:user.gender,
        Created_date:moment(user.start_date).format('YYYY-MM-DD'),
        emp_id:user.emp_id,
        account_ird: user.account_id,
        email:user.email!==null? user.email :" "
    })
    }



},[user])
    const [success_dialog, setsuccess]=useState(false);
    const [error_dialog ,setdialog]= useState(false);
    const [Error_text,set_text]=useState("");
  
    const onHandelChange=(e)=>{
        setInfo( (prev)=>({
          ...prev,
          [e.target.name]:e.target.value
        }))
        if(e.target.name=="username")
        {
         
            
            username_validation(e.target.value).then((result)=>{
              setdialog(result);
              if(result==true)
              {
                set_text("username is already in use")
              }
            })
        }
       
      }
      const onSubmits= async(e)=>
  { e.preventDefault();
    if(Checkphonenumber(user_info.phonenumber))
    {
        try {
          const response= await api.put("/Accounts/Update",{
            info:user_info
          });
          console.log(response.data);
          if(response.data.status=="fail")
          {
            setdialog(true);
            setsuccess(false);
            set_text(response.data.error.detail)
          }
          else
          { setdialog(false);
            setsuccess(true);
            set_text(" User has been updated");
          

          }
          

        } catch (error) {
          alert(error)
        }


    } 
    else
    {
        setdialog(true);
        set_text("Phone number is not valid it should start with 9 and be 9 digit long")
    }
    


  }
    const toggle = () => Modal_toggle();
    if(user!==null)
 { 
    


    return (
    <div>
          <Modal isOpen={modal_status} size="xl" toggle={toggle} >
        <ModalHeader  className='modal_color' toggle={toggle}>cashier / Admin registration</ModalHeader>
        <ModalBody className='modal_color'>
          <form onSubmit={onSubmits}>
          <div className='container-fluid p-2'>
            <div className='row'>
              <div className='col-sm-12 col-md-4'>
                <img src='../Assets/bigpics.png' className='img-fluid img-round'/>
              </div>
              <div className='col-sm-12 col-md-8 bg-white p-3 rounded'>
              {error_dialog && <Modals type="error" text={Error_text}/>}
              { success_dialog && <Modals type="success" text={Error_text}/>}
              <div className="mb-3 mt-3">
              <label for="email" className="form-label">Full name:</label>
              <input type="Text" className="form-control" required value={user_info.fullname} onChange={onHandelChange} id="cashier_name" placeholder="Enter Full Name" name="fullname"/>
            </div>

            <div className="mb-3 mt-3">
              <label for="email" className="form-label">Phonenumber:</label>
              <div class="input-group">
                <span class="input-group-text fw-bold">+251</span>
              <input type="tel" className="form-control" required value={user_info.phonenumber}  onChange={onHandelChange} id="phonenumber" placeholder="" name="phonenumber"/>
              </div>
            </div>

            <div className="mb-3 mt-3">
              <label for="email" className="form-label">Email:</label>
              <div class="input-group">
                <span class="input-group-text fw-bold">@</span>
              <input type="email" className="form-control" required value={user_info.email}  onChange={onHandelChange} id="email" placeholder="Jhon@gmail.com" name="email"/>
              </div>
            </div>

            <div className="mb-3 mt-3">
              <label for="email" className="form-label">Username:</label>
              <input type="Text" className="form-control" disabled="true" required value={user_info.username} onChange={onHandelChange} id="username" placeholder="Enter Username" name="username"/>

       
            </div>
            <div className="row mb-3 mt-3">
              <div className="col">
              <label for="email" className="form-label">Gender:</label>
              <select className="form-select" required value={user_info.gender} onChange={onHandelChange} name='gender'>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="col">
              <label for="email"  className="form-label">Role:</label>
              <select className="form-select" required value={user_info.role}  onChange={onHandelChange} name='role'>
                  <option value="Cashier">Cashier</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="row mb-3 mt-3">
              <div className="col">
              <label for="email" className="form-label">Status:</label>
              <select className="form-select" required value={user_info.status} onChange={onHandelChange} name='status'>
                  <option value="Active">Active</option>
                  <option value="Deactivated">Deactivated</option>
                </select>
              </div>
              <div className="col">
              <label for="email" className="form-label">Created_date:</label>
              <input type="Text" className="form-control" disabled="true" required value={user_info.Created_date} onChange={onHandelChange} id="username" placeholder=" " name="created_date"/>

              </div>
              </div>
              <div className="mb-3 mt-3">
              <label for="email" className="form-label">sallery:</label>
              <input type="number" className="form-control" required value={user_info.sallery} onChange={onHandelChange} id="username" placeholder="Enter Username" name="sallery"/>

       
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
  )}
}

export default Edit_user_modal