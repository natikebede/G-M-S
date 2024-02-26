import React from 'react'
import "../cashier_Pages/Checkoutpage.css"
import EastIcon from '@mui/icons-material/East';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import { PinDrop } from '@mui/icons-material';
import { CalendarMonth } from '@mui/icons-material';
import QRCode from "react-qr-code";
import { useSelector } from 'react-redux';
function Ticketreceipt() {
    const passenger=useSelector(state=>state.cashier_reducer.passenger);
    const Booking_ID = useSelector(state=>state.cashier_reducer.BookingID)
    console.log(passenger);
    var subtotal=0;
    return (
        
          <div className='recipet_container' >
              
              {
                passenger.map ((pass)=>{
                    subtotal=subtotal + parseInt(pass.Destination.price);
                    return(
                        <>
                        <div className='recipet_title'>
                  <h5>Abts Ethiopian Transport Service</h5>
                  <h6>Addis Ababa,Ethiopia </h6>
                    </div>
                      <div className='recipet_details_contianer'>
                      <div className='route_detail'>
                      <h6> <PinDrop/>  {pass.Destination?.start_location} <EastIcon/> {pass.Destination?.destination} </h6>
                      <h6> <CalendarMonth/> {pass.travel_date} ,{pass.Destination?.leave_time}</h6>  
                      <h6> <DepartureBoardIcon/>  {pass.Destination?.trip_time}</h6>  
                      <h5>  Booking ID  <EastIcon/> {Booking_ID}</h5>
                      </div>
                      <div className='booking_details'>
                          <h6> Passanger Name:</h6>
                          <EastIcon/>
                          <h6>{pass.name} </h6>
                      </div>
  
                      <div className='booking_details'>
                          <h6> Contact number:</h6>
                          <EastIcon/>
                          <h6> {pass.phonenumber}</h6>
                      </div>
                      <div className='booking_details'>
                          <EventSeatIcon/>
                          <EastIcon/>
                          <h6> {pass.seat}</h6>
                      </div>
                      <div className='booking_details'>
                          <h6>pickup</h6>
                          <EastIcon/>
                          <h6>{pass.pickup}</h6>
                      </div>
                      <div className='booking_details'>
                          <AttachMoneyIcon/>
                          <EastIcon/>
                          <h6> {pass.Destination.price}$</h6>
                      </div>
  
              </div>
              <div className='recipet_bottom'>
                  <div className='recipet_bottom_details'>
                      <h6>Payment Method:</h6>
                      <h6>Cash:</h6>
                  </div>
                  <div className='recipet_bottom_details'>
                      <h6>Payment Status:</h6>
                      <h6>Paid</h6>
                  </div>
                  <div className='recipet_bottom_details'>
                      <h6>total:</h6>
                      <h6>{pass.Destination.price}</h6>
                  </div>
                  <div class='qrcode_contianer'>
                  <QRCode size={150}  value= "Barcode" className='qrcode ' viewBox={`0 0 256 256`}/>
                  <hr />
                  </div>
              </div>

                        </>
                    )
                })
              }

          </div>
      
      );
  }

export default Ticketreceipt