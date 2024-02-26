import React ,{useEffect, useState}from 'react'
import "./AdminDasbord.css"
import TitleHeader from '../components/TitleHeader'
import PaidIcon from '@mui/icons-material/Paid';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import Salescomponent from '../components/Dashbordcomponents/Salescomponent'
import AssessmentIcon from '@mui/icons-material/Assessment';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import Person2Icon from '@mui/icons-material/Person2';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { get_today_sales,get_mothly_sales,count_cashiers ,count_drivers, count_bus} from '../functions/counts_sales';
import Manage_cashier from './Manage_cashier';
function AdminDashbord() {
    const [gadget,setGadet]=useState({
        todays_sales:"0.00",
        todays_reservation:"0",
        monthly_sales:"0.00",
        monthly_reservations:"0",
        no_drivers:"0",
        no_cashiers:"0",
        no_bus:"0"

    })

  const user= useSelector(state=>state.cashier_reducer.user);
  const navigate= useNavigate();
    useEffect(()=>{

        if(user==undefined||user==null)
    {
        navigate("/");
    }
    else
    {
        get_mothly_sales().then((result)=>{
            setGadet((prev)=>({...prev,
                    monthly_sales:result.sum,
                    monthly_reservations:result.count
                
                }))

     });


     get_today_sales().then((result)=>{
        setGadet((prev)=>({...prev,
           todays_sales:result.sum,
           todays_reservation:result.count
        
        }))
    
    });
    count_cashiers().then((result)=>{
     
        setGadet((prev)=>({...prev,
            no_cashiers:result
        
        }))
    })

    count_drivers().then((result)=>{
        setGadet((prev)=>({...prev,
            no_drivers:result
        
        }))
    })

    count_bus().then((result)=>{
       
        setGadet((prev)=>({...prev,
            no_bus:result
        
        }))
    })



    }


    


    },[])

 
  return (
    <div className='conntainer-fluid p-4'>
        <div className='vt_title_container'>

        <TitleHeader title="Admin DashBord" icon={<AssessmentIcon/>}/>
        </div>
        <div className=' admin_top_component_containter mt-3'>
        <Salescomponent Title="This Month Sales" value={gadget.monthly_sales+".00"} extra="Birr" icon={<PaidIcon className='Money_icon '/>}/>
        <Salescomponent Title="Today's Sales" value={gadget.todays_sales+".00"} extra="Birr"  icon={<PaidIcon className='Money_icon'/>}/>
        
        <Salescomponent Title="This Month's Reservations" value={gadget.monthly_reservations} extra=""  icon={<EventSeatIcon className='reservation_icon'/>}/>
        <Salescomponent Title="Today's Reservations" value={gadget.todays_reservation} extra=""  icon={<EventSeatIcon className='reservation_icon'/>}/>
        <Salescomponent Title="Number of Cashiers" value={gadget.no_cashiers} extra=""  icon={<Person2Icon />}/>
        <Salescomponent Title="Number of Drivers" value={gadget.no_drivers} extra=""  icon={<PeopleAltIcon />}/>
        <Salescomponent Title="Number of Bus" value={gadget.no_bus} extra=""  icon={<DirectionsBusIcon />}/>

        </div>

      
    </div>
  )
}

export default AdminDashbord