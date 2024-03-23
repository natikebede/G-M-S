
import React, { useEffect, useState } from 'react'
import TitleHeader from '../components/TitleHeader'
import "../Cashier_page_css/payment_report.css"
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import * as XLSX from 'xlsx'
import ImportExportIcon from '@mui/icons-material/ImportExport';
import Modals from '../components/Modals';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

import SimpleBackdrop from '../components/SimpleBackdrop';


function Payment_reports() {
    const [result,setResult]= useState(null);
    const [error_dialog ,setdialog]= useState(false);
    const [Error_text,set_text]=useState("");
        const[filter_info,setinfo]= useState({
            from_date:null,
            to_date:null,
            type:null,
        });

        const set_payment_table =()=>{
         
        }
        const handel_submit=(e)=>{
            e.preventDefault();
            
        };
        const handelrefresh=()=>{
            
        };
        const onhandelChange=(e)=>{
 
            setinfo(
                (prev)=>({
                    ...prev,
                    [e.target.name]:e.target.value,
                }));
           };
           //to handel export of data
           const handlonExport=()=>{
            var wb= XLSX.utils.book_new();
            var ws=XLSX.utils.json_to_sheet(result);
            XLSX.utils.book_append_sheet(wb,ws,"Memebers");
            XLSX.writeFile(wb,"MyExcel.xlsx")
        
           };
           useEffect(()=>{
            
            
           },[])
  return (
    <div className='container-fluid p-4'>
    <div className='row top_title_container'>
        
            <TitleHeader title="Payment reports" icon={<AutoGraphIcon />}/>

       
        
            
    </div>
    <div className='contianer-fluid p-1 my-3'>
            <div className='cv_searchbar_container '>

            <div className=' row '>
            {error_dialog && <Modals type="error" text={Error_text}/>}

              <form className=' col-sm-9 ' onSubmit={handel_submit}>
              <div className='row'>

              
              <div  className='col-sm-12 col-md-3'>
                <label className='fw-bolder'>From:</label>
                <input className='form-control' type="date" value={filter_info.from_date}onChange={onhandelChange} name="from_date"/>
              </div>
              <div  className=' col-sm-12 col-md-3'>
                <label className='fw-bolder'>To :</label>
                <input className='form-control' type="date" value={filter_info.to_date} onChange={onhandelChange} name="to_date"/>
              </div>
          
              <div className=' col-sm-12 col-md-3 '>
              <label className='fw-bolder'>To :</label>
              <select className="form-select" required value={filter_info.type} onChange={onhandelChange} name='type'>
                  <option>Payment Type</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className=' col-sm-12 col-md-3 py-3'>
              <button className='filter_search_button'><SearchIcon/>  Search</button>
              
              </div>
              </div>
              </form>
            <div className='col-sm-3 d-flex justify-content-around  '>
             <div  className=' d-flex flex-wrap align-content-center  '>
             <button className='refresh_button flex-shrink-1 'onClick={handelrefresh}><RefreshIcon/> Refresh  </button>
            </div> 
            <div className=' d-flex flex-wrap align-content-center  '>
            <button className='export_button flex-shrink-1' onClick={handlonExport} >  <ImportExportIcon/> Export</button>
            </div> 
            </div>
            
            <div className='col-sm-12'>
          {/* { result? <View_Membership_table result={result}/>:<SimpleBackdrop/>} */}
          </div>
              </div>
            </div>
            </div>
</div>
  )
}

export default Payment_reports