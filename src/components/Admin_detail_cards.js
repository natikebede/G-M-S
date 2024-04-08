import React, { useState } from 'react'
import  "./Detail_card.css"
import ListIcon from '@mui/icons-material/List';

function Admin_detail_cards({title,Icon,today_value,montly_value,time}) {
   
   const [data,setData]=useState(today_value)
   const [times ,setTime]=useState(time);
   
   const hanel_selection=(value)=>{
        if(value== "month")
        {
          
            setData(montly_value);
            setTime("This Month")
            
        }
        else if ( value=="today")
        {
             
                setData(today_value);
                setTime(time)
        }       
   }
    return (
      <div className="card_container">

      <div className="card w-auto" >
          <div className="card-body  ">
          <div className="dropdown d-flex dropstart justify-content-end dropdown-zindex">
        <ListIcon className=" dropdown-toggle"  data-bs-toggle="dropdown"/>      
  <ul className="dropdown-menu">
    <li> <span className="dropdown-item"onClick={()=>hanel_selection("today")} >Today's</span></li>
    <li><span className="dropdown-item" onClick={()=>hanel_selection("month")}>This Month</span></li>
   
  </ul>
        </div>
              <div className='text_color'>
                  <h5 className=''>{title} </h5>
              </div>
              <div className='d-flex text_color justify-content-center mt-3'>
                  <h5 className=''> {Icon}</h5>
                  <h5 className='px-3 fw-bold'> | {data}</h5>
                 
              </div>
              <h6 className='text-secondary p-0 text-end'>{times}</h6>
          </div>
      </div>
      </div>
  
    )
}

export default Admin_detail_cards