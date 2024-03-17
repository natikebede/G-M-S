import React from 'react'
import $ from 'jquery';
import "../cashier_Pages/Viewreservations.css"
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../Apis/api';

import moment from "moment";
import PrintIcon from '@mui/icons-material/Print';
import DeleteIcon from '@mui/icons-material/Delete';
import Modals from './Modals';
import { subDays } from '../functions/counts_sales';
function View_Membership_table({result}) {
    const dispatch= useDispatch();
    const navigate= useNavigate();

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
        <input type="text" id="myInput"  className= "rv_searchbar rounded p-3" placeholder='Memeber name / phone / Membership-ID'/>
                    <table className="table table-hover">
    <thead className="table-dark">
      <tr>
        
        <th>Name</th>
        <th>phone no</th>
        <th>Gender</th>
        <th>registration date</th>
        <th>Membership type</th>
        <th>start_date</th>
        <th>End Date</th>
        <th>Status</th>
        <th>Days left</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody id="myTable">
        {
           result && result.map((data)=>{
            const days_left=subDays(data.end_date);
                return(
                    <tr key={data.membership_id} className={days_left<=5?"table-danger fw-bold":""}>
       
        <td>{data.fullname}</td>
        <td>{data.contact_number}</td>
        <td>{data.gender}</td>
        <td>{moment(data.registration_date).format('YYYY-MM-DD')}</td>
         <td>{data.memebership_type}</td>           
         <td>{moment(data.start_date).format('YYYY-MM-DD')}</td>
         <td>{moment(data.end_date).format('YYYY-MM-DD')}</td>
        <td>{data.status}</td>
        <td>{days_left}</td>
        <td> <DeleteIcon className='delete_icon'/></td>
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

export default View_Membership_table