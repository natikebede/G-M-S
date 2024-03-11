import React from 'react'
import $ from 'jquery';
import "../cashier_Pages/Viewreservations.css"
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../Apis/api';
import { setpassanger,set_booking_id,reset_state } from '../store/Actions';
import moment from "moment";
import PrintIcon from '@mui/icons-material/Print';
import DeleteIcon from '@mui/icons-material/Delete';
import Modals from './Modals';
function View_reservation_table({result}) {
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const setToReprint=async(reser_id)=>
 {
    const response= await api.get(`/get_a_reservation/${reser_id}`);
   const reservation=response.data.data[0];
   dispatch(reset_state());
   dispatch(set_booking_id(reservation.booking_id));
    dispatch(setpassanger({
        name:reservation.fullname,
        phonenumber:reservation.contact_number,
        pickup:reservation.pickup,
        seat:reservation.reser_seat,
        Destination:{
            start_location:reservation.start_location,
            destination:reservation.destination,
            leave_time:reservation.leave_time,
            trip_time:reservation.trip_time,
            price:reservation.price
        },
        travel_date:moment(reservation.travel_date).format('YYYY-MM-DD')
    }));
    console.log(passenger)
    navigate(`/Checkout/${reservation.booking_id}`)


 }
    const passenger=useSelector(state=>state.cashier_reducer.passenger);
    $(document).ready(function(){
        $("#myInput").on("keyup", function() {
          var value = $(this).val().toLowerCase();
          $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });
      if(  result!== undefined && result !== null && result.length !==0)
{
  return (
    <div>
        <input type="text" id="myInput"  className= "rv_searchbar" placeholder='passanger name / Destination / Booking ID'/>
                    <table className="table table-hover">
    <thead className="table-dark">
      <tr>
        
        <th>Name</th>
        <th>phone no</th>
        <th>From</th>
        <th>Destination</th>
        <th>seat</th>
        <th>travel_date</th>
        <th>Booking ID</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody id="myTable">
        {
           result && result.map((data)=>{
                return(
                    <tr key={data.reser_id}>
       
        <td>{data.fullname}</td>
        <td>{data.contact_number}</td>
        <td>{data.start_location}</td>
        <td>{data.destination}</td>
         <td>{data.reser_seat}</td>           
         <td>{moment(data.travel_date).format('YYYY-MM-DD')}</td>
        <td>{data.booking_id}</td>
        <td><PrintIcon  className='print_icon ' onClick={()=>setToReprint(data.reser_id)}/> <DeleteIcon className='delete_icon'/></td>
      </tr>
                )
            })
        }
      
      
    </tbody>
  </table>
    </div>
  )
}
else
{
    return (
        <div>
        <input type="text" id="myInput"  className= "rv_searchbar" placeholder='passanger name / Destination / Booking ID'/>
                    
        <Modals type ="error" text="Sorry no reservations where found"/>
   
    </div>
    )
}
}

export default View_reservation_table