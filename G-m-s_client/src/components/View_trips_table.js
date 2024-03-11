import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import {  useNavigate } from 'react-router-dom';
import Modals from './Modals';
import $ from 'jquery';
import api from '../Apis/api';
function View_trips_table({results}) {
    $(document).ready(function(){
        $("#myInput").on("keyup", function() {
          var value = $(this).val().toLowerCase();
          $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });
    const cashier= useSelector(state=>state.cashier_reducer.user);
    const [success_dialog, setsuccess]=useState(false);
    const [error_dialog ,setdialog]= useState(false);
    const [Error_text,set_text]=useState("");
    const navigate=useNavigate();
const handelEdit=()=>{

}
const handelDelete=async(trip_id)=>{
    try {
    const response=await api.delete(`/Trips/${trip_id}`);
    if(response.data.status=="success" && response.data.result==1)
    {
        setdialog(false);
        setsuccess(true);
        set_text("Trip has been removed")
    }
    else
    {   setsuccess(false);
        setdialog(true);
        set_text(response.data.error.detail);
    }
        
    } catch (error) {
        alert(error)
    }

}

   useEffect(()=>{
    if(cashier==null)
    {
        navigate("/");
    }
   },[])



    return (
    <div>
              <div className='contianer-fluid p-1 my-3'>
                {error_dialog && <Modals type="error" text={Error_text}/>}
              { success_dialog && <Modals type="success" text={Error_text}/>}
                <div className='vt_searchbar_container'>
                    <input type="text" id="myInput"  className= "vt_searchbar" placeholder='Trip ID / Destination / Price'/>
                    <table className="table table-hover">
    <thead className="table-dark">
      <tr>
        <th>Bus_no</th>
        <th>start location</th>
        <th>Destination</th>
        <th>Price</th>
        <th>Leave_time</th>
        <th>Trip_time</th>
       {cashier?.role=="Admin"? (<th>Actions</th>):""}
      </tr>
    </thead>
    <tbody id="myTable">
        {
           results && results.map((data)=>{
                return(
        <tr key={data.trip_id}>
      
        <td>{data.bus_no}</td>  
        <td>{data.start_location}</td>
        <td>{data.destination}</td>
         <td>{data.price}</td>    
         <td>{data.leave_time}</td>    
         <td>{data.trip_time}</td>     
         {cashier?.role=="Admin"? ( <td><SaveAsIcon  className='print_icon ' onClick={()=>handelEdit(data.trip_id)} /> <DeleteIcon onClick={()=>handelDelete(data.trip_id)} className='delete_icon'/></td>):""}        
         </tr>
                )
            })
        }
      
      
    </tbody>
  </table>
                </div>


            </div>
    </div>
  )
    
}

export default View_trips_table