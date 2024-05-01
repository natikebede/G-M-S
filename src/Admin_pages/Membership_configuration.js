import React, { useEffect, useState } from 'react'
import TitleHeader from '../components/TitleHeader';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import * as XLSX from 'xlsx'
import SimpleBackdrop from '../components/SimpleBackdrop'
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { reset_state,set_user } from '../store/Actions';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { RefreshOutlined } from '@mui/icons-material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Add_configuration_modal from './Add_configuration_modal';
import View_configuration from '../components/View_configuration';
import api from '../Apis/api';

function Membership_configuration() {
    const [error_text, settext] = useState('');
    const [error_type, settype] = useState('success');
    const [error_alert, setAlert] = useState(false);
    const [modal, setModals] = useState(false);
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const user=localStorage.getItem("g-m-s_account")||null
    const [account,setAccount]= useState(JSON.parse(user)); 
    const [result,setResult]=useState(null)
    //handel modal toggle
    const Modal_toggle = () => {
        setModals(!modal);}
    //handel refresh
    const handelrefresh=()=>{
        setAlert(false);
        get_data();
      
    };
    const get_data=async()=>{
        const response= await api.get("/Membership/Get-all");
        setResult(response.data.data);
    }
  
    useEffect(()=>{
        const user=localStorage.getItem("g-m-s_account")
        if(user!=null)
        {
          dispatch(set_user(JSON.parse(user)));
          
          setAccount(JSON.parse(user))
          
                get_data()
         
        }
        else{
            navigate("/");
        }
        
        },[])
    //
  return (
    <div className='container-fluid p-4'>
        <div className="mc_title_container row">
        <div className='col-sm-12'>
            <TitleHeader  title="Membership Configuration " icon={<SettingsSuggestIcon/>}/> 
        </div>
        </div>

                <div className='row background-color rounded'>
                    <div className='d-flex  flex-column justify-content-end '>
                        <div className=' d-flex  justify-content-end p-1'><button className=' btn btn-info  text-white p-2 fw-bold' onClick={handelrefresh}><RefreshOutlined/>Refresh</button></div>
                        <div className='d-flex  justify-content-end p-1'><button className=' btn btn-primary  text-white p-2 fw-bold' onClick={Modal_toggle}><PostAddIcon/>Add New Configuration</button></div>
                    </div>
                    <div className='container-fluid mt-4'>
                        <div className='row '>
                        { result ? <View_configuration result={result} setAlert={setAlert} settype={settype}settext={settext} refresh={handelrefresh}/>:<SimpleBackdrop/>}
                                   
                        </div>
                       
                    </div>
                </div>
                <Add_configuration_modal modal_status ={modal} Modal_toggle={Modal_toggle}/>
        </div>
  )
}

export default Membership_configuration