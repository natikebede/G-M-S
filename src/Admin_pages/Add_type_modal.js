import React,{useEffect, useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import api from '../Apis/api';
import Modals from '../components/Modals';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { reset_state,set_user } from '../store/Actions';
import { get_today_date } from '../functions/BookingGenerator';

function Add_type_modal({add_modal,modal_open,setAlert,settext,settype}) {
    const dispatch= useDispatch();
    const navigate= useNavigate();

    const user=localStorage.getItem("g-m-s_account")||null
    const [account,setAccount]= useState(JSON.parse(user));  
    
    const [data,setData]=useState({
            membership_name:"",
            fee:"",
            created_date:get_today_date(),
            rules:"",
            benefits:"",
            status:"Active",
            account_id:account.account_id

    })
    const toggle = () =>modal_open();
    useEffect(()=>{
        const user=localStorage.getItem("g-m-s_account")
        if(user!=null)
        {
          dispatch(set_user(JSON.parse(user)));
          
          setAccount(JSON.parse(user))
          
                
         
        }
        else{
            navigate("/");
        }
        
        },[])
    
    const onHandelChange=(e)=>{
        setData( (prev)=>({
            ...prev,
            [e.target.name]:e.target.value
          }))

    }
    const onSubmits= async(e)=>{
        e.preventDefault();
        console.log(data);
        try {
            
            const response=await api.post("/Membership/Add-type",{
                data
            })
                if(response.data.status=="success"){
                     settext("New Membership type added")
                     setAlert(true);
                     settype("success")
                     toggle();
                }
                else{
                    settext(response.data.Message)
                     setAlert(true);
                     settype("error")
                }
        } catch (error) {
            alert(error)
        }
    }
  return (
    <div className='container-fluid '>
    <div className='row'>
      <div className='col-sm-12'>
      <Modal isOpen={add_modal} className='modal_color' size="xl" toggle={toggle} >
      <ModalHeader  className='modal_color' toggle={toggle}>Add New configuration</ModalHeader>
      <ModalBody className='modal_color'>
        <form onSubmit={onSubmits}>
        <div className='container-fluid p-2'>
          <div className='row'>
            <div className='col-sm-12 col-md-4'>
             <h4 className='w-100 text-center border rounded'>Details</h4>
             <ul>
                <li>Membership Name  : {data.membership_name}</li>
                <li>Registration fee   :  {data.fee}</li>
                <li>Created Date  : {data.created_date} </li>
                <li>Description and Rules  : {data.rules} </li>
                <li>Benefits : {data.benefits}</li>
             </ul>
            </div>
            <div className='col-sm-12 col-md-8 bg-white p-3 rounded'>
        
            <div className="mb-3 mt-3">
            <label for="email" className="form-label">Membership Name:</label>
            <input type="text" className="form-control" value={data.membership_name} required  onChange={onHandelChange} id="username"  name="membership_name"/>

     
          </div>

          <div className="row mb-3 mt-3">
            <div className="col-sm-12 col-md-12">
            <label for="email" className="form-label">Registration Fee:</label>
            <div class="input-group">
              <span class="input-group-text fw-bold">ETB</span>
            <input type="number" className="form-control fw-bold" required value={data.fee}  onChange={onHandelChange} id="number" placeholder="250" name="fee"/>
            </div>
            </div>
            <div className="col-sm-12 col-md">
           
            </div>
          </div>
          <div className="mb-3 mt-3">
            <label for="email" className="form-label">Rules and description:</label>
            <textarea cols="10" rows ="3" value={data.rules} className="form-control" onChange={onHandelChange} id="username"  name="rules"/>

     
          </div>
          <div className="mb-3 mt-3">
            <label for="email" className="form-label">Benefits:</label>
            <textarea cols="10" rows ="3" value={data.benefits} className="form-control" onChange={onHandelChange} id="username"  name="benefits"/>

     
          </div>
      
          
       
          <button type='submit' className='register' >
          Create
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

    </div>

  </div>
  )
}

export default Add_type_modal