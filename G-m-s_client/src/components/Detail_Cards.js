import React from 'react'
import  "./Detail_card.css"
function Detail_Cards({title,Icon,value,time}) {
  return (
    <div className="card_container">
    <div className="card w-auto" >
        <div className="card-body ">
            <div className='text_color'>
                <h5 className=''>{title} </h5>
            </div>
            <div className='d-flex text_color justify-content-center mt-3'>
                <h5 className=''> {Icon}</h5>
                <h5 className='px-3 fw-bold'> | {value}</h5>
               
            </div>
            <h6 className='text-secondary p-0 text-end'>{time}</h6>
        </div>
    </div>
    </div>

  )
}

export default Detail_Cards