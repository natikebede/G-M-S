import * as acTypes from "./Actiontypes.js"

//Adding passanger
export const setpassanger= (passanger)=>{
   return { 
            type:acTypes.AddPassanger,
             payload:passanger
            }
}
//for setting destination
export const set_destination=(destination)=>
{
   return {
      type:acTypes.set_selected_destination,
      payload :destination
   }
}
//for settign user cashier 

export const set_user=(user)=>
{
   return {
      type:acTypes.set_user,
      payload:user
   }
}
//selecting a seat
export const set_seat=(selected_seat)=>
{ 
   return{
      type:acTypes.Set_selected_seat,
      payload:selected_seat
   }
}
 
//removing a passanger
export  const remove_passanger=(pass_id)=>
{
   return{
      type:acTypes.Remove_passanger,
      payload:pass_id
   }
}


//BOOking a Seat 

export const book_seat=(seat)=>
{ 
   return{
      type:acTypes.Book_seat,
      payload:seat

   }

}
export const Remove_booked_seat=(seat)=>
{
   return{
      type:acTypes.Remove_booked_seat,
      payload:seat
   }
}

export const set_booking_id=(booking_id)=>
{  
   
   return {
      type:acTypes.setBooking_id,
      payload:booking_id
   }
}

// FOR setting travel date
export const set_travel_date=(travel_date)=>
{
   return{
      type:acTypes.setTravel_date,
      payload:travel_date
   }
}
//for setting booked seats
export const set_reserved_seats=(booked_seats)=>{
   return {
      type:acTypes.set_reserved_seats,
      payload:booked_seats,
   }
}

// FOR RESETING STATE AFTER PRINTING 

export const reset_state=()=>
{
   return{type:acTypes.Reset_State}
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












// for setting admin user
