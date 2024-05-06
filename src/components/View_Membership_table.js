import MUIDataTable from "mui-datatables";
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
  const dispatch= useDispatch();
  const navigate= useNavigate();

  // function that handel the renwal of the the memebership by navigating to the memebership page
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
  const columns = [
     
      {label:"Name",name:"fullname"},
      {label:"Phonenumber",name:"contact_number"},
      {label:"Gender",name:"gender"},
      {label:"Registration date",name:"registration_date",
       options:{
          customBodyRender:(value)=>(
              moment(value ).format('YYYY-MM-DD')
          )
  }},
      {label:"Membership type",name:"type_name"},
      {label:"Start date",name:"start_date",
      options:{
          customBodyRender:(value)=>(
              moment(value ).format('YYYY-MM-DD')
          )
  }},
      {label:"End Date",name:"end_date",
      options:{
          customBodyRender:(value)=>(
              moment(value ).format('YYYY-MM-DD')
          )
  }
},
      
      {label:"Status",name:"status" ,options:{
          customBodyRender:(value)=>(
              value=='Active'?
              <span className='bg-success  text-white p-3 rounded fw-bold'> Active </span>:
              <span className='bg-danger text-white p-3 rounded fw-bold'> Inactive </span>
              
          )
      }},
      {label:"Created by",name:"username"},
      {label:"Days Left",name:"end_date",options:{
          customBodyRender:(value,tableMeta)=>{
              const days_left=subDays(value);
              if(days_left<=1)
              {console.log(tableMeta);
                  deactivate_memebership(tableMeta.rowData[9]);
              }
              return(
                  <span className={days_left<=5?"bg-danger rounded text-white fw-bold p-3":" bg-primary fw-bold text-light rounded p-3"}>{days_left} </span>
              )
          }
              
              
  }},

      {label:"Action",name:"membership_id", options:{
              customBodyRender:(value)=>(
                  <CachedIcon onClick ={()=>handel_renewal(value)} className='print_icon'/>
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
  
      if(  result!== undefined && result !== null && result.length !==0)
{
  return (
    <MUIDataTable 
  title={"Member List"}
  data={result}
  columns={columns}
  options={options}
/>
  )
}
else
{
    return (
        <div>
        <input type="text" id="myInput"  className= "cv_searchbar rounded p-3"placeholder='Memmber Name / Phone / Member-ID'/>
                    
        <Modals type ="error" text="Sorry no Memberships where found"/>
   
    </div>
    )
}
}

export default View_Membership_table