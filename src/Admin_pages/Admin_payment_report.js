import React, { useEffect, useState } from 'react'
import TitleHeader from '../components/TitleHeader'
import "../Cashier_page_css/payment_report.css"
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import * as XLSX from 'xlsx'
import ImportExportIcon from '@mui/icons-material/ImportExport';
import Modals from '../components/Modals';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector } from 'react-redux';
import SimpleBackdrop from '../components/SimpleBackdrop';
import View_payment_reports from '../components/View_payment_reports';
import { get_payment_reports_filtered,get_payment_reports_cashier} from '../functions/counts_sales';
import { get_all_cashiers, get_all_payment_details,admin_get_payment_reports_filtered  } from '../functions/admin_functions';
import Test_Table from '../components/Test_Table';



function Admin_payment_report() {
  const [result,setResult]= useState(null);
  const [accounts,setAccounts]=useState(null);

    const [error_dialog ,setdialog]= useState(false);
    const [Error_text,set_text]=useState("");
        const[filter_info,setinfo]= useState({
            from_date:null,
            to_date:null,
            type:null,
            selected_cashier:null
        });

        const set_payment_table =()=>{
          get_all_cashiers().then((res)=>{
              setAccounts(res);

          })
            get_all_payment_details().then((res)=>{
               
                setResult(res);
            })
           
        }
        const handel_submit=(e)=>{
            e.preventDefault();
            console.log(filter_info);
            if(filter_info.from_date==null && filter_info.to_date==null && filter_info.type==null && filter_info.selected_cashier==null)
            {
                set_text("Please set filter paramenters");
                setdialog(true);
                
            }
            else if ((filter_info.from_date==null && filter_info.to_date!==null && filter_info.type==null && filter_info.selected_cashier==null)||(filter_info.from_date==null && filter_info.to_date!==null && filter_info.type!==null && filter_info.selected_cashier!=null))
            {
                set_text("Please Make sure start date is selected first");
                setdialog(true);
            }
            else if ((filter_info.selected_cashier!==null) && (filter_info.from_date!==null || filter_info.to_date!==null || filter_info.type!==null))
            {
              setResult(null);
              setdialog(false);
                get_payment_reports_filtered(filter_info,filter_info.selected_cashier).then((res)=>{
               
                    setResult(res);
                })
                
            }
            else if ((filter_info.selected_cashier!==null) && (filter_info.from_date==null || filter_info.to_date==null || filter_info.type==null))
            { 
              setResult(null);
              setdialog(false);
              get_payment_reports_cashier(filter_info.selected_cashier).then((res)=>{
               
                setResult(res);
            })
            }
            else if ((filter_info.selected_cashier==null) && (filter_info.from_date!==null || filter_info.to_date!==null || filter_info.type!==null))
            { 
              setResult(null);
              setdialog(false);
              admin_get_payment_reports_filtered(filter_info).then((res)=>{
               
                setResult(res);
            })
            }
    }
        const handelrefresh=()=>{
            setdialog(false);
            set_payment_table();
        };
        const onhandelChange=(e)=>{
                if([e.target.name]=="type" && [e.target.value]=="Payment Type")
                {
                    setinfo(
                        (prev)=>({
                            ...prev,
                            type:null,
                        }));
                }
                else if([e.target.name]=="selected_cashier" && [e.target.value]=="Cashier")
                {
                    setinfo(
                        (prev)=>({
                            ...prev,
                            selected_cashier:null,
                        }));
                }
           else {setinfo(
                (prev)=>({
                    ...prev,
                    [e.target.name]:e.target.value,
                }));}
           };
           //to handel export of data
           const handlonExport=()=>{
            var wb= XLSX.utils.book_new();
            var ws=XLSX.utils.json_to_sheet(result);
            XLSX.utils.book_append_sheet(wb,ws,"payment Reports");
            XLSX.writeFile(wb,"MyExcel.xlsx")
        
           };
           useEffect(()=>{
            set_payment_table();
            
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

              <form className=' col-sm-12  col-md-9' onSubmit={handel_submit}>
              <div className='row'>

              
              <div  className='col-sm-12 col-md'>
                <label className='fw-bolder'>From:</label>
                <input className='form-control' type="date" value={filter_info.from_date}onChange={onhandelChange} name="from_date"/>
              </div>
              <div  className=' col-sm-12 col-md'>
                <label className='fw-bolder'>To :</label>
                <input className='form-control' type="date" value={filter_info.to_date} onChange={onhandelChange} name="to_date"/>
              </div>
          
              <div className=' col-sm-12 col-md '>
              <label className='fw-bolder'>To :</label>
              <select className="form-select" required value={filter_info.type} onChange={onhandelChange} name='type'>
                  <option>Payment Type</option>
                  <option>Renewal</option>
                  <option>registration</option>
                </select>
              </div>

              <div className=' col-sm-12 col-md '>
              <label className='fw-bolder'>Cashier :</label>
              <select className="form-select" required value={filter_info.selected_cashier} onChange={onhandelChange} name='selected_cashier'>
                  <option >Cashier</option>
                  {accounts&& accounts.map((account)=>{
                          return(
                            <option value={account.account_id}>{account.username}</option>
                          )

                  })}
                </select>
              </div>



              <div className=' col-sm-12 col-md py-3'>
              <button className='filter_search_button'><SearchIcon/>  Search</button>
              
              </div>
              </div>
              </form>
            <div className='  col-sm-12  col-md-3 d-flex justify-content-around  '>
             <div  className=' d-flex flex-wrap align-content-center  '>
             <button className='refresh_button flex-shrink-1 'onClick={handelrefresh}><RefreshIcon/> Refresh  </button>
            </div> 
            <div className=' d-flex flex-wrap align-content-center  '>
            <button className='export_button flex-shrink-1' onClick={handlonExport} >  <ImportExportIcon/> Export</button>
            </div> 
            </div>    
            
            <div className='col-sm-12'>
            {/* { result? <Test_Table result={result}/>:<SimpleBackdrop/>} */}
          { result? <View_payment_reports result={result}/>:<SimpleBackdrop/>}
          </div>
              </div>
            </div>
            </div>
</div>
  )
}

export default Admin_payment_report