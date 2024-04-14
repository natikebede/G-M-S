
import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import {  useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import Modals from './Modals';
import $ from 'jquery';
import api from '../Apis/api';
import { select_employee } from '../store/Actions';
function View_hr_management({results}) {
 const navigate= useNavigate();
 const dispatch= useDispatch()
    //navigate to the edit page
const handelEdit=(id)=>{
    const [user]=results.filter((res)=>res.emp_id==id)
    dispatch(select_employee(user))
        navigate(`/Admin/Employe/Edit/${id}`)
        
      }


//search bar query
    $(document).ready(function(){
        $("#myInput").on("keyup", function() {
          var value = $(this).val().toLowerCase();
          $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });
      
      const handelDelete=()=>{}
      if(  results!== undefined && results !== null && results.length !==0)
      { return (
    <div>
             <div className='table_format'>
        <input type="text" id="myInput"  className= "cv_searchbar rounded p-3" placeholder='Employee name / phone / '/>
                    <table className="table table-hover">
    <thead className="table-dark">
      <tr>
        <th>Fullname</th>
        <th>Phonenumber</th>
        <th>Position</th>
        <th>Start_date</th>
        <th>Salary</th>
        <th>Bank Account</th>
        <th>Gender</th>
        <th>Status</th>
        <th>Action</th>
       {/* {cashier?.role=="Admin"? (<th>Actions</th>):""} */}
      </tr>
    </thead>
    <tbody id="myTable">
        
           {results.map((user)=>{

            return(
              <tr key={user.emp_id} className={user.status=="Active"? "fw-bold":"table-danger"}>
                <td>
                  {user.fullname}
                </td>
                <td>
                  {user.contact_number}
                </td>
               
                <td>
                  {user.position}
                </td>
                <td>
                  {moment(user.start_date ).format('YYYY-MM-DD')}
                </td>
                <td>
                  {user.sallery}
                </td>
                <td>
                  {user.bank_account}
                </td>
                <td>
                  {user.gender}
                </td>
                <td>
                  {user.status}
                </td>
                <td><SaveAsIcon  className='print_icon ' onClick={()=>handelEdit(user.emp_id)} /> <DeleteIcon className='delete_icon'/></td>
              </tr>
            )
  
          })
  
          }
        
      
      
    </tbody>
  </table>
                </div>


            </div>
  
  )
}
else{
    return (
        <div>
        <input type="text" id="myInput"  className= "cv_searchbar rounded p-3"placeholder='passanger name / Destination / Booking ID'/>
                    
        <Modals type ="error" text="No employees found "/>
   
    </div>
    )
}
}
export default View_hr_management