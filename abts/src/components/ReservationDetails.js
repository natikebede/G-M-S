import React, { useEffect } from 'react'
import TitleHeader from './TitleHeader';
import "./ReservationDetails.css";
import { PinDrop } from '@mui/icons-material';
import { CalendarMonth } from '@mui/icons-material';
import { PunchClockSharp } from '@mui/icons-material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import ReservationFrom from './ReservationFrom';
import BusSeat from './BusSeat';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Checkout from './Checkout';
function ReservationDetails() {
    const navigate = useNavigate();
    const travel_date=useSelector(state=>state.cashier_reducer.travel_date);
    const cashier= useSelector(state=>state.cashier_reducer.user)
    const [Destination,setDestination]= useState(useSelector(state=>state.cashier_reducer.selected_destination));
     useEffect(()=>{
       
        if (Destination.length==undefined ||cashier==null)
    {
        navigate("/Makereservation");
    }
    else
    {
       
    }

    },[])
    
  return (
  
    < div className='container-fluid p-3'>
        <div className='rm_title_container'>
        <TitleHeader title="Personal details and Seating" />
        </div>
        <div className='layout'>
            <div className='layout_1'>
            <div className="details_container">
            <div className='bus_image_container'>
                <img src="../Assets/bus-png-40027.png" alt=""/>
            </div>
            <div className='bus_details_container'>
                <div className='journy_details'>
                    <div>
                    <PinDrop className='form_lable_icons'/><h6>From</h6>
                    </div>
                    <div>
         `              <h6>{Destination[0]?.start_location}</h6>
                    </div>
                    
                </div>
                <div className='journy_details'>
                <div>
                    <PinDrop className='form_lable_icons'/><h6> To</h6>
                    </div>
                    <div>
         `              <h6>{Destination[0]?.destination}</h6>
                    </div>
                    
                </div>
                <div className='journy_details'>
                    <div>
                    <DepartureBoardIcon className='form_lable_icons'/><h6>Journy time</h6>
                    </div>
                    <div>
                      <h6>{Destination[0]?.trip_time}</h6>
                    </div>
                    
                </div>
                <div className='journy_details'>
                    <div> <CalendarMonth className='form_lable_icons'/> <h6>Date</h6></div>
                    <div><h6>{travel_date}</h6></div>
                    
                </div>
                <div className='journy_details'>
                <div><PunchClockSharp className='form_lable_icons'/><h6>trip Start Time</h6></div>
                    <div>
                   <h6>{Destination[0]?.leave_time}</h6>
                    </div>
                   
                </div>
                <div className='journy_details'>
                    <div><AttachMoneyIcon className='form_lable_icons' /><h6>Price</h6></div>
                    <div><h6>{Destination[0]?.price}$</h6></div>
                  
                </div>

            </div>
        </div> 
        <div className='form_layout mt-3'>
            <div className='seat_container'><BusSeat trip_id={Destination[0]?.trip_id} travel_date={travel_date}/></div>
            <div className='reservationfrom_container'><ReservationFrom/></div>
            
        </div>


            </div>
            <div className='layout_2'>
                <div className='check_out_container'>
                    <Checkout/>
                </div>
            </div>

        </div>
       
        


    </div>

  )
}

export default ReservationDetails