import React,{useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Checkphonenumber, convert_to_date, get_today_date, username_validation } from '../functions/BookingGenerator';
import Modals from '../components/Modals';
import api from '../Apis/api';
import { useSelector } from 'react-redux'

function Add_Employe_Modal({modal_status,Modal_toggle}) {
    const [success_dialog, setsuccess]=useState(false);
    const [error_dialog ,setdialog]= useState(false);
    const [Error_text,set_text]=useState("");
    const account= useSelector(state=>state.cashier_reducer.user);
    const [user_info, setInfo]= useState({

        fullname:"",
        phonenumber:"",
        status:"Active",
        position:"Cashier",
        gender:"male",
        sallery:"",
        start_date:convert_to_date(get_today_date()),
        bank_account:"",
        created_by:account.account_id
       
    });
    const toggle = () => Modal_toggle();
    // for handeling submits to the server
    const onhandelSubmit=async(e)=>{
        e.preventDefault();
        if(Checkphonenumber(user_info.phonenumber))
    {   try {
              const response= await api.post("/Employee/Create-New",
              {
                user_info
               })

               if(response.data.status=="fail")
            {
            setdialog(true);
            setsuccess(false);
            set_text(response.data.error.detail)
            }
            else
            {
            setsuccess(true);
            setdialog(false);
            set_text(" Employee has been registerd");
            setInfo({
                fullname:"",
                phonenumber:"",
                status:"Active",
                position:"Cashier",
                gender:"male",
                sallery:"",
                start_date:convert_to_date(get_today_date()),
              
                bank_account:"",
                created_by:account.account_id
               
            })

            }
            } catch (error) {
                    alert(error)
            }
        
    }else
    {
        setdialog(true);
        setsuccess(false)
        set_text("Phone number is not valid it should start with 9 and be 9 digit long")
    }
    }
    //handel input field change
    const onHandelChange=(e)=>{

        setInfo( (prev)=>({
          ...prev,
          [e.target.name]:e.target.value
        }))
    }
  return (
    <div>
          <div className='container-fluid '>
      <div className='row'>
        <div className='col-sm-12'>
        <Modal isOpen={modal_status} className='modal_color' size="xl" toggle={toggle} >
        <ModalHeader  className='modal_color' toggle={toggle}>cashier / Admin registration</ModalHeader>
        <ModalBody className='modal_color'>
         
          <div className='container-fluid p-2'>
            <div className='row'>
              <div className='col-sm-12 col-md-3'>
                <img src='../Assets/bigpics.png' className='img-fluid'/>
              </div>
              <div className='col-sm-12 col-md-9 mx-auto bg-white rounded'>
                {error_dialog && <Modals type="error" text={Error_text}/>}
              { success_dialog && <Modals type="success" text={Error_text}/>}
            <form onSubmit={onhandelSubmit}>

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
            <div className="row mb-3 mt-3">
              <div className="col">
              <label for="email" className="form-label">Gender:</label>
              <select className="form-select" required value={user_info.gender} onChange={onHandelChange} name='gender'>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="col">
              <label for="email"  className="form-label">position:</label>
              <select className="form-select" required value={user_info.position}  onChange={onHandelChange} name='position'>
                  <option value="Cashier">Cashier</option>
                  <option value="Admin">Admin</option>
                  <option value="Cleaner">Cleaner</option>
                  <option value="Other">Other</option>
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
              <label for="email" className="form-label">Start date:</label>
              <input type="date" className="form-control" disabled="true" required value={user_info.start_date} onChange={onHandelChange} id="username" placeholder=" " name="start_date"/>

              </div>
              </div>
              <div className=" row mb-3 mt-3">
             <div className='col'>
             <label for="email" className="form-label">Sallery:</label>
              <input type="number" className="form-control" required value={user_info.sallery} onChange={onHandelChange} id="username"  name="sallery"/>

             </div>
             <div className='col'>
             <label for="email" className="form-label">Bank Account:</label>
             <input type="Text" className="form-control" required value={user_info.bank_account} onChange={onHandelChange} id="cashier_name" placeholder="Enter Bank account" name="bank_account"/>

             </div>
       
            </div>
            <div className='row px-5'>
            <button type='submit'  className='register  w-100 mx-auto' >
              Register
          </button>
            </div>
            
          </form>
              </div>

            </div>
            
            </div> 
        
        </ModalBody>
        <ModalFooter className='modal_color'>
         
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        
        </ModalFooter>
        
      </Modal>
        </div>

      </div>

    </div>
       
    </div>
  )
}

export default Add_Employe_Modal