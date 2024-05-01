import React from 'react'
import MUIDataTable from "mui-datatables";
import moment from 'moment'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import PaidIcon from '@mui/icons-material/Paid';
import Detail_Cards from './Detail_Cards';
import Modals from './Modals';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import PaymentsIcon from '@mui/icons-material/Payments';

function View_configuration({result}) {

    const nf = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'ETB',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    const columns = [
       
        {label:"Membership Type",name:"type_name",
    options:{
        filter:false
    }},
   
    {label:"Created Date",name:"created_date",
        options:{
            customBodyRender:(value)=>(
            value==null?<span className='w-100 text-center'>-</span>: moment(value ).format('YYYY-MM-DD')
            ),
        filter:false }
    },
        {label:"Descripition",name:"description",options:{
            filter:false
        }},
        {label:"Duration",name:"duration",options:{
            filter:false
        }},
    
        {label:"Benfits",name:"benefits",options:{
            filter:false
            }  
    },
    {label:"Price",name:"registration_fee",options:{
        customBodyRender:(value,tableMeta)=>{
            return(
                <span className="bg-success text-light p-2 rounded fw-bold">{nf.format(value)} </span>
            )
        }  ,filter:false
} },
{label:"Fee",name:"price",options:{
    customBodyRender:(value,tableMeta)=>{
        return(
            <span className="bg-success text-light p-2 rounded fw-bold">{nf.format(value)} </span>
        )
    }  ,filter:false
} },
    {label:"Status",name:"status",options:{
        filter:false
        }  
    },


        {label:"Action",name:"expense_id", options:{
                customBodyRender:(value)=>(
                    <DeleteSweepIcon  className='delete_icon '  />
                )
                ,filter:false 
        }},

    ];
    const options = {
        filterType: 'checkbox',
        pagination:true,
        rowsPerPage:5,
        rowsPerPageOptions:[5,10,15,20],
        rowHover:true,
        selectableRowsHeader:false,
        selectableRows:false
      };
    if(  result!== undefined && result !== null && result.length !==0)
    { 
    return (
    <div>
    <MUIDataTable 
title={"configuration report "}
data={result}
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
                  
      <Modals type ="error" text="No Expense found "/>
 
  </div>
  )
}
}

export default View_configuration