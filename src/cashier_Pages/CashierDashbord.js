import React, { useEffect ,useState} from 'react'
import "../Cashier_page_css/CashierDashbord.css"
import PaidIcon from '@mui/icons-material/Paid';
import TitleHeader from '../components/TitleHeader';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useNavigate } from 'react-router-dom';
import { reset_state,set_user } from '../store/Actions';
import { useSelector,useDispatch } from 'react-redux';
import Detail_Cards from '../components/Detail_Cards';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import NearbyErrorIcon from '@mui/icons-material/NearbyError';
import { get_today_sales_cashier,get_all_memebership,subDays } from '../functions/counts_sales';
import View_Membership_table from '../components/View_Membership_table';
function CashierDashbord() {

  const [result,setResult]=useState(null);
  const [ todaySales,setTodaySell]=useState(0.00);
  const [renewed_today,set_renewed]=useState(0);
  const[joined_today,set_joined]=useState(0);
  const account=localStorage.getItem("g-m-s_account")||null
  const [user,setAccount]= useState(JSON.parse(account));
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
    get_today_sales_cashier(user.account_id,"Default").then((res)=>{
   
      setTodaySell(res.sum)
    })
    get_today_sales_cashier(user.account_id,"Renewal").then((res)=>{
      set_renewed(res.count)
    })
    get_today_sales_cashier(user.account_id,"registration").then((res)=>{
      set_joined(res.count)
    })
 
 
 }

  useEffect(()=>{
    const users= localStorage.getItem("g-m-s_account")
            if(user!=null)
            {
              dispatch(set_user(JSON.parse(users)));
              
              setAccount(JSON.parse(users))
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
            <Detail_Cards title=" Sales | ETB" value={todaySales+".00 Birr"} Icon={<PaidIcon className='text-success' fontSize='large'/>} time="Today"/>
        </div>
        <div className='col-sm-12 col-md mx-auto my-2' >
         <Detail_Cards title="Memeberships Renewed" value={renewed_today} Icon={<PublishedWithChangesIcon className='text-info' fontSize='large'/>} time="Today"/>

        </div>
        <div className='col-sm-12 col-md mx-auto my-2' >
         <Detail_Cards title="New Memembers" value={joined_today} Icon={<GroupAddIcon className='text-primary' fontSize='large'/>} time="Today"/>

        </div>
        <div className='col-sm-12 col-md mx-auto my-2' >
         <Detail_Cards title="Warning status" value={warning_count} Icon={<NearbyErrorIcon className='text-warning' fontSize='large'/>} time="10 Days"/>

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

export default CashierDashbord