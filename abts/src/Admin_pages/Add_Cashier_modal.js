import React,{useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Checkphonenumber, get_today_date, username_validation } from '../functions/BookingGenerator';
import Modals from '../components/Modals';
import api from '../Apis/api';

function Add_Cashier_modal({modal_status,Modal_toggle}) {
   
    const [success_dialog, setsuccess]=useState(false);
    const [error_dialog ,setdialog]= useState(false);
    const [Error_text,set_text]=useState("");
    const [user_info, setInfo]= useState({
          fullname:"",
          username:"",
          phonenumber:"",
          password:"123456aaAA$",
          status:"Active",
          role:"Cashier",
          gender:"Female",
          date:get_today_date(),

    });
  const toggle = () => Modal_toggle();
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
          const response= await api.post("/cashier/Add/",{
            info:user_info
          });
          console.log(response.data);
          if(response.data.status=="fail")
          {
            setdialog(true);
            set_text(response.data.error.detail)
          }
          else
          {
            setsuccess(true);
            set_text(" User has been registerd");
            setInfo(
              {
                fullname:"",
                username:"",
                phonenumber:"",
                password:"123456aaAA$",
                status:"Active",
                role:"Cashier",
                gender:"Female",
                date:get_today_date(),}
            );

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
  return (
    <div>
          <Modal isOpen={modal_status} size="xl" toggle={toggle} >
        <ModalHeader toggle={toggle}>cashier / Admin registration</ModalHeader>
        <ModalBody>
          <form onSubmit={onSubmits}>
          <div className='container-fluid p-2'>
            <div className='row'>
              <div className='col-sm-12 col-md-4'>
                <img src='../Assets/bigpics.png' className='img-fluid'/>
              </div>
              <div className='col-sm-12 col-md-8'>
              {error_dialog && <Modals type="error" text={Error_text}/>}
              { success_dialog && <Modals type="success" text={Error_text}/>}
              <div className="mb-3 mt-3">
              <label for="email" className="form-label">Full name:</label>
              <input type="Text" className="form-control" required value={user_info.fullname} onChange={onHandelChange} id="fullname" placeholder="Enter Full Name" name="fullname"/>
            </div>

            <div className="mb-3 mt-3">
              <label for="email" className="form-label">Phonenumber:</label>
              <input type="Text" className="form-control" required value={user_info.phonenumber} onChange={onHandelChange} id="phonenumber" placeholder="+251" name="phonenumber"/>
              
            </div>
            <div className="mb-3 mt-3">
              <label for="email" className="form-label">Username:</label>
              <input type="Text" className="form-control" required value={user_info.username} onChange={onHandelChange} id="username" placeholder="Enter Username" name="username"/>

       
            </div>
            <div className="row mb-3 mt-3">
              <div className="col">
              <label for="email" className="form-label">Gender:</label>
              <select className="form-select" required value={user_info.gender} onChange={onHandelChange} name='gender'>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div className="col">
              <label for="email"  className="form-label">Role:</label>
              <select className="form-select" required value={user_info.role}  onChange={onHandelChange} name='role'>
                  <option>Cashier</option>
                  <option>Admin</option>
                </select>
              </div>
            </div>
            <button type='submit' className='register' >
            Register
          </button>
              
              </div>

            </div>
            
            </div> 
          
          </form>
        </ModalBody>
        <ModalFooter>
         
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        
        </ModalFooter>
        
      </Modal>

    </div>
  )
}

export default Add_Cashier_modal