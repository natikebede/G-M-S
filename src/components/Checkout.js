import React, { useEffect } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EastIcon from '@mui/icons-material/East';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { PinDrop } from '@mui/icons-material';
import { CalendarMonth } from '@mui/icons-material';
import { PunchClockSharp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import "./Checkout.css"

import { remove_passanger,Remove_booked_seat,set_booking_id,reset_state } from '../store/Actions';
import api from '../Apis/api';
function Checkout() {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const passengers=useSelector(state=>state.cashier_reducer.passenger);
    const travel_date=useSelector(state=>state.cashier_reducer.travel_date);
    const Booking_ID = useSelector(state=>state.cashier_reducer.BookingID)
     var subtotal=0;
    const removebooking= (id,seat)=>
    {
        
        dispatch( remove_passanger(id));
        dispatch(Remove_booked_seat(seat));
    }
    const emptybasket=()=>{
        dispatch(reset_state());
    }
    const submitbooking= async()=>
    {  try {
            const response= await api.post("/MakeTicket",{
                passengers:passengers,
                Booking_ID:Booking_ID
            });
            if(response.data==true)
            {
                navigate(`/Checkout/${Booking_ID}`)
            }
        } catch (error) {
            console.log(error)
        }
        


    }
   
    
  return (
    <div className=' p-2'>
         <div className='remove_button_container'><DeleteIcon onClick={emptybasket} /></div>  
     { 
       
        passengers.map((passenger)=>{
            console.log(passenger.price)
           subtotal=subtotal + parseInt(passenger.Destination.price);
            return(
           
                <div className='container-fluid p-2'>
                <div className='chekout_container'>
                 
                    <div className='remove_button_container'><RemoveCircleIcon onClick={()=>removebooking(passenger.id,passenger.seat)}></RemoveCircleIcon></div>
                    <div className='route_details'>
                    <h6><PinDrop/> {passenger.Destination?.start_location} <EastIcon/>  {passenger.Destination?.destination}</h6>
                    <h6> <CalendarMonth/> : {travel_date}</h6>  
                    <h5>Booking ID  <EastIcon/> {Booking_ID}</h5>
                     </div>
                   <div className='checkout_details_container'>
                        <h6> passanger name</h6>
                        <EastIcon/>
                        <h6> {passenger.name}</h6>
                    </div>
                    <div className='checkout_details_container'>
                        <h6> contact number</h6>
                        <EastIcon/>
                        <h6> {passenger.phonenumber}</h6>
                    </div>
                    <div className='checkout_details_container'>
                        <EventSeatIcon/>
                        <EastIcon/>
                        <h6> {passenger.seat}</h6>
                    </div>
                    <div className='checkout_details_container'>
                        <h6>pickup</h6>
                        <EastIcon/>
                        <h6> {passenger.pickup}</h6>
                    </div>
                    <div className='checkout_details_container'>
                        <AttachMoneyIcon/>
                        <EastIcon/>
                        <h6> {passenger.Destination.price} $</h6>
                    </div>


                </div>
                </div>
            );
        })
     }
    <div className='subtotal_container'>
        <div>
        <h6>Total Price</h6>
        <AttachMoneyIcon/>
        <h6>{subtotal}</h6>
        </div>
     <button className='Submit_booking_button' onClick={submitbooking}>Submit booking</button>
    </div>


    </div>
  )
}

export default Checkout