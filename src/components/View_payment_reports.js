import MUIDataTable from "mui-datatables";
import React from 'react'
import $ from 'jquery';
import "../Cashier_page_css/view_membership_cashier.css"
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import CachedIcon from '@mui/icons-material/Cached';
import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';
import Modals from './Modals';
import PaidIcon from '@mui/icons-material/Paid';
import Detail_Cards from './Detail_Cards';
function View_payment_reports({result}) {
  var sales=0;
    var count=result.length;
    const nf = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'ETB',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

    // function that handel the renwal of the the memebership by navigating to the memebership page
    const handel_renewal= (membership_id)=>{
    }
    const columns = [
       
        {label:"Name",name:"fullname"},
        {label:"Phonenumber",name:"contact_number"},
        {label:"Membership type",name:"memebership_type"},
        {label:"End Date",name:"end_date",
            options:{
                customBodyRender:(value)=>(
                    moment(value ).format('YYYY-MM-DD')
                ) }
        },
        {label:"Paymnet Date",name:"payment_date",
            options:{
                customBodyRender:(value)=>(
                    moment(value ).format('YYYY-MM-DD')
                )
        }},
        
        {label:"Payment Type",name:"payment_type" ,options:{
            customBodyRender:(value)=>(
                value=='Renewal'?
                <span className='bg-info  text-white p-3 rounded fw-bold'> {value} </span>:
                <span className='bg-primary text-white p-3 rounded fw-bold'> {value} </span>
                
            )
        }},
        {label:"Amount",name:"amount",options:{
            customBodyRender:(value,tableMeta)=>{
                return(
                    <span className="bg-success text-light p-3 rounded fw-bold">{nf.format(value)} </span>
                )
            }
                
                
    }},

        {label:"Action",name:"payment_id", options:{
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
        result && result.map((data)=>{
            sales=sales+parseFloat(data.amount);})
  return (
    <div>
        <MUIDataTable 
  title={"payment report"}
  data={result}
  columns={columns}
  options={options}
/>
<div className='row mt-4'>
        <div className='col-sm-12 col-md-4 mx-auto' >
            <Detail_Cards title="Sales | ETB" value={nf.format(sales)} Icon={<PaidIcon className='text-success' fontSize='large'/>}/>
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
        <Modals type ="error" text="Sorry no Payment reports where found"/>
        <div className='row'>
        <div className='col-sm-12 col-md-4 mx-auto' >
            <Detail_Cards title="Sales | ETB" value={nf.format(sales)} Icon={<PaidIcon className='text-success' fontSize='large'/>}/>
        </div>
        <div className='col-sm-12 col-md-4 mx-auto' >
         <Detail_Cards title="Transactions" value={count} Icon={<StackedBarChartIcon className='text-primary' fontSize='large'/>}/>

        </div>
        </div>
   
    </div>
    )
}
}

export default View_payment_reports