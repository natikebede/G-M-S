import React from 'react'
import MUIDataTable from "mui-datatables";
import moment from 'moment'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import PaidIcon from '@mui/icons-material/Paid';
import Detail_Cards from './Detail_Cards';
import Modals from './Modals';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import PaymentsIcon from '@mui/icons-material/Payments';

import api from '../Apis/api';

function View_expense_report({results,refresh,setAlert ,settype,settext }) {
    var expense=0;
    var count=results.length;
    const nf = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'ETB',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      //c
      const handelDelete=async(id)=>{
        const response =await api.delete(`/Expense/Delete/${id}`);
        if(response.data.status=="success"&& response.data.result>=0){
            setAlert(true)
            settype("success")
            settext("Expense Deleted")
            refresh()
        }
        else{
            setAlert(true)
            settype("error")
            settext("Unable to delete Expense server error")
        }
            refresh()
      }
    
      const columns = [
       
        {label:"Description",name:"reason",
    options:{
        filter:false
    }},
        {label:"Catagory",name:"catagory"},
        {label:"Paid Date",name:"date",
        options:{
            customBodyRender:(value)=>(
                moment(value ).format('YYYY-MM-DD')
            ),
        filter:false }
    },
    {label:"Created Date",name:"created_date",
        options:{
            customBodyRender:(value)=>(
            value==null?<span className='w-100 text-center'>-</span>: moment(value ).format('YYYY-MM-DD')
            ),
        filter:false }
    },
        {label:"Type",name:"expense_type"},
      
        {label:"Amount",name:"amount",options:{
            customBodyRender:(value,tableMeta)=>{
                return(
                    <span className="bg-danger text-light p-2 rounded fw-bold">{nf.format(value)} </span>
                )
            }  ,filter:false
    } },
    
        
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
                    <DeleteSweepIcon  className='delete_icon ' onClick={()=>handelDelete(value)} />
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
        // sort:true,
        // filter:true,
        // Search:true,
        // download:true,
        selectableRowsHeader:false,
        selectableRows:false
      };
    if(  results!== undefined && results !== null && results.length !==0)
    { 
        results && results.map((data)=>{
            expense=expense+parseFloat(data.amount);})
      
return (
  <div>
      <MUIDataTable 
title={"Expense report"}
data={results}
columns={columns}
options={options}
/>

<div className='row mt-4'>
        <div className='col-sm-12 col-md-4 mx-auto' >
            <Detail_Cards title="Expense | ETB" value={nf.format(expense)} Icon={<PaymentsIcon className='text-danger' fontSize='large'/>}/>
        </div>
        <div className='col-sm-12 col-md-4 mx-auto' >
         <Detail_Cards title="Transactions" value={count} Icon={<StackedBarChartIcon className='text-primary' fontSize='large'/>}/>

        </div>

    </div>
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

export default View_expense_report