import { alignProperty } from "@mui/material/styles/cssUtils";
import api from "../Apis/api";
import Memberships from "../Dummydata/DummyData";
var currentdate = new Date(); 
export var today = currentdate.getFullYear() + "-"
+ (currentdate.getMonth()+1)  + "-" 
+ currentdate.getDate();

export function addDays(date, Month) {
    var day= Month*30;
    var result = new Date(date);
    result.setDate(result.getDate() + day);
    return result;
  }

  export const subDays=(end_date)=>{
    let date1 = new Date(today);
    let date2 = new Date(end_date);
    let Difference_In_Time =
    date2.getTime() - date1.getTime();
 
    let Difference_In_Days =
    Math.round
        (Difference_In_Time / (1000 * 3600 * 24));

        return Difference_In_Days;
  }

  // get todays sales
export const get_today_sales_cashier=async(id,type)=>
  {
   
    const response= await api.get(`/Payments/today-sales/${id}/${today}/${type}`);

    if(response.data.data[0].sum!==null)
    {
        return response.data.data[0];
    }
    else{
        return{
            sum:0,
            count:response.data.data[0].count
        }
      
    }
  }
  
  // monthly sales for cashiers
 export const get_mothly_sales_cashier= async(id)=>
  {
    const firtDateofMOnth=   currentdate.getFullYear() + "-"
    + (currentdate.getMonth()+1)  + "-" 
    + "01";
  const response= await api.get(`/get_all_sales_thismonth/${id}/${today}/${firtDateofMOnth}`);
  
    console.log(response);
  if(response.data.data[0].sum!==null)
  { 
      return response.data.data[0];
  }
  else{
      return{
          sum:0,
          count:response.data.data[0].count
      }
    
  }


  }

 //total daily sales
  export const get_today_sales=async()=>
  {
   
    const response= await api.get(`/get_all_sales_today/${today}`);
   
    if(response.data.data[0].sum!==null)
    {
        return response.data.data[0];
    }
    else{
        return{
            sum:0,
            count:response.data.data[0].count
        }
      
    }
  }
  

  //total monthly sales
 export const get_mothly_sales= async()=>
  {
     const firtDateofMOnth=   currentdate.getFullYear() + "-"
     + (currentdate.getMonth()+1)  + "-" 
     + "01";
  const response= await api.get(`/get_all_sales_thismonth/${today}/${firtDateofMOnth}`);
  
    
  if(response.data.data[0].sum!==null)
  { 
      return response.data.data[0];
  }
  else{
      return{
          sum:0,
          count:response.data.data[0].count
      }
    
  }


  }


  // get all memeberships
  export const get_all_memebership =async()=>
  {
    const response = await api.get("/Memebership/Get-ALL")
            if (response.data.status=="success")
            {
                return response.data.data
            }
            else
            {
                return null;
            }

  }
  // get all memebership that end on specific date range
  export const get_all_memebership_between =async(date1,date2)=>
  {
    const response = await api.get(`/Memebership/Get-ALL-end/${date1}/${date2}`)
            if (response.data.status=="success")
            {
                return response.data.data
            }
            else
            {
                return null;
            }

  }

  //deactivate status of membership
  export const  deactivate_memebership=async(Membership_id)=>{
    const response = await api.put(`/Memebership/Deactivate`,{
        Membership_id
    })

  }


  // get all payments_reports for specfic cashier

  export const get_payment_reports_cashier = async (account_id)=>{
    const response =await api.get(`/Payments/Get-ALL/${account_id}`);
   
    if(response.data.status=="success"){
        return response.data.data
    }
    else{

        return null
    }
  }

  //generate report based on filter parametrs fro the cashier

  export const get_payment_reports_filtered = async (filter_info,account_id)=>{
    const response =await api.post(`/Payments/Get-ALL/filterd/${account_id}`,{
        filter_info
    });
   
    if(response.data.status=="success"){
        return response.data.data
    }
    else{

        return null
    }
  }