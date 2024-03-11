import api from '../Apis/api';
import { set_user } from '../store/Actions';
const generateBookingId = () => {
    let bookingId=null; 
      const timestamp = new Date().getMilliseconds();
      const randomNum = Math.floor(Math.random(timestamp) * 1000);
      const randomChars = generateRandomChars(4); // Adjust the number of characters as needed
      const id = `Bk-${timestamp}-${randomChars}-${randomNum}`;
  
      bookingId=id;
      return bookingId;
    };
  
    const generateRandomChars = (length) => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let result = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
      return result;
    };
  
  export const Checkphonenumber =(phoneNumber)=>{
    const phoneRegex = /^9\d{8}$/;
    return phoneRegex.test(phoneNumber);
  }
 

export default generateBookingId

export const Authverfication=async(dispatch,navigate)=>
{
  
  try {
    const response= await api.post("/",{
     token:localStorage.token
    })
    
   if(response.data.auth)
   {
    dispatch(set_user(response.data.user));
    if (response.data.user.role=="Cashier")
        { navigate("/dashbord");}
   else if(response.data.user.role=="Admin")
   {
          navigate("/Admin__dashbord");
   }

   }
   else
   {
      navigate("/");
   }
      
    
  } catch (error) {
    console.log(error);
    
  }

}

// username validation
export const username_validation=async(username)=>{

  try {
    const response= await api.get(`/cashier/check/${username}`)
 
    if(response.data.result!==0)
    {
      return true;
    }
    else
    {
      return false;
    }

  } catch (error) {
    
  }

}

// to get todays date
export const get_today_date =()=>{
  var currentdate = new Date(); 
  var datetime =currentdate.getFullYear() + "-"
  + (currentdate.getMonth()+1)  + "-" 
  + currentdate.getDate();
    return datetime;
 
}
// for checking if trip exists in the database

export const check_trip=async(trip)=>{
    try {
      const response= await api.post("/Trips/check_trip",{
        trip
      })
      if (response.data.status=="success")
      {
        if (response.data.result==0){
          return({
            status:"success",
            data:true

          });
        }
        else{
        return  ({
          status:"success",
            data:false
          });
        }

      }
      else{
         return({
          status:"fail",
          error:response.data.error.detail
         })

      }
   
    } catch (error) {
      console.log (error)
    }

}