import React ,{useState,useEffect}from 'react'
import TitleHeader from '../components/TitleHeader'
import moment from 'moment'
import Modals from '../components/Modals';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import Memberships from '../Dummydata/DummyData';
import { Checkphonenumber, convert_to_date, get_today_date} from '../functions/BookingGenerator';
import { subDays,addDays } from '../functions/counts_sales';
import CachedIcon from '@mui/icons-material/Cached';
import api from '../Apis/api';
import { useNavigate } from 'react-router-dom';

function Test_new() {
  
    const Memeber= useSelector(state=>state.cashier_reducer.selected_memeber);
    const user=localStorage.getItem("g-m-s_account")||null
    const [account,setAccount]= useState(JSON.parse(user));
    const[user_info,setInfo]=useState(Memeber);
    const navigate= useNavigate();
    const[config_data,setConfig]=useState(null);
    const [config_list,setList]=useState(null);
    const [Membership_type,settype]=useState(null);  
    const [success_dialog, setsuccess]=useState(false);
    const [renewal_success_dialog, set_renewal_success]=useState(false);
    const [error_renewal_dialog ,set_renewal_dialog]= useState(false);
    const [error_dialog ,setdialog]= useState(false);
    const [Error_text,set_text]=useState("");
    const [edit_data,setData]=useState(true);
    const nf = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'ETB',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    const[selected_data,set_selected_data]=useState({
      selected_memebership:Membership_type && Membership_type.filter((memebership)=>memebership.type_id==Memeber?.type_id),
      Memembership:Memeber?.type_id,
      month:null,
      selected_month:config_data && config_data.filter((data)=>(data.config_id==Memeber?.config_id)),
      end_date:"",
      date:get_today_date(),
      start_date: subDays(Memeber?.end_date)<=1? convert_to_date(get_today_date()):moment(Memeber?.end_date).format('YYYY-MM-DD'),
   
     
    })
    
    useEffect(()=>{
   
        if(Memeber==null)
        {     
         
          if(account.role=="Cashier")
           { navigate("/view-memebership")}
          else if(account.role=="Admin")
         { navigate("/Admin/view-memebership")}
        }
        get_membership_type();
        get_membership_config();
      },[])

    const set_selected=(name,value)=>
    {
        set_selected_data( (prev)=>({
            ...prev,selected_memebership:Membership_type.filter((memebership)=>memebership.type_id==value)
            ,[name]:value,
            selected_month:null,
            month:"Duration",
           
          }))
          const temp=config_data.filter((data)=>(data.type_id==value))
          console.log(temp);
          setList(temp);
    }
    const onHandelChange_profile=(e)=>{

      setInfo( (prev)=>({
        ...prev, [e.target.name]:e.target.value
      
       
       
      }))
    }

    const get_membership_config= async()=>{
        try {
            const response= await api.get("/Membership/Get-all");
            if(response.data.status=="success"){
               const fecthed_data=response.data.data
               
               
                setConfig(response.data.data);
                setList(fecthed_data.filter((data)=>(data.type_id==Memeber.type_id)))
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
    //for handling change
    const update_profile=async(e)=>{
      e.preventDefault();
      if( Checkphonenumber(user_info.contact_number)){
        try {
          setdialog(false);
          const response= await api.put("/Memebership/Update-info",
          {
            user_info
          }
          )
          if(response.data.status=="success")
          {   setdialog(false);
              setsuccess(true);
              set_text("Memember info updated");
          }
          else{
            setdialog(true);
            set_text(response.data.error.detail);
          }
  
        } catch (error) {
          alert(error)
        }
      }
      else{
        setsuccess(false);
        setdialog(true);
          set_text("Phone number is not valid it should start with 9 and be 9 digit long");
  
      }
      

    }
    //handel changes in the renewal data
    const onHandelChange=(e)=>{
      if([e.target.name]=="Memembership")
      {
          if(e.target.value=="Type")
          {   
              set_selected_data( (prev)=>({
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
              set_selected_data( (prev)=>({
                  ...prev,selected_month:null,
                  month:null,
                 
                }))
                
          }
         else {
            const [temp]=config_list.filter((data)=>(data.config_id==e.target.value))
          set_selected_data( (prev)=>({
            ...prev,selected_month:temp
            ,end_date:moment(addDays(selected_data.start_date,temp.duration)).format('YYYY-MM-DD'),
            [e.target.name]:e.target.value     
                         
            }))
            console.log("here is temp ",temp)
          
      }}


    }
    //for handling Edit form 
    const handel_edit_button=(e)=>{
   
            setData(!edit_data);
    }
    //handel submit
    const onhandelsubmit=async(e)=>{
        e.preventDefault();
        console.log(selected_data);
        if(selected_data.Memembership!==null && selected_data.selected_month!=null)
        {
            try {
          const response= await api.put(`/Memebership/renewal/${user_info.membership_id}`,
          { 
            account,
            selected_data

          })
          if(response.data.status=="success")
          {
            set_renewal_dialog(false);
            set_renewal_success(true);
            
            set_text("Memebership renewed")
          }
          else if (response.data.status=="fail")
          {
            alert("here")
            set_renewal_success(false);
          set_renewal_dialog(true);
          set_text(response.data.message)
        

          }

        } catch (error) {
          alert(error);
        }
        }
        else
        {
        set_renewal_success(false);
          set_renewal_dialog(true);
          set_text("Please select a duration before requesting renewal")
        }
    }
  return (
  
    <div className='container-fluid p-4'>
    <div className='top_title_container row p-2'>

        <TitleHeader title="Renew Memebership" icon={<CachedIcon/>}/>
    </div>
    <div className='container-fluid  p-4'>
    <div className='row default_color_container rounded p-3'>

    <div className='col-sm-12 col-md-5 p-3 '>
    <div className='row p-1'>
                     <h5 className='text-center'>Descripition & Benefits</h5>
                     <ul class="list-group fw-bolder list-group-flush rounded default_color_container ">
                     <li class="list-group-item  list-group-item-info d-flex justify-content-between align-items-center">
                             {selected_data.selected_month && selected_data.selected_month.description}
                              <span class="badge default_color_container rounded-pill"></span>
                              </li>
                     <li class="list-group-item  list-group-item-info d-flex justify-content-between align-items-center">
                             {selected_data.selected_month && selected_data.selected_month.benefits}
                              <span class="badge default_color_container rounded-pill"></span>
                              </li>
               { selected_data.selected_month &&(
  
                <div>
            
                      <h6 className='selection_details'>
                     Monthly : <span>  { selected_data.selected_month && nf.format (selected_data.selected_month.price) } </span> 
                      </h6>
                  <h6 className='selection_details'>
                     Total : <span>  { selected_data.selected_month && nf.format(parseInt(selected_data.selected_month.price))} </span> 
                      </h6>
                      <h6 className='selection_details'>
                        End date:  <span> { selected_data.selected_month && selected_data.end_date }</span>
                      </h6>
                      
                </div>
                          )}
                          
                      </ul>
                      </div>
                    <hr/>

           <hr/>
                  <div className='col-sm-12 my-2'>
                  <form  onSubmit={onhandelsubmit}>
                  {error_renewal_dialog && <Modals type="error" text={Error_text}/>}
              { renewal_success_dialog && <Modals type="success" text={Error_text}/>}
            <div className="row mb-3 mt-3">
           
              <div className="col">

              <label for="email" className="form-label">Start date:</label>
              <input type="date" className="form-control" required value={selected_data.start_date} onChange={onHandelChange} id="phonenumber"  name="start_date"/>
             </div>

            </div>

            <div className="row mb-3 mt-3">
            <div className="col">
              <label for="email" className="form-label">Memembership Type:</label>
              <select className="form-select" required value={selected_data.Memembership} onChange={onHandelChange} placeholder ="Type"name='Memembership'>
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
              <select className="form-select" required value={selected_data.month} onChange={onHandelChange} name='month'>
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
            <button type='submit' className='register' > Renew </button>
            </div>
                    </form>

                  </div>
                  

        </div>


    <div className='col-sm-12 col-md-7 p-4 bg-white rounded'>
                    <form  onSubmit={update_profile}>
                    {error_dialog && <Modals type="error" text={Error_text}/>}
              { success_dialog && <Modals type="success" text={Error_text}/>}
              <div className=" d-flex justify-content-end mb-1 mt-1">
                <button type='button' className='btn btn-primary fw-bold' onClick={handel_edit_button}><EditIcon/>{edit_data?"Edit":"Lock"}</button>
              </div>
                    <div className="mb-3 mt-3">
              <label for="email" className="form-label">Full name:</label>
              <input disabled={edit_data}  type="Text" className="form-control" required value={user_info?.fullname} onChange={onHandelChange_profile} id="fullname" placeholder="Enter Full Name" name="fullname"/>
            </div>

            <div className="mb-3 mt-3">
              <label for="email" className="form-label">Phonenumber:</label>
              <div class="input-group">
                <span class="input-group-text fw-bold">+251</span>
              <input disabled={edit_data} type="tel" className="form-control" required value={user_info?.contact_number} onChange={onHandelChange_profile} id="phonenumber" placeholder="+251" name="contact_number"/>
              </div>
            </div>
             <div className="row mb-3 mt-3">
             <div className="col">
              <label for="email" className="form-label">Weight:</label>
              <input disabled={edit_data} type="text" className="form-control" required value={user_info?.weight} onChange={onHandelChange_profile} id="phonenumber" placeholder="62.3Kg" name="weight"/>
            </div> 
            <div className="col">
              <label for="email" className="form-label">Gender:</label>
              <select disabled={edit_data} className="form-select" required value={user_info?.gender} onChange={onHandelChange_profile} name='gender'>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

            
            </div>
            <div className="row mb-3 mt-3">
            <div className="col">
              <label for="email" className="form-label">Age:</label>
              <input disabled={edit_data} type="number" className="form-control" required value={user_info?.age} onChange={onHandelChange_profile} id="phonenumber" placeholder="12" name="age" min={12} max={78}/>
              </div>

              <div className="col">
              <label for="email" className="form-label">Status:</label>
              <select className="form-select" required value={user_info?.status} onChange={onHandelChange_profile} name='status'>
                  <option value="Active">Active</option>
                  <option value="Deactivated">Deactivated</option>
                </select>
              </div>
            </div>
            
            <div className='row mt-3'>
            <button type='submit'  disabled={edit_data} className='register' > update</button>
            </div>
                    </form>

                </div>  
    </div>

    </div>
    </div>
    )
}
export default Test_new