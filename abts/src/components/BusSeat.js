import React, { useEffect, useState } from 'react'
import "./busseat.css";
import TitleHeader from './TitleHeader';
import Seatcontainer from './Seatcontainers';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import { useDispatch ,useSelector} from 'react-redux';
import { set_reserved_seats } from '../store/Actions';
import api from '../Apis/api';
function BusSeat({travel_date,trip_id}) {
  const dispatch= useDispatch();
  const reserved_Seats= useSelector(state=>state.cashier_reducer.reserved_seat);
  const seats =[];
  const set_seats= async()=>
  {
    
      const response= await api.get(`/Get_all_seats/${trip_id}/${travel_date}`);
     
      if(response.data.seats.length!==0)
      {
        response.data.seats.map((seat)=>{
          seats.push(seat.reser_seat);
          
   
      });
      }
 
      dispatch(set_reserved_seats(seats))
   
  }
   useEffect(()=>{


    set_seats();

   },[])
        
        
    
  return (
    < div className='container-fluid p-3'>
    
        <div className='con'>

        <div className='bus_seat_container'>
        <table className=" ">
    <tbody>
      <tr>
        <td> <Seatcontainer index={1}/> </td>
        <td> <Seatcontainer index={2}/> </td>
        <td>  </td>
        <td> <Seatcontainer index={3}/> </td>  
        <td> <Seatcontainer index={4}/> </td>
      </tr>
      <tr>
        <td> <Seatcontainer index={5}/> </td>
        <td> <Seatcontainer index={6}/> </td>
        <td>  </td>
        <td> <Seatcontainer index={7}/> </td>  
        <td> <Seatcontainer index={8}/> </td>
      </tr>
      <tr>
        <td> <Seatcontainer index={9}/> </td>
        <td> <Seatcontainer index={10}/> </td>
        <td>  </td>
        <td> <Seatcontainer index={11}/> </td>  
        <td> <Seatcontainer index={12}/> </td>
      </tr>
      <tr>
        <td> <Seatcontainer index={13}/> </td>
        <td> <Seatcontainer index={14}/> </td>
        <td>  </td>
        <td> <Seatcontainer index={15}/> </td>  
        <td> <Seatcontainer index={16}/> </td>
      </tr>
      <tr>
        <td> <Seatcontainer index={17}/> </td>
        <td> <Seatcontainer index={18}/> </td>
        <td>  </td>
        <td> <Seatcontainer index={19}/> </td>  
        <td> <Seatcontainer index={20}/> </td>
      </tr>
      <tr>
        <td> <Seatcontainer index={21}/> </td>
        <td> <Seatcontainer index={22}/> </td>
        <td>  </td>
        <td> <Seatcontainer index={23}/> </td>  
        <td> <Seatcontainer index={24}/> </td>
      </tr>
      <tr>
        <td> <Seatcontainer index={25}/> </td>
        <td> <Seatcontainer index={26}/> </td>
        <td>  </td>
        <td> <Seatcontainer index={27}/> </td>  
        <td> <Seatcontainer index={28}/> </td>
      </tr>
      <tr>
        <td> <Seatcontainer index={29}/> </td>
        <td> <Seatcontainer index={30}/> </td>
        <td>  </td>
        <td>  </td>  
        <td>  </td>
      </tr>
      <tr>
         <td> <Seatcontainer index={31}/> </td>  
        <td> <Seatcontainer index={32}/> </td>
        <td>  </td>
        <td> <Seatcontainer index={33}/> </td>  
        <td> <Seatcontainer index={34}/> </td>
      </tr>
      <tr>
        <td> <Seatcontainer index={35}/> </td>
        <td> <Seatcontainer index={36}/> </td>
        <td>  </td>
        <td> <Seatcontainer index={37}/> </td>  
        <td> <Seatcontainer index={38}/> </td>
      </tr>
      <tr>
        <td> <Seatcontainer index={39}/> </td>
        <td> <Seatcontainer index={40}/> </td>
        <td>  </td>
        <td> <Seatcontainer index={41}/> </td>  
        <td> <Seatcontainer index={42}/> </td>
      </tr>
      <tr>
        <td> <Seatcontainer index={43}/> </td>
        <td> <Seatcontainer index={44}/> </td>
        <td>  </td>
        <td> <Seatcontainer index={45}/> </td>  
        <td> <Seatcontainer index={46}/> </td>
      </tr>
      <tr>
        <td> <Seatcontainer index={47}/> </td>
        <td> <Seatcontainer index={48}/> </td>
        <td>  </td>
        <td> <Seatcontainer index={49}/> </td>  
        <td> <Seatcontainer index={50}/> </td>
      </tr>
      <tr>
        <td> <Seatcontainer index={51}/> </td>
        <td> <Seatcontainer index={52}/> </td>
        <td> <Seatcontainer index={53}/> </td>  
        <td> <Seatcontainer index={54}/> </td>
        <td> <Seatcontainer index={55}/> </td>
      </tr>
     
      
    </tbody>
  </table>
        </div>
        </div>
    
    </div>
  )


    
}

export default BusSeat