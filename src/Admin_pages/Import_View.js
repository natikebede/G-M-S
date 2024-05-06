import MUIDataTable from "mui-datatables";
import React from 'react'
import $ from 'jquery';
import "../Cashier_page_css/view_membership_cashier.css"
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CachedIcon from '@mui/icons-material/Cached';
import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';
import { deactivate_memebership, subDays } from '../functions/counts_sales';
import { set_selected_memeber } from '../store/Actions';
import Modals from "../components/Modals";


function Import_View({result}) {
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
    data={result.filter((data,index)=>(index!==0))}
    columns={result[0]}
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
  


export default Import_View