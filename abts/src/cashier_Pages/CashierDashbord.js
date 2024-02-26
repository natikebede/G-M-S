import React, { useEffect ,useState} from 'react'
import "./CashierDashbord.css"
import PaidIcon from '@mui/icons-material/Paid';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import Salescomponent from '../components/Dashbordcomponents/Salescomponent'
import TitleHeader from '../components/TitleHeader';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { get_mothly_sales_cashier,get_today_sales_cashier } from '../functions/counts_sales';
import api from '../Apis/api';
import View_reservation_table from '../components/View_reservation_table';
function CashierDashbord() {

  const [result,setResult]=useState();
  const [ todaySales,setTodaySell]=useState(0.00);
  const [ todaysreservation, setReservation] =useState(0);
  const [ thisMonthSales,setThismonthsales]=useState(0.00);
  const [ thisMonthreservation, setThismonthreservation] = useState(0);
  const user= useSelector(state=>state.cashier_reducer.user);
  const navigate= useNavigate();

const get_all_reservation=async()=>
  {  
  const response= await api.get(`/get_Allreservation_limted/${user.cashier_id}`);
   setResult(response.data.data);

  }
  useEffect(()=>{
    if(user==undefined||user==null)
    {
        navigate("/");
    }
    else{
      
      get_mothly_sales_cashier(user.cashier_id).then((result)=>{
        setThismonthreservation(result.count);
    setThismonthsales(result.sum);
 });
 get_today_sales_cashier(user.cashier_id).then((result)=>{
  setTodaySell(result.sum);
setReservation(result.count);
});
   
        get_all_reservation();
       
  
    }
   
  },[])


  return (
    <div className='container-fluid p-4'>
      <div className='vt_title_container'>

        <TitleHeader title="DashBord" icon={<AssessmentIcon/>}/>
    </div>
        <div className=' top_component_containter mt-3'>
        <Salescomponent Title="This Month Sales" value={thisMonthSales+".00"} extra="Birr" icon={<PaidIcon className='Money_icon'/>}/>
        <Salescomponent Title="Today's Sales" value={todaySales+".00"} extra="Birr"  icon={<PaidIcon className='Money_icon'/>}/>
        
        <Salescomponent Title="This Month's Reservations" value={thisMonthreservation} extra=""  icon={<EventSeatIcon className='reservation_icon'/>}/>
        <Salescomponent Title="Today's Reservations" value={todaysreservation} extra=""  icon={<EventSeatIcon className='reservation_icon'/>}/>
        
        </div>

        <div className='recent_container'>
          <h6> Recent reservations</h6>
          <View_reservation_table result={result}/>
        </div>
    </div>
  )
}

export default CashierDashbord