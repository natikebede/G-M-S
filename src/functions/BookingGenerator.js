import api from '../Apis/api';
import { set_user } from '../store/Actions';
import moment from 'moment';
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

//login authentication

export const Authverfication=async(dispatch,navigate)=>
{
  
  try {
    const response= await api.post("/",{
     token:localStorage.token
    })
    console.log(response);
   if(response.data.auth)
   {
    dispatch(set_user(response.data.user.user));
    if (response.data.user.user.role=="Cashier")
        { navigate("/dashbord");}
   else if(response.data.user.user.role=="Admin")
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
    const response= await api.get(`/Account/check/${username}`)
 
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

//convert to date
export const convert_to_date=(date1)=>{
  var currentdate =new Date (date1)
  const format="YYYY-MM-DD";
  const local="en-us";
  const date= moment(currentdate).format(format);
    return date;
 
}
//check if passwords match
export const check_password_match=(p1,p2)=>{

    if(p1==p2){
      return true;
    }
    else{
      return false;
    }
}
