import React from 'react'
import $ from 'jquery';
import "../Cashier_page_css/view_membership_cashier.css"
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CachedIcon from '@mui/icons-material/Cached';
import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';
import Modals from './Modals';
import { deactivate_memebership, subDays } from '../functions/counts_sales';
import { set_selected_memeber } from '../store/Actions';

function View_Membership_table({result}) {
  const user= useSelector(state=>state.cashier_reducer.user);

  console.log(user);
    const dispatch= useDispatch();
    const navigate= useNavigate();
    $(document).ready(function(){
        $("#myInput").on("keyup", function() {
          var value = $(this).val().toLowerCase();
          $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });

      // button to handel renewal
      const handel_renewal= (membership_id)=>{
    const memeber= result.filter((memeber)=>{
        return memeber.membership_id==membership_id;
    })

        dispatch(set_selected_memeber(memeber[0]));
        if(user.role=="Cashier")
       { 
        navigate(`/Memebership/renewal/${memeber[0].fullname}/${memeber[0].membership_id}`)
        }  
        else
        {
          navigate(`/Admin/Memebership/renewal/${memeber[0].fullname}/${memeber[0].membership_id}`)
      
        }
  }



      if(  result!== undefined && result !== null && result.length !==0)
{
  return (
    <div className='table_format'>
        <input type="text" id="myInput"  className= "cv_searchbar rounded p-3" placeholder='Memeber name / phone / Membership-ID'/>
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
            if(days_left<=1)
            {
                deactivate_memebership(data.membership_id);
            }
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
        <td>{parseInt(days_left)}</td>
        <td><CachedIcon onClick ={()=>handel_renewal(data.membership_id)} className='print_icon'/> <DeleteIcon className='delete_icon'/></td>
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
        <input type="text" id="myInput"  className= "cv_searchbar rounded p-3"placeholder='passanger name / Destination / Booking ID'/>
                    
        <Modals type ="error" text="Sorry no Memberships where found"/>
   
    </div>
    )
}
}

export default View_Membership_table