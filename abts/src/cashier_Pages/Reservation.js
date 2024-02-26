import React, { useEffect, useState } from 'react';
import TitleHeader from '../components/TitleHeader';
import "./Reservation.css";
import { PinDrop } from '@mui/icons-material';
import { SearchRounded } from '@mui/icons-material';
import { CalendarMonth } from '@mui/icons-material';
import EastIcon from '@mui/icons-material/East';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import BusSearchList from '../components/BusSearchList';
import api from '../Apis/api';
import { useDispatch, useSelector } from 'react-redux';
import { set_travel_date } from '../store/Actions';
import { useNavigate } from 'react-router-dom';
import Modals from '../components/Modals';
import AddBoxIcon from '@mui/icons-material/AddBox';

function Reservation() {
    const [fromlocation ,SetFrom]=useState("");
    const [error_status,setError]=useState(false);
    const [Destination ,SetDestination]=useState("");
    const [DateofTravel ,SetDateofTravel]=useState(null);
    const [search_result,setResult]=useState();
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const cashier= useSelector(state=>state.cashier_reducer.user)
    useEffect(()=>{
        if(cashier==undefined || cashier==null)
        {
            navigate("/");
        }

    },[])
   
    const onSearch=async()=>
    {   
        if(DateofTravel!==null&& DateofTravel!== undefined)
        {
        try {
            const response= await api.post("/Searchbus",{
             fromlocation:fromlocation,
             Destination:Destination,
             DateofTravel:DateofTravel
            })
           
            setResult(response.data.data);
            dispatch(set_travel_date(DateofTravel));
        } catch (error) {
             console.log(error);
        }
        setError(false)
    }

    else 
    {
        setError(true);
    }

    }
    const onFromchange = (e)=>{
        SetFrom(e.target.value);
    }
    const ondestinationchange = (e)=>{
        SetDestination(e.target.value);
    }
    const ondatetravelchange = (e)=>{
        setError(false);
        SetDateofTravel(e.target.value);
    }
  return (
    
    <div className='container-fluid  p-3'>
        <div className='rm_title_container'>
            <TitleHeader title="Make a Reservation" icon={<AddBoxIcon/>}/>
        </div>
        <div className='container-fluid  p-3 mt-2'>
            <div className='search_container '>
                <div className='from_searchbar_container'>
                <label for="browser" className="form_label"> <PinDrop className='form_lable_icons'/> From:</label>
                    <select class="input_types" value= {fromlocation} onChange={onFromchange}>
                        <option value="Hawassa" selected>Hawassa</option>
                        <option value="Adama">Adama</option>
                        <option value="Bahirdar">Bahirdar</option>
                        <option value="Addis Ababa">Addis Ababa</option>
                        <option value="Arbaminch">Arbaminch</option>
                        </select>
                </div>
                <div className='to_searchbar_container'>
                
                <label for="browser" className="form_label"> <PinDrop className='form_lable_icons'/> To:  </label>
                <select class="input_types" onChange={ondestinationchange} value={Destination}>
                        <option value="Hawassa" selected>Hawassa</option>
                        <option value="Adama">Adama</option>
                        <option value="Bahirdar">Bahirdar</option>
                        <option value="Addis Ababa">Addis Ababa</option>
                        <option value="Arbaminch">Arba minch</option>
                        </select>
                </div>
                <div className='journy_date_container'>
                <label for="browser" className="form_label"><CalendarMonth className='form_lable_icons'/> Journy Date:  </label>
                <input type="Date" className='input_types' value={DateofTravel} onChange={ondatetravelchange}></input>
                </div>
                <div>
                <button className='search_button' onClick={onSearch}><SearchRounded/> Search for BUS</button>
                </div>
                
            </div>
            {error_status && <Modals type="error"  text="Please select date of travel "/>}
            <div className=' reservation_details'>
                
                <div>
                    <h5 className=''> {fromlocation}</h5>
                    <EastIcon/>
                    <h5 className=''> {Destination}</h5>
                    <DepartureBoardIcon/>
                    <h5 className=''> {DateofTravel}</h5>
                </div>
                
                
                
            </div>

        </div>
        <div className='container-fluid bg-white rounded  p-2 mt-4'>
            <BusSearchList search_data={search_result}/>
        </div>
    </div>
    
  )
}

export default Reservation