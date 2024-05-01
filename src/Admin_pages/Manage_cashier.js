import React ,{useEffect, useState}from 'react'
import TitleHeader from '../components/TitleHeader'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import "./Manage_cashier.css";
import Cashier_view_table from '../components/Cashier_view_table';
import Add_Cashier_modal from './Add_Cashier_modal';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { get_all_users } from '../functions/admin_functions';
import SimpleBackdrop from '../components/SimpleBackdrop'
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector,useDispatch } from 'react-redux';
import * as XLSX from 'xlsx'
import { reset_state,set_user } from '../store/Actions';
import {  useNavigate } from 'react-router-dom';
import Test_Table from '../components/Test_Table';

function Manage_cashier() {
    const [modal, setModals] = useState(false);
    const navigate= useNavigate();
    const [users,setUsers]=useState([]);
    const dispatch= useDispatch();
    const user=localStorage.getItem("g-m-s_account")||null
    const [account,setAccount]= useState(JSON.parse(user));  
    useEffect(()=>{
        const user=localStorage.getItem("g-m-s_account")
        if(user!==null)
        {
          dispatch(set_user(JSON.parse(user)));
          
          setAccount(JSON.parse(user))
          if(account!==null)
          {
            get_all_users().then((res)=>{
                setUsers(res.data);
            })
          }
        }
        else{
            navigate("/");
        }
        
        },[])

    const handelrefresh=()=>{
        setUsers(null);
        get_all_users().then((res)=>{
            setUsers(res.data);
        })
    };

    const Modal_toggle = () => {
        setModals(!modal);}

        // handel export of data
        const handlonExport=()=>
        {
            var wb= XLSX.utils.book_new();
           var ws=XLSX.utils.json_to_sheet(users);
           XLSX.utils.book_append_sheet(wb,ws,"Account users");
           XLSX.writeFile(wb,"MyExcel.xlsx")

        }
  return (
    <div className='container-fluid p-4'>
           <div className='top_title_container row p-2'>
        <TitleHeader  title="Manage Cashiers " icon={<PersonAddAltIcon/>}/> 
        </div>
        
       
        
        <div className='contianer-fluid p-1 my-3'>
                <div className='cv_searchbar_container row'>
                    <div className='add_cashier_button_container'>
                        <button className='add_cashier_button' onClick={Modal_toggle}> <PersonAddAltIcon/> Add Cashier/Admin</button>
                        <div  className='col-sm-3 d-flex justify-content-around '>
                        <button className='refresh_button flex-shrink-1 mx-2'onClick={handelrefresh}><RefreshIcon/> Refresh  </button>
                        <button className='export_button' onClick={handlonExport} > <ImportExportIcon/> Export</button>

                </div> 
                    </div>

                    <Add_Cashier_modal  modal_status ={modal} Modal_toggle={Modal_toggle}/>
                   
                    { users ? <Cashier_view_table data={users}/>:<SimpleBackdrop/> }
                </div>
      

            </div>
        
        </div>
  )
}

export default Manage_cashier