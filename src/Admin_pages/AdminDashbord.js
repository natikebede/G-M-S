import React, { useEffect ,useState} from 'react'
import "../Cashier_page_css/CashierDashbord.css"
import PaidIcon from '@mui/icons-material/Paid';
import TitleHeader from '../components/TitleHeader';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { reset_state,set_user } from '../store/Actions';
import Admin_detail_cards from '../components/Admin_detail_cards';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import NearbyErrorIcon from '@mui/icons-material/NearbyError';
import { get_today_sales_cashier,get_all_memebership,subDays } from '../functions/counts_sales';
import View_Membership_table from '../components/View_Membership_table';
import { get_monthly_sales_admin } from '../functions/admin_functions';

function AdminDashbord() {
  const [result,setResult]=useState(null);
  const [gadget, setGadget]= useState({
    todaySales:0.00,
    renewed_today:0,
    joined_today:0,
    monthly_Sales:0.00,
    renewed_month:0,
    joined_month:0,
  })
  const nf = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ETB',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  const user=localStorage.getItem("g-m-s_account")||null
  const [account,setAccount]= useState(JSON.parse(user)); 
  const navigate= useNavigate();
  const dispatch= useDispatch();
  const set_membership=()=>{
    get_all_memebership().then((response)=>{

      setResult(response.filter((data)=>(subDays(data.end_date)<10)))
    })

  }


  const set_warning=()=>{
    var expire_count=0;

    get_all_memebership().then((response)=>{
      response.map((data)=>{
        const days_left=subDays(data.end_date);
    ;    if(days_left<10){
      
          expire_count=expire_count+1
          setWarning(expire_count);
          console.log(days_left);
        }
      })
      
      return expire_count
  })
  }
  const[warning_count,setWarning]=useState(set_warning())
 const set_detail_cards=()=>{
    get_today_sales_cashier(account.account_id,"Default",account.role).then((res)=>{
        setGadget((prev)=>(
          {
            ...prev,
            todaySales:res.sum
          }
        ))
    })
    get_today_sales_cashier(account.account_id,"Renewal",account.role).then((res)=>{
      setGadget((prev)=>(
        {
          ...prev,
          renewed_today:res.count
        }
      ))
    })
    get_today_sales_cashier(account.account_id,"registration",account.role).then((res)=>{
      setGadget((prev)=>(
        {
          ...prev,
          joined_today:res.count
        }
      ))
    })
 
    // for monthly   
    get_monthly_sales_admin("Default").then((res)=>{
      setGadget((prev)=>(
        {
          ...prev,
          monthly_Sales:res.sum
        }
      ))
  })
  get_monthly_sales_admin("Renewal").then((res)=>{
    setGadget((prev)=>(
      {
        ...prev,
        renewed_month:res.count
      }
    ))
  })
  get_monthly_sales_admin("registration").then((res)=>{
    setGadget((prev)=>(
      {
        ...prev,
        joined_month:res.count
      }
    ))
  })
 
 }
 useEffect(()=>{
  const user=localStorage.getItem("g-m-s_account")
  if(user!==null)
  {
    dispatch(set_user(JSON.parse(user)));
    
    setAccount(JSON.parse(user))
    if(account!==null)
    {
      set_detail_cards();
      set_membership ();
 
    }
  }
  else{
      navigate("/");
  }
  
  },[])



  return (
    <div className='container-fluid p-4'>
      <div className='top_title_container row p-2'>

        <TitleHeader title="DashBoard" icon={<AssessmentIcon/>}/>
    </div>
    <div className='row mt-4'>
        <div className='col-sm-12 col-md mx-auto my-2' >
            <Admin_detail_cards title=" Sales | ETB" today_value={nf.format(gadget.todaySales)} montly_value={nf.format(gadget.monthly_Sales)} Icon={<PaidIcon className='text-success' fontSize='large'/>} time="Today"/>
        </div>
        <div className='col-sm-12 col-md mx-auto my-2' >
         <Admin_detail_cards title="Memeberships Renewed"  today_value={gadget.renewed_today} montly_value={gadget.renewed_month} Icon={<PublishedWithChangesIcon className='text-info' fontSize='large'/>} time="Today"/>

        </div>
        <div className='col-sm-12 col-md mx-auto my-2' >
         <Admin_detail_cards title="New Memembers"  today_value={gadget.joined_today} montly_value={gadget.joined_month} Icon={<GroupAddIcon className='text-primary' fontSize='large'/>} time="Today"/>

        </div>
        <div className='col-sm-12 col-md mx-auto my-2' >
         <Admin_detail_cards title="Warning status" today_value={warning_count} montly_value={warning_count} Icon={<NearbyErrorIcon className='text-warning' fontSize='large'/>} time="10 Days"/>

        </div>

    </div>

    <div className='row mt-5 default_color_container rounded'>
      <div className='col-sm-12 p-3'>
        <h4 className='fw-bold'>Memeberships to Expire </h4>

      </div>
      <div className='col-sm-12 p-3 mt-1'>
       <View_Membership_table result={result}/>

      </div>
    </div>

        
    </div>
  )
}

export default AdminDashbord