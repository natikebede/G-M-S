import React,{useEffect, useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Modals from '../components/Modals';
import AddBoxIcon from '@mui/icons-material/AddBox';
import api from '../Apis/api';

import { get_all_buss } from '../functions/counts_sales';
import { check_trip } from '../functions/BookingGenerator';

function Add_Trip_modal({modal_status,Modal_toggle}) 
{
    const [success_dialog, setsuccess]=useState(false);
    const [trip,setTrip]=useState({
        Start_location:"",
        Destination:"",
        Price:"",
        Leave_time:"",
        Trip_time:"",
        bus:""

    });
    const [Bus,setBus]=useState();
    const [error_dialog ,setdialog]= useState(false);
    const [Error_text,set_text]=useState("");
    const toggle = () => Modal_toggle();
    const onHandelChange=(e)=>{
        setTrip((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
    const onSubmits= (e)=>{
            e.preventDefault();
        check_trip(trip).then(async(result)=>{
            if(result.status=="success")
            {
                if(result.data==true)
                {
                    try {
                        const response= await api.post("/Trips/Add_trip",{
                            trip
                          })
                          if(response.data.status=="success")
                          {
                            setdialog(false);
                            setsuccess(true);
                            set_text("Trip success full registerd");
                          setTrip  ({
                                Start_location:"",
                                Destination:"",
                                Price:"",
                                Leave_time:"",
                                Trip_time:"",
                                bus:""
                        
                            })


                          }
                          else
                          {
                            setsuccess(false);
                            setdialog(true);
                            set_text(response.data.error.detail)
                          }
                    } catch (error) {
                        alert (error);
                    }
                  

                }
                else{
                    setsuccess(false);
                    setdialog(true);
                    set_text(" this Trip already Exists !!!")
                }
            }
            else
            { setsuccess(false);
                setdialog(true);
                    set_text(result.error)
            }
        })

    }
    useEffect(()=>{
            get_all_buss().then((result)=>{
                if(result.status=="success")
                {
                    setBus(result.Bus);
                    
             }
             else{
                setdialog(true);
                set_text(result.error.detail);
             }
            })

          Bus && setTrip(
                (prev)=>({
                    ...prev,
                    bus:Bus[0]?.bus_id,
                }));
    },[])
  return (
    
    <div>
          <Modal isOpen={modal_status} size="xl" toggle={toggle} >
        <ModalHeader toggle={toggle}>Add a new Trip</ModalHeader>
        <ModalBody>
          <form onSubmit={onSubmits}>
          <div className='container-fluid p-2'>
            <div className='row'>
              <div className='col-sm-12 col-md-4'>
                <img src='../Assets/roadtrip.png' className='img-fluid'/>
              </div>
              <div className='col-sm-12 col-md-8'>
              {error_dialog && <Modals type="error" text={Error_text}/>}
              { success_dialog && <Modals type="success" text={Error_text}/>}
              <div className="mb-3 mt-3">
              <label for="email" className="form-label">Start Location:</label>
              <input type="Text" className="form-control" required value={trip.Start_location} onChange={onHandelChange} id="Start_location" placeholder="Enter Start Location" name="Start_location"/>
            </div>

            <div className="mb-3 mt-3">
              <label for="email" className="form-label">Destination:</label>
              <input type="Text" className="form-control" required value={trip.Destination} onChange={onHandelChange} id="Destination" placeholder="Enter Destination" name="Destination"/>
              
            </div>
            <div className="mb-3 mt-3">
              <label for="email" className="form-label">Price:</label>
              <input type="Text" className="form-control" required value={trip.Price} onChange={onHandelChange} id="Price" placeholder=" 500 Birr" name="Price"/>

       
            </div>
            <div className="mb-3 mt-3">
              <label for="email" className="form-label">Bus:</label>
              <select className="form-select" required value={trip.bus} onChange={onHandelChange} name='bus'>
               { Bus && Bus.map((bus)=>{
                    return (
                        <option value={bus.bus_id}>{bus.bus_no}</option>  
                    )
                 })}
                </select>
       
            </div>
            
            <div className="row mb-3 mt-3">
              <div className="col">
              <label for="email" className="form-label">Leave Time:</label>
              <input type="time"  className="form-control" value={trip.Leave_time} onChange={onHandelChange} name='Leave_time'/>
                  
              </div>
              <div className="col">
              <label for="email" className="form-label">Trip Time:</label>
              <input type="time" className="form-control" value={trip.Trip_time} onChange={onHandelChange} name='Trip_time'/>
                  
              </div>
            </div>
            <button type='submit' className='register' >
           <AddBoxIcon/> Add
          </button>
              
              </div>

            </div>
            
            </div> 
          
          </form>
        </ModalBody>
        <ModalFooter>
         
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        
        </ModalFooter>
        
      </Modal>

    </div>

  )
}

export default Add_Trip_modal