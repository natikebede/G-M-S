import Memberships from "../Dummydata/DummyData.js"
import * as acTypes from "./Actiontypes.js"


//for settign user cashier 

export const set_user=(user)=>
{
   return {
      type:acTypes.set_user,
      payload:user
   }
}
//selecting a seat


// FOR RESETING STATE AFTER PRINTING 

export const reset_state=()=>
{
   return{type:acTypes.Reset_State}
}

// for setting selected memeber

export const set_selected_memeber=(memeber)=>{

   return{
      type:acTypes.set_selected_member,
      payload:memeber
   }
}






// *************************************************************************************************************************************

// FOR ADDING USERS TO STORE AND DATABASE

export const Add_user=(user_info)=>{

   return{
      type:acTypes.Add_user,
      payload:user_info
   }
}

export const Select_user=(user)=>{

   return{
      type:acTypes.set_selected_user,
      payload:user
   }
}

export const  select_employee=(user)=>{
   return{
      type:acTypes.set_selected_emp,
      payload:user
   }
}
export const  reset_selected_user=()=>{
   return{
      type:acTypes.reset_selected,
     
   }
}










// for setting admin user
