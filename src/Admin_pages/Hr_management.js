import React, { useEffect, useState } from 'react'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Detail_Cards from '../components/Detail_Cards';
import TitleHeader from '../components/TitleHeader';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { get_all_employee, get_number_of_employee } from '../functions/admin_functions';
import View_hr_management from '../components/View_hr_management';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import * as XLSX from 'xlsx'
import RefreshIcon from '@mui/icons-material/Refresh';
import SimpleBackdrop from '../components/SimpleBackdrop';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Add_Employe_Modal from './Add_Employe_Modal';
import { subDays } from '../functions/counts_sales';
import { useNavigate } from 'react-router-dom';
import { reset_state,set_user } from '../store/Actions';
import { useSelector,useDispatch } from 'react-redux';
function Hr_management() {
    const [Employes,setEmployee]= useState({
        Admins:0,
        Cashiers:0,
        Cleaners:0
    });
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const user=localStorage.getItem("g-m-s_account")||null
    const [account,setAccount]= useState(JSON.parse(user)); 
    const [modal,setModals]=useState(false);
    // for generating payroll
    const Generate_payroll=(list)=>{
        const value=list.map((data)=>
        {
            const days_worked=subDays(data.start_date);
          if(days_worked >-30){
            return{
                Fullname:data.fullname,
                Bank_account:data.bank_account,
                basic_salary:(days_worked >-30)? (data.sallery-(((data.sallery/30)*(30+days_worked)))):data.sallery,
                Over_time:"  "

            }
          }
        }
        )
        handlonExport(value);
    }
    const get_data=()=>{
        get_number_of_employee().then((res)=>{
          
            res.map((data)=>{
                if(data.position=="Admin")
                {
                    setEmployee((pre)=>({
                        ...pre,
                        Admins:data.total_sum,
                        
                    }))
                }
                else if(data.position=="Cashier")
                {
                    setEmployee((pre)=>({
                        ...pre,
                        Cashiers:data.total_sum,
                        
                    }))
                
                }
                if(data.position=="Cleaner")
                {
                    setEmployee((pre)=>({
                        ...pre,
                        Cleaners:data.total_sum,
                        
                    }))
                
                }
                else{
                
                }


            })
            
            get_all_employee().then((res)=>{
             
                setResult(res);
            })
        });
    }
    const [result,setResult]= useState(null);
//    handel refresh of data
    const onhandelrefresh =()=>{
            get_data();
    }

     // handel export of data
    const handlonExport=(results)=>
    {
        var wb= XLSX.utils.book_new();
       var ws=XLSX.utils.json_to_sheet(results);
       XLSX.utils.book_append_sheet(wb,ws,"Employee");
       XLSX.writeFile(wb,"MyExcel.xlsx")

    }
//  for handling modal toggle
    const Modal_toggle = () => {
        setModals(!modal);}
        useEffect(()=>{
            const user=localStorage.getItem("g-m-s_account")
            if(user!==null)
            {
              dispatch(set_user(JSON.parse(user)));
              
              setAccount(JSON.parse(user))
              if(account!==null)
              {
                get_data();
              }
            }
            else{
                navigate("/");
            }
            
            },[])

  return (
    <div className='container-fluid p-4'>
        <div className='top_title_container row p-2'>

            <TitleHeader title="HR Management" icon={<PeopleAltIcon/>}/>
    </div>
        <div className="row p-3">
          <div class="col-sm-12 col-md mt-3">
                <Detail_Cards title="Total Employe's" Icon={<PeopleAltIcon className='text-primary'/>} value={result&&result.length}/>
          </div>      
          <div class="col-sm-12 col-md mt-3">
                <Detail_Cards title="Admins" Icon={<AdminPanelSettingsIcon className='text-success'/>} value={Employes.Admins}/>
          </div>
          <div class="col-sm-12 col-md mt-3">
                <Detail_Cards title="Cashiers" Icon={<PeopleAltIcon className='text-primary'/>} value={Employes.Cashiers}/>
          </div>
          <div class="col-sm-12 col-md mt-3">
                <Detail_Cards title="Cleaners" Icon={<CleaningServicesIcon className='text-info'/>} value={Employes.Cleaners}/>
          </div>
        </div>
       <div className='row cv_searchbar_container p-1 mt-3'>
       <div className='row '>
        <div className='add_cashier_button_container'>
                        <button className='add_cashier_button' onClick={Modal_toggle} > <PersonAddAltIcon/> Add Employee</button>
                        <div  className='col-sm-3 d-flex justify-content-around '>
                        <button className='refresh_button flex-shrink-1 mx-2'onClick={onhandelrefresh}><RefreshIcon/> Refresh  </button>
                        <button className='export_button' onClick={()=>handlonExport(result)} > <ImportExportIcon/> Export</button>

                </div> 
        </div>
        </div>
        <div className='container-fluid  p-2'>
            
            { result ? <View_hr_management results={result}/>:<SimpleBackdrop/> }
            <Add_Employe_Modal modal_status ={modal} Modal_toggle={Modal_toggle}/>
        </div>
        <div className='row mt-3'>
            <button className='btn btn-success fw-bold' onClick={()=>Generate_payroll(result)}> Generate Payroll </button>
        </div>
       </div>
    </div>
  )
}

export default Hr_management