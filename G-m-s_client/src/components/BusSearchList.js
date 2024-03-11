import React from 'react'
import "./BusSearchList.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { set_destination } from '../store/Actions';
function BusSearchList({search_data}) {
    
    const navigate= useNavigate();
    const dispatch= useDispatch()
    const Makereservation=(id)=>
    {  const destination = search_data.trip.filter(trip=>{
        return trip.trip_id==id
       
    })
        dispatch(set_destination(destination));
        navigate(`/Makereservation/${destination[0].trip_id}`)

    }

    if(  search_data !== null && search_data !== undefined && search_data.trip.length!==0  )
    {
  return (
    <div className='searchTable_container'>
         <table className="table   table-striped ">
                <thead className=''>
                <tr className='table-info text-center '>
                    <th>Image</th>
                    <th>BusName</th>
                    <th>Start location</th>
                    <th>Destination</th>
                    <th>leave time</th>
                    <th>Travel Period</th>
                    <th>Price</th>
                    <th>Seats Available</th>
                    <th>View</th>
                    
                </tr>
                </thead>
                <tbody>
                
                    {
                      search_data.trip.map((trip,index)=>{
                            return(
                                <tr  key ={index} onClick={()=>Makereservation(trip.trip_id)} style={{ cursor: "pointer"}}>
                                <td><img src="../Assets/bus-png-40027.png" style={{width:"70px"}} alt="bus"></img></td>
                                <td className='list_text_format'>{trip.bus_no}</td>
                                <td className='list_text_format'>{trip.start_location}</td>
                                <td className='list_text_format'>{trip.destination}</td>
                                <td className='list_text_format'>{trip.leave_time}</td>
                                <td className='list_text_format'>{trip.trip_time}</td>
                                <td className='list_text_format'>${trip.price} /seat</td>
                                <td className='list_text_format'>{trip.seats}/54</td>
                                <td><button className='reservation_btn '>Make reservation</button></td>
                                </tr>
                            )
                        })
                    }
                    
                
               
                </tbody>
        </table>

    </div>
  )
}
else {
    return(
        <div className='searchTable_container'>
         <table className="table   table-striped ">
                <thead className=''>
                <tr className='table-info text-center '>
                    <th>Image</th>
                    <th>BusName</th>
                    <th>Start location</th>
                    <th>Destination</th>
                    <th>leave time</th>
                    <th>Travel Period</th>
                    <th>Price</th>
                    <th>Seats Available</th>
                    <th>View</th>
                    
                </tr>
                </thead>
                <tbody>
                <tr className='w-100 bg-danger'>
                    <h5 className='bg-danger text-light p-2'>no results</h5>
                </tr>
                </tbody>
                </table>
                </div>
    )
}
}

export default BusSearchList