import React, { useState } from 'react'
import "./ReservationForm.css"
import Modals from './Modals.js';
import {book_seat, setpassanger} from "../store/Actions";
import { useDispatch, useSelector } from 'react-redux';
import { set_seat,set_booking_id } from '../store/Actions';
import generateBookingId from "../functions/BookingGenerator.js"
import { Checkphonenumber } from '../functions/BookingGenerator.js';
import { checkboxClasses } from '@mui/material';
function ReservationFrom() {
    const dispatch= useDispatch();
    const [error_status,setError]=useState(false);
    const[Pname ,SetPname]=useState("");
    const[Pnumber,SetPnumber]=useState("");
    const[Ppickup,SetPickup]=useState("");
    const Booking_ID = useSelector(state=>state.cashier_reducer.BookingID)
    const selected_seats= useSelector(state=>state.cashier_reducer.selected_seat);
    const passenger=useSelector(state=>state.cashier_reducer.passenger);
    const cashier= useSelector(state=>state.cashier_reducer.user)
    const travel_date=useSelector(state=>state.cashier_reducer.travel_date);
    const [Destination,setDestination]= useState(useSelector(state=>state.cashier_reducer.selected_destination));
    const getbookid=()=>
    {
       if(Booking_ID==null && Booking_ID== undefined){
       const BookingID=generateBookingId(); 
       dispatch(set_booking_id(BookingID));
       
    }

       
    }
    
    
    const handlesubmit=(e)=>{
    e.preventDefault();
    var currentdate = new Date(); 
    var datetime =currentdate.getFullYear() + "-"
    + (currentdate.getMonth()+1)  + "-" 
    + currentdate.getDate();
        if(Checkphonenumber(Pnumber))
        {
            dispatch(setpassanger({
                name:Pname,
                phonenumber:Pnumber,
                pickup:Ppickup,
                seat:selected_seats[0],
                id:passenger.length+1,
                Destination:Destination[0],
                reservation_date:datetime,
                cashier_id:cashier.cashier_id,
                travel_date:travel_date
            }));
            dispatch(set_seat([]));
            dispatch( book_seat(selected_seats[0]));
            SetPname("");
            SetPnumber("");
            SetPickup("");
            getbookid();
            setError(false);
        } 
        else
        {
            setError(true);
        }
  


    }
    
    const onNamechange=(e)=>
    {
            SetPname(e.target.value);
    }
    const onPnumberchange =(e)=>{
        SetPnumber(e.target.value);
    }
    const onPpickupchange =(e)=>{
        SetPickup(e.target.value); 
    }
  return (
    <div className=' form_contianer  rounded p-2'>
        {error_status && <Modals type="error" text=" Phone number is not valid it should start with 9 and be 9 digit long."/>}
        <form className='' onSubmit={handlesubmit}>
            <div className='mb-2 p-1'>
                <lable> Passenger Name:</lable>
                <input type="text" value={Pname} required onChange={onNamechange} className='reservation_form_inputs' placeholder='Passenger name'/>
            </div>
            <div className='mt-1 p-1'>
            <lable> Passenger Phonenumber:</lable>
                <input type="phonenumber" value={Pnumber} required onChange={onPnumberchange} className='reservation_form_inputs' placeholder='+251'/>
            </div>
            <div className='mt-1 mb-3 p-1'>
            <lable> Pick up:</lable>
                <input type="text" value={Ppickup} required onChange={onPpickupchange} className='reservation_form_inputs' placeholder='Location'/>
            </div>
            <div className='mt-1 mb-3 p-1'>
            <lable> Seat Number:</lable>
                <input type="number" value={selected_seats[0]}  required className='reservation_form_inputs' placeholder='seat'/>
            </div>
            <button className='book_button' type="submit" >Book</button>
        </form>

    </div>
  )
}

export default ReservationFrom