import React, { useState } from 'react'
import { set_seat , book_seat} from '../store/Actions';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import { useSelector,useDispatch } from 'react-redux';
function Seatcontainer({index}) {
    // const [selected_seat ,set_Selected_seat] =useState([]);
    // const [reserved_seat,set_reserved_sear]= useState(Data_reserved_seat);
    // const selected_status=selected_seat.filter((seat)=> seat==index)
    const dispatch=useDispatch();
    const selected_seats= useSelector(state=>state.cashier_reducer.selected_seat);
    const reserved_Seats= useSelector(state=>state.cashier_reducer.reserved_seat);
    const Booked_Seats =useSelector(state=>state.cashier_reducer.Booked_seat);
 
    const reserved_status=reserved_Seats.includes(index);
    const Booked_status= Booked_Seats.includes(index);
    const selected_status=selected_seats.includes(index);
    const handelSelected=()=>
    {   

        if(!selected_status)
        { 
            dispatch(set_seat(index));
        }  
        else{
            
        }
      
    }
    const handel_deSelected=()=>
    {
        if(selected_status)
        { const deSelect=selected_seats.filter((seat)=> seat!==index)
            console.log(deSelect)
            dispatch(selected_seats(deSelect));
        }  

    }

   
        if (reserved_status)
        {
                return (
                    <div className='seat_position'>
                        <EventSeatIcon  className='Seat_icon_reserved'/>
                        <span>{index}</span>
                    </div>
                    
                );
        }
        else if( Booked_status)
        {
            return (
                <div className='seat_position'>
                    <EventSeatIcon  className='Seat_icon_booked'/>
                    <span>{index}</span>
                </div>
                
            );
        }

        else
        {
           
            if(selected_status)
            {
                return (
                    <div className='seat_position'>
                         <EventSeatIcon  className='Seat_icon_selected'/>
                         <span>{index}</span>
                    </div>
                   
                );
            }
            else
            {
                return (
                    <div className='seat_position'>
                        <EventSeatIcon onClick={()=>handelSelected()} className='Seat_icon'/>
                        <span>{index}</span>
                    </div>
                    
                );

            }
            
        }
}

export default Seatcontainer