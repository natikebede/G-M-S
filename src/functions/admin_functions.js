import api from "../Apis/api";
import { today } from "./counts_sales";
// get all cashier and admin 
export const  get_all_users=async()=>
{
    try {
        const response =await api.get("/Accounts/All");
        return (response.data);
    } catch (error) {
        alert( error);
    }
}

export const get_all_cashiers=async()=>{

    try {
        const response = await api.get("/Accounts/Get-all/cashiers")
        return(response.data.data);
    } catch (error) {
        console.log(error);
    }
}

export  const get_all_payment_details= async()=>{
    try {
        const response = await api.get("/Payments/Get-ALL/")
        return(response.data.data);
    } catch (error) {
        console.log(error)
    }

}

export const admin_get_payment_reports_filtered = async (filter_info)=>{
    const response =await api.post("/Payments/Get-ALL/filterd",{
        filter_info
    });
   
    if(response.data.status=="success"){
        return response.data.data
    }
    else{

        return null
    }
  }
  
  export const get_monthly_sales_admin=async(type)=>
  {
    var currentdate = new Date(); 
    const firtDateofMOnth=   currentdate.getFullYear() + "-"
    + (currentdate.getMonth()+1)  + "-" 
    + "01";
    const response= await api.get(`/Payments/monthly-sales/${today}/${type}/${firtDateofMOnth}`);

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

  export const get_number_of_employee=async()=>{

    const response= await api.get("/Employee/Get-ALL/Count");
    if (response.data.status=="success"){
           return response.data.data
            

    }
    else{
        alert("error while retriving data")
    }
  }
  export const get_all_employee=async()=>{
    const response= await api.get("/Employee/Get-ALL");
    if (response.data.status=="success"){
        return response.data.data
         

 }
 else{
     alert("error while retriving data")
 }


  }