import React, { useRef } from 'react'
import "./Checkoutpage.css"
import { useReactToPrint } from 'react-to-print';
import Ticketreceipt from '../components/Ticketreceipt';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { reset_state } from '../store/Actions';
function Checkoutpage() {
    const componentRef = useRef();
    const navigate=useNavigate();
    const dispatch= useDispatch();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      onAfterPrint:()=>{
       dispatch(reset_state());
       navigate("/dashbord");
    }
    });
    return (
      <div className='Checkout_page_container '>

            <button className='btn btn-success fw-bolder' onClick={handlePrint}> Print Ticket</button>
       
          <div ref={componentRef} className=' w-auto'>
        <Ticketreceipt/>
        </div>  
    
      </div>
    );
  };

export default Checkoutpage