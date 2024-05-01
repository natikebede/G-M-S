import React, { useState, useEffect} from 'react'
import moment from 'moment';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import TitleHeader from '../components/TitleHeader';
import Modals from '../components/Modals';
import { useNavigate } from 'react-router-dom';
import { reset_state,set_user } from '../store/Actions';
import { useSelector,useDispatch } from 'react-redux';
import { Checkphonenumber } from '../functions/BookingGenerator';
import api from '../Apis/api';
function Edit_Employee() {
    const [success_dialog, setsuccess]=useState(false);
    const [error_dialog ,setdialog]= useState(false);
    const [Error_text,set_text]=useState("");
    const navigate= useNavigate();
    const user=useSelector(state=>state.admin_reducer.selected_emp);
    const user_account=localStorage.getItem("g-m-s_account")||null
    const [account,setAccount]= useState(JSON.parse(user_account));
    const [user_info, setInfo]=useState({
      
    fullname:"",
    phonenumber:"",
    status:"",
    position:"",
    gender:"Female",
    sallery:"",
    start_date:"",
    bank_account:""
 

    })
    //get user info
    useEffect(()=>{
        if(user!==null)
        { 
            setsuccess(false);
            set_text("");
            setdialog(false);
          
        setInfo    ({
            fullname:user.fullname,
            phonenumber:user.contact_number,
            status:user.status,
            position:user.position,
            sallery:user.sallery,
            gender:user.gender,
            start_date:moment(user.start_date).format('YYYY-MM-DD'),
            id:user.emp_id,
            bank_account:user.bank_account
        })
        }
        else{
          navigate("/Hr-Management")
        }
       
    
    
    
    },[user])
    // handel submit to update on server
        const onhandelSubmit=async(e)=>{
            
            e.preventDefault();
            if(Checkphonenumber(user_info.phonenumber))
        {
            try {
                const response = await api.post(`/Employe/Update-info/${user_info.id}`,{
                    user_info
                })
                if(response.data.status=='success')
                {
                setdialog(false);
                setsuccess(true);
                set_text(" User has been updated");
                }
                else{
                    setdialog(true);
                setsuccess(false);
                set_text(response.data.error.detail)
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

    //handel change function for the input fields
    const onHandelChange=(e)=>{
        setInfo( (prev)=>({
          ...prev,
          [e.target.name]:e.target.value
        }))
      }
      return (
    <div className='container-fluid p-4'>
         <div className='top_title_container row p-2'>
            <TitleHeader title="Edit Employee" icon={<SaveAsIcon/>}/>
        </div>

        <div className="row default_color_container rounded p-3 mt-4">
            {/* <div className='col-sm-12 col-md-3'>
            <div className='row'>
            <img src={`../Assets/${user_info.gender=="Female"?"female_avatar.png":"Avatar_male.jpg"}`} className='img-fluid rounded'/>
            <img src="bigpics.png" className='img-fluid img-round'/>
           
                        <img src={`../Assets/${user_info.gender=="Female"?"female_avatar.png":"Avatar_male.jpg"}`} className='img-fluid rounded'/>
            </div>
        </div> */}

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
              <input type="Text" className="form-control" disabled="true" required value={user_info.start_date} onChange={onHandelChange} id="username" placeholder=" " name="start_date"/>

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
           Update
          </button>
            </div>
            
          </form>
              </div>

            
          
          
        </div>
        </div>
   
  )
}

export default Edit_Employee