import api from "../Apis/api";
var currentdate = new Date(); 
var today = currentdate.getFullYear() + "-"
+ (currentdate.getMonth()+1)  + "-" 
+ currentdate.getDate();

// var today = currentdate.getFullYear() + "-"
// + currentdate.getDate() + "-" 
// + (currentdate.getMonth()+1)  ;

// daily sales for cashier
export const get_today_sales_cashier=async(id)=>
  {
   
    const response= await api.get(`/get_all_sales_today/${id}/${today}`);
   
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


  // number of cashiers
  export const count_cashiers =async()=>{

    try {

    const response= await api.get("/cashier/count");

        return response.data.count
        
    } catch (error) {
        console.log(error)
    }



  }
  // number of drivers
  export const count_drivers=async()=>{

    try {

    const response= await api.get("/driver/count");

        return response.data.count
        
    } catch (error) {
        console.log(error)
    }



  }

// number of  bus
export const count_bus=async()=>{

    try {

    const response= await api.get("/Bus/count");

        return response.data.count
        
    } catch (error) {
        console.log(error)
    }



  }

  export const  getall_trips= async()=>
  {
      try {
        const response= await api.get("/trips/get_all_trips");
      return(response.data.data);
      } catch (error) {
        console.log(error);
      }
  }

  export const  get_all_buss= async()=>{
    try {
        const response= await api.get("/Bus/get_all_bus");

        return(response.data);

    } catch (error) {
        
    }
  }