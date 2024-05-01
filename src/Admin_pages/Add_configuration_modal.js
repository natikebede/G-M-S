import React,{useEffect, useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import api from '../Apis/api';
import Modals from '../components/Modals';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { reset_state,set_user } from '../store/Actions';
import Add_type_modal from './Add_type_modal';
import { get_today_date } from '../functions/BookingGenerator';
import { duration } from 'moment';
function Add_configuration_modal({modal_status,Modal_toggle}) {
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const [error_text, settext] = useState('');
    const[result,setResult]=useState(null)
    const [error_type, settype] = useState('success');
    const [error_alert, setAlert] = useState(false);
    const [add_modal, setmodal] = useState(false);
    const user=localStorage.getItem("g-m-s_account")||null
    const [account,setAccount]= useState(JSON.parse(user));  
    const toggle = () => Modal_toggle();
    const [data,setData]=useState({
        membership:null,
        price:"",
        created_date:get_today_date(),
        duration:"",
        status:"Active",
        account_id:account.account_id

})
    const modal_open=()=>
        {
            setmodal(!add_modal);
            get_data()
        }
    
        useEffect(()=>{
            const user=localStorage.getItem("g-m-s_account")
            if(user!=null)
            {
              dispatch(set_user(JSON.parse(user)));
              
              setAccount(JSON.parse(user))
              get_data();
                    
             
            }
            else{
                navigate("/");
            }
            
            },[])
    const get_data=async()=>{
        const response= await api.get("/Membership/Get-all-type");
        setResult(response.data.data);
    }
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
            
            const response=await api.post("/Membership/Add-configuration",{
                data
            })
                if(response.data.status=="success"){
                     settext("New configuration added")
                     setAlert(true);
                     settype("success")
                     setData({
                        membership:null,
                        price:"",
                        created_date:get_today_date(),
                        duration:"",
                        status:"Active",
                        account_id:account.account_id
                     })
                  
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
      <Modal isOpen={modal_status} className='modal_color' size="lg" toggle={toggle} >
      <ModalHeader  className='modal_color' toggle={toggle}>Add New configuration</ModalHeader>
      <ModalBody className='modal_color'>
        <form onSubmit={onSubmits}>
        <div className='container-fluid p-2'>
          <div className='row'>
            <div className='col-sm-12 col-md-4'>
             <h4 className='w-100 text-center border rounded'>Details</h4>
             <ul>
                <li>Membership Type  : {data.membership} </li>
                <li>Selected Month   : {data.duration==0? "1 Day":data.duration+" Month"}</li>
                <li>Price   :{data.price} </li>
              
                <li>Created Date  : {data.created_date} </li>
             </ul>
            </div>
            <div className='col-sm-12 col-md-8 bg-white p-3 rounded'>
            {error_alert && <Modals type={error_type} text={error_text}/>}
        
            <div className="row mb-3 mt-3">
            <div className="col-sm-12 col-md">
            <label for="email" className="form-label">Select Membership Type:</label>
            <select className="form-select" value={data.membership} required onChange={onHandelChange} name='membership'>
                <option value={null}></option>
                {
                    result&& result.map((data,index)=>{
                        return (
                            <option key={index} value={data.type_id}>{data.type_name}</option>
                        )
                    })
                }
              </select>
            </div>

            <div className="col-sm-12 col-md">
            <label for="email"  className="form-label w-100"></label>
                <button className='btn btn-primary fw-bold'onClick={modal_open}>Add new type</button>
            </div>
          </div>

          <div className="row mb-3 mt-3">
            <div className="col-sm-12 col-md">
            <label for="email" className="form-label">Price:</label>
            <div class="input-group">
              <span class="input-group-text fw-bold">ETB</span>
            <input type="number" className="form-control fw-bold" required value={data.price} onChange={onHandelChange} id="number" placeholder="2500" name="price"/>
            </div>
            </div>
            <div className="col-sm-12 col-md">
            <label for="email"  className="form-label">Duration:</label>
            <select className="form-select fw-bold" required value={data.duration}  onChange={onHandelChange} name='duration'>
                <option value={null}></option>
                <option value="0">Day pass</option>
                <option value="1">1 Month</option>
                <option value="3">3 Month</option>
                <option value="6">6 Month</option>
                <option value="12">12 Month</option>
              </select>
            </div>
          </div>
            
      
       
          <button type='submit' className='register' >
          Add
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
        <Add_type_modal add_modal={add_modal} modal_open={modal_open} setAlert={setAlert} settext={settext} settype={settype} />
  </div>
  )
}

export default Add_configuration_modal