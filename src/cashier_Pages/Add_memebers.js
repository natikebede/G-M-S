import React, { memo, useEffect, useState } from 'react'
import  "../Cashier_page_css/Add_memeber.css"
import TitleHeader from '../components/TitleHeader'
import AddBoxIcon from '@mui/icons-material/AddBox';
import Memberships from '../Dummydata/DummyData';
import moment from 'moment'
import { reset_state,set_user } from '../store/Actions';
import Modals from '../components/Modals';
import { Checkphonenumber, get_today_date} from '../functions/BookingGenerator';
import { useSelector ,useDispatch} from 'react-redux';
import api from '../Apis/api';
import { addDays } from '../functions/counts_sales';
import { useNavigate } from 'react-router-dom';

function Add_memebers() {
  const user=localStorage.getItem("g-m-s_account")||null
    const [account,setAccount]= useState(JSON.parse(user));
    const navigate = useNavigate();
    const dispatch= useDispatch();
    const [success_dialog, setsuccess]=useState(false);
    const [error_dialog ,setdialog]= useState(false);
    const [Error_text,set_text]=useState("");
    const[config_data,setConfig]=useState(null);
    const [config_list,setList]=useState(null);
    const [Membership_type,settype]=useState(null);
    const nf = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'ETB',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    useEffect(()=>{
      const users= localStorage.getItem("g-m-s_account")
              if(account!=null)
              {
                dispatch(set_user(JSON.parse(user)));
                
                setAccount(JSON.parse(user))
                get_membership_type();
                get_membership_config();
                if(account==null)
                {
                  navigate("/");
                }
              }
              },[])
      const[user_info,setInfo]=useState({
          fullname:"",
          phonenumber:"",
          age:"",
          weight:"",
          gender:"Male",
          Memembership:null,
          start_date:"",
          status:"Active",
          registration_date:get_today_date(),
          selected_memebership:null,
          month:null,
          selected_month:null,
          end_date:null,
          account_id:account?.account_id
          
  
      });
  
      const get_membership_config= async()=>{
        try {
            const response= await api.get("/Membership/Get-all");
            if(response.data.status=="success"){
                console.log(response.data);
                setConfig(response.data.data);
            }
            else{
                setdialog(true);
                setsuccess(false);
                set_text(response.data.Message);
            }
        } catch (error) {
            alert (error)
        }
      }
      const get_membership_type= async()=>{
        try {
            const response= await api.get("/Membership/Get-all-type");
            if(response.data.status=="success"){
              
                settype(response.data.data);
            }
            else{
                setdialog(true);
                setsuccess(false);
                set_text(response.data.Message);
            }
        } catch (error) {
            alert (error)
        }
      }
      
      const onhandelsubmit=async(e)=>{
        e.preventDefault();
        if(user_info.Memembership!==null && user_info.selected_month!==null)
          {
        if(Checkphonenumber(user_info.phonenumber))
        {  setdialog(false);
          const response= await api.post("/Membership/signup_member",
          {
            user:user_info
          })
          if (response.data.status=="success")
          {
            set_text("Memeber Has been registered");
            setsuccess(true);
            setdialog(false);
            setInfo(
             { fullname:"",
              phonenumber:"",
              age:"",
              weight:"",
              gender:"Male",
              Memembership:null,
              start_date:"",
              status:"Active",
              registration_date:get_today_date(),
              selected_memebership:null,
              month:null,
              selected_month:null,
              end_date:null,
              account_id:account?.account_id
            })
  
          }
          else{
            setdialog(true);
            set_text(response.data.Message);
          }
  
        } 
        else
        {
            setdialog(true);
            set_text("Phone number is not valid it should start with 9 and be 9 digit long");
        }  
      }
      else
      {
        setdialog(true);
            set_text("please select Memebership type and Duration")
     
      }
      }
      
      const set_selected=(name,value)=>
      {
          setInfo( (prev)=>({
              ...prev,selected_memebership:Membership_type.filter((memebership)=>memebership.type_id==value)
              ,[name]:value,
              selected_month:null,
              month:"Duration",
             
            }))
            const temp=config_data.filter((data)=>(data.type_id==value))
            console.log(temp);
            setList(temp);
      }
  //for handling change
      const onHandelChange=(e)=>{
  
          if([e.target.name]=="Memembership")
          {
              if(e.target.value=="Type")
              {   
                  setInfo( (prev)=>({
                      ...prev,Memembership:null,
                      selected_memebership:null,
                      month:"Duration",
                      selected_month:null,
                     
                    }))
                    setList(null);
                  
              }
              else
              {
                  set_selected(e.target.name,e.target.value);  
              }
                   
          }
          else if( [e.target.name]=="month")
          {
              if(e.target.value=="Duration")
              {
                  setInfo( (prev)=>({
                      ...prev,selected_month:null,
                      month:null,
                     
                    }))
              }
             else {
             const [temp]=config_list.filter((data)=>(data.config_id==e.target.value))
            
              setInfo( (prev)=>({
                  ...prev,selected_month:temp
                  ,end_date:moment(addDays(user_info.start_date,temp.duration)).format('YYYY-MM-DD'),
                  [e.target.name]:e.target.value
                
                 
                 
                }))
              
          }}
          else if([e.target.name]=="start_date"&& user_info.month!==null)
          {
            setInfo( (prev)=>({
              ...prev,
              end_date:moment(addDays(e.target.value,user_info.selected_month.duration)).format('YYYY-MM-DD'),
              [e.target.name]:e.target.value
            
             
             
            }))
          
  
          }
  
         else{
  
          setInfo( (prev)=>({
              ...prev,
              [e.target.name]:e.target.value
            }))
         }
          
      }
    return (
      <div>
          <div className='container-fluid p-4'>
          <div className='top_title_container row p-2'>
  
              <TitleHeader title="Add Memeber" icon={<AddBoxIcon/>}/>
          </div>
          <div className='container-fluid  p-4'>
              <div className='row default_color_container rounded p-3'>
                  <div className='col-sm-12 col-md-3 p-2 '>
                     <div className='row'>
                      <img src={`../Assets/${user_info.gender=="Female"?"female_avatar.png":"Avatar_male.jpg"}`} className='img-fluid rounded'/>
                      </div>
                    <div className='container-fluid'>
                    <div className='row p-1'>
                     <h5 className='text-center'>Descripition & Benefits</h5>
                     <ul class="list-group fw-bolder list-group-flush rounded default_color_container ">
                     <li class="list-group-item  list-group-item-info d-flex justify-content-between align-items-center">
                             {user_info.selected_month && user_info.selected_month.description}
                              <span class="badge default_color_container rounded-pill"></span>
                              </li>
                     <li class="list-group-item  list-group-item-info d-flex justify-content-between align-items-center">
                             {user_info.selected_month && user_info.selected_month.benefits}
                              <span class="badge default_color_container rounded-pill"></span>
                              </li>
               { user_info.selected_month &&(
  
                <div>
                  <h6 className='selection_details'>
                       Registration fee : <span> { user_info.selected_month && nf.format(user_info.selected_month.registration_fee)} </span>
                      </h6>
                      <h6 className='selection_details'>
                     Monthly : <span>  { user_info.selected_month && nf.format (user_info.selected_month.price) } </span> 
                      </h6>
                  <h6 className='selection_details'>
                     Total : <span>  { user_info.selected_month && nf.format(parseInt(user_info.selected_month.price)+user_info.selected_month.registration_fee)} </span> 
                      </h6>
                      <h6 className='selection_details'>
                        End date:  <span> { user_info.selected_month && user_info.end_date }</span>
                      </h6>
                      
                </div>
                          )}
                          
                      </ul>
                      </div>
                    </div>
                     
                  </div>
                  <div className='col-sm-12 col-md-9 p-4 bg-white rounded'>
                      <form  onSubmit={onhandelsubmit}>
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
               <div className="row mb-3 mt-3">
               <div className="col">
                <label for="email" className="form-label">Weight:</label>
                <input type="text" className="form-control" required value={user_info.weight} onChange={onHandelChange} id="phonenumber" placeholder="62.3Kg" name="weight"/>
              </div> 
              <div className="col">
                <label for="email" className="form-label">Gender:</label>
                <select className="form-select" required value={user_info.gender} onChange={onHandelChange} name='gender'>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
  
              
              </div>
              <div className="row mb-3 mt-3">
              <div className="col">
                <label for="email" className="form-label">Age:</label>
                <input type="number" className="form-control" required value={user_info.age} onChange={onHandelChange} id="phonenumber" placeholder="12" name="age" min={12} max={78}/>
                </div>
                <div className="col">
                <label for="email" className="form-label">Start date:</label>
                <input type="date" className="form-control" required value={user_info.start_date} onChange={onHandelChange} id="phonenumber"  name="start_date"/>
              </div>
  
               
              </div>
              <div className="row mb-3 mt-3">
              <div className="col">
                <label for="email" className="form-label">Memembership Type:</label>
                <select className="form-select" required value={user_info.Memembership} onChange={onHandelChange} placeholder ="Type"name='Memembership'>
                <option  >Type</option>
                    {
                Membership_type && Membership_type.map((memebership)=>{
                          return(
                              <option value={memebership.type_id}>{memebership.type_name}</option>
                          );
                      })
                    }
                    
                  </select>
                </div>
  
                <div className="col">
                <label for="email" className="form-label">Month:</label>
                <select className="form-select" required value={user_info.month} onChange={onHandelChange} name='month'>
                <option  >Duration</option>
                    {
                    config_list && config_list.map((data)=>{
                      return(
                          <option value={data.config_id} >{data.duration} Month</option>
                      )
                    }
                    )
                      }
                    
                    
                  </select>
                </div>
              </div>
              <div className='row mt-3'>
              <button type='submit' className='register' > Register</button>
              </div>
                      </form>
  
                  </div>      
  
              </div>
  
          </div>
      
          </div>
          
      </div>
    )
  }

export default Add_memebers