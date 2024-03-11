import React, { useEffect, useState } from 'react'
import TitleHeader from '../components/TitleHeader'
import "./Viewreservations.css"
import api from '../Apis/api';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DvrIcon from '@mui/icons-material/Dvr';
import View_reservation_table from '../components/View_reservation_table';
function Viewreservations() {
    const [result,setResult]=useState();
    const cashier= useSelector(state=>state.cashier_reducer.user)
    const navigate= useNavigate();
 const get_all_reservation=async()=>
 {  
    const response= await api.get(`/getAllreservation/${cashier.cashier_id}`);
     setResult(response.data.data);
 
 }
 useEffect(()=>{
    if(cashier==undefined||cashier==null)
    {
        navigate("/");
    }
    else{
        get_all_reservation();

    }
   
 },[])

 




  return (
    <div className='container-fluid  p-3'>
            <div className="rv_title_container">
                <TitleHeader title="View-Reservations " icon={<DvrIcon/>}/>
            </div>
            <div className='contianer-fluid p-1 my-3'>
                <div className='rv_searchbar_container'>
                  <View_reservation_table result={result}/>
                </div>


            </div>
    </div>
  )
}

export default Viewreservations