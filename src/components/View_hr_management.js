
import React, { useEffect,useState } from 'react'
import MUIDataTable from "mui-datatables";
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
  const nf = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

  const handelDelete=()=>{}
  const columns = [
     
      {label:"Name",name:"fullname"},
      {label:"Phonenumber",name:"contact_number"},
      {label:"Gender",name:"gender"},
      {label:"Position",name:"position"},
      {label:"Start date",name:"start_date",
          options:{
              customBodyRender:(value)=>(
                  moment(value ).format('YYYY-MM-DD')
              ) }
      },
      {label:"Salary",name:"sallery",options:{
          customBodyRender:(value,tableMeta)=>{
              return(
                  <span className="bg-success text-light p-2 rounded fw-bold">{nf.format(value)} </span>
              )
          }  
  }},
  
      
      {label:"Bank Account",name:"bank_account",options:{
          customBodyRender:(value,tableMeta)=>{
              return(
                  <span className="fw-bold">{value} </span>
              )
          }  
  }
   },

  {label:"Status",name:"status" ,options:{
      customBodyRender:(value)=>(
          value=='Active'?
          <span className='bg-success  text-white p-2 rounded fw-bold'> Active </span>:
          <span className='bg-danger text-white p-2 rounded fw-bold'> Inactive </span>
          
      )
  }},
      {label:"Action",name:"emp_id", options:{
              customBodyRender:(value)=>(
                  <SaveAsIcon  className='print_icon ' onClick={()=>handelEdit(value)} />
              )
      }},

  ];
  const options = {
      filterType: 'checkbox',
      pagination:true,
      
      responsive:'stacked',
      rowsPerPage:5,
      rowsPerPageOptions:[5,10,15,20],
      rowHover:true,
      // sort:true,
      // filter:true,
      // Search:true,
      // download:true,
      selectableRowsHeader:false,
      selectableRows:false
    };
if(  results!== undefined && results !== null && results.length !==0)
    { 
      
return (
  <div>
      <MUIDataTable 
title={"Employee report"}
data={results}
columns={columns}
options={options}
/>

  </div>
  

)
}
else
{
  return (
      <div>
                  
      <Modals type ="error" text="No employees found "/>
 
  </div>
  )
}
}

export default View_hr_management