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
function Test_Table({results}) {
    const navigate= useNavigate();
    const dispatch= useDispatch()
       //navigate to the edit page
   const handelEdit=(id)=>{
       
           
         }
    const nf = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'ETB',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

    const handelDelete=()=>{}
    const columns = [
       
        {label:"Description",name:"reason"},
        {label:"Catagory",name:"catagory"},
        {label:"Date",name:"date",
        options:{
            customBodyRender:(value)=>(
                moment(value ).format('YYYY-MM-DD')
            ) }
    },
        {label:"Type",name:"expense_type"},
      
        {label:"Amount",name:"amount",options:{
            customBodyRender:(value,tableMeta)=>{
                return(
                    <span className="bg-success text-light p-2 rounded fw-bold">{nf.format(value)} </span>
                )
            }  
    }},
    
        
        {label:"User",name:"username",options:{
            customBodyRender:(value,tableMeta)=>{
                return(
                    <span className="fw-bold">{value} </span>
                )
            }  
    }
     },


        {label:"Action",name:"expense_id", options:{
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

export default Test_Table
