import React, { useEffect, useState } from 'react'
import "./Viewtrips.css";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../components/TitleHeader';
import CommuteIcon from '@mui/icons-material/Commute';
import { getall_trips } from '../functions/counts_sales';
import api from '../Apis/api';
import View_trips_table from '../components/View_trips_table';
function Viewtrips() {
    const [results, setResult]= useState();
    const cashier= useSelector(state=>state.cashier_reducer.user)
    const navigate = useNavigate();
 
    useEffect(()=>{
        if(cashier==undefined||cashier==null)
    {
        navigate("/");
    }
    else{
        getall_trips().then((res)=>{
          setResult(res);
        });

    }



    },[])
  return (
    <div className='container-fluid p-2'>
        <div className='vt_title_container'>

                <TitleHeader title="View Trips" icon={<CommuteIcon/>}/>
        </div>
    <View_trips_table results={results}/>
    </div>

   
  )
}

export default Viewtrips