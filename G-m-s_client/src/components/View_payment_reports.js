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
    var sales=0.0;
    var count=0;
    $(document).ready(function(){
        $("#myInput").on("keyup", function() {
          var value = $(this).val().toLowerCase();
          $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });
      console.log("the response",result);
   

      // button to handel renewal
      const handel_renewal= (membership_id)=>{
 }



      if(  result!== undefined && result !== null && result.length !==0)
{
  return (
    <div>
    <div className='table_format'>
        <input type="text" id="myInput"  className= "cv_searchbar rounded p-3" placeholder='Memeber name / phone / Membership-ID'/>
                    <table className="table table-hover">
    <thead className="table-dark">
      <tr>
        
        <th>Name</th>
        <th>phone no</th>
        <th>Membership type</th>
        <th>End Date</th>
        <th>payment Date</th>
        <th>payment Type</th>
        <th>Amount</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody id="myTable">
        {
         
           result && result.map((data)=>{
            sales=sales+parseFloat(data.amount);
            count =count+1;
                return(
                    <tr key={data.payment_id} >
       
        <td>{data.fullname}</td>
        <td>{data.contact_number}</td>
        <td>{data.memebership_type}</td>    
        <td>{moment(data.end_date).format('YYYY-MM-DD')}</td>
        <td>{moment(data.payment_date).format('YYYY-MM-DD')}</td>        
        <td>{data.payment_type}</td>
        <td>{data.amount}.00</td>
        <td><CachedIcon onClick ={()=>handel_renewal(data.membership_id)} className='print_icon'/> <DeleteIcon className='delete_icon'/></td>
      </tr>
                )
            })
        }
      
      
    </tbody>
  </table>
    </div>
    <div className='row'>
        <div className='col-sm-12 col-md-4 mx-auto' >
            <Detail_Cards title="Sales | ETB" value={sales+"Birr"} Icon={<PaidIcon className='text-success' fontSize='large'/>}/>
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
        <input type="text" id="myInput"  className= "cv_searchbar rounded p-3"placeholder='passanger name / Destination / Booking ID'/>
                    
        <Modals type ="error" text="Sorry no Payment reports where found"/>
        <div className='row'>
        <div className='col-sm-12 col-md-4 mx-auto' >
            <Detail_Cards title="Sales | ETB" value={sales} Icon={<PaidIcon className='text-success' fontSize='large'/>}/>
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