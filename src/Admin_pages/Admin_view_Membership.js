
import React, { useEffect, useState } from 'react'
import TitleHeader from '../components/TitleHeader'
import "../Cashier_page_css/view_membership_cashier.css"

import DvrIcon from '@mui/icons-material/Dvr';
import * as XLSX from 'xlsx'
import ImportExportIcon from '@mui/icons-material/ImportExport';
import Modals from '../components/Modals';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { get_all_memebership, get_all_memebership_between } from '../functions/counts_sales';
import View_Membership_table from '../components/View_Membership_table';
import SimpleBackdrop from '../components/SimpleBackdrop'
import Test_Table from '../components/Test_Table';
function Admin_view_Membership() {const [result,setResult]= useState(null);
    const [error_dialog ,setdialog]= useState(false);
    const [Error_text,set_text]=useState("");
        const[filter_info,setinfo]= useState({
            from_date:null,
            to_date:null,
        });

//setting the memebership table data
        const set_memebership_table =()=>{
            get_all_memebership().then((response)=>{
                setResult(response);
            })
        }
    const handel_submit=(e)=>{
        e.preventDefault();
        if(filter_info.from_date!==null&& filter_info.to_date!==null){
            setResult(null);
            setdialog(false);
                get_all_memebership_between(filter_info.from_date,filter_info.to_date).then(
                    (res)=>{
                        setResult(res);
                    }
                )
        }
        else{
                setdialog(true);
                set_text("Please Enter Both Dates to apply Filter");
        }
    };
    

 // handel refersh
    const handelrefresh=()=>{
        setResult(null);
       
        set_memebership_table();
    };


    //handel input changes
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
    
    set_memebership_table();
   },[])
  return (
    <div className='container-fluid p-4'>
        <div className='row top_title_container'>
            
                <TitleHeader title="View Memebership" icon={<DvrIcon />}/>

           
            
                
        </div>
        <div className='contianer-fluid p-1 my-3'>
                <div className='cv_searchbar_container '>

                <div className=' row '>
                {error_dialog && <Modals type="error" text={Error_text}/>}

                  <form className=' col-sm-9 ' onSubmit={handel_submit}>
                  <div className='row'>

                  
                  <div  className='col-sm-12 col-md-4'>
                    <label className='fw-bolder'>From:</label>
                    <input className='form-control' type="date" value={filter_info.from_date}onChange={onhandelChange} name="from_date"/>
                  </div>
                  <div  className=' col-sm-12 col-md-4'>
                    <label className='fw-bolder'>To :</label>
                    <input className='form-control' type="date" value={filter_info.to_date} onChange={onhandelChange} name="to_date"/>
                  </div>
              
                  <div className=' col-sm-12 col-md-4 py-3'>
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
                {/* { result? <Test_Table result={result}/>:<SimpleBackdrop/>} */}
              { result? <View_Membership_table result={result}/>:<SimpleBackdrop/>}
              </div>
                  </div>
                </div>
                </div>
    </div>
  )
}


export default Admin_view_Membership