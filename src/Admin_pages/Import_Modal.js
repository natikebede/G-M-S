import React,{useEffect, useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Modals from '../components/Modals';
import * as XLSX from 'xlsx'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Import_View from './Import_View';
import api from '../Apis/api';
import { RssFeed } from '@mui/icons-material';
function Import_Modal({modal_status,Modal_toggle}) {
   
    const [success_dialog, setsuccess]=useState(false);
    const navigate= useNavigate();
    const [error_dialog ,setdialog]= useState(false);
    const user=localStorage.getItem("g-m-s_account")||null
    const [account,setAccount]= useState(JSON.parse(user));
    const [Error_text,set_text]=useState("");
    const [data, setData] =useState([]);
  const toggle = () => {
    Modal_toggle()
    setData([]);
    setsuccess(false);
  
  };
  useEffect(()=>{
    if(account==null||undefined)
    return  navigate("/");
   },[])
  
  const onHandelChange=async(e)=>{
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    /* data is an ArrayBuffer */
    const workbook = XLSX.read(data);
    const wsname = workbook.SheetNames[0];
    const ws = workbook.Sheets[wsname];

    /* Convert array to json*/
    const dataParse = XLSX.utils.sheet_to_json(ws, {
      header: 1,
      defval: "",
  });

    setData(dataParse)
  }
  const onSubmits= async(e)=>
  { e.preventDefault();
   
    const new_data= data.filter((data,index)=>(index!==0));
    console.log(new_data);

    try {
      const response= await api.post(`/Admin/Upload-membership/excel/${account.account_id}`,{
        new_data
      })
      if(response.data.status=="success")
      {
        setsuccess(true);
        set_text("Members imported successfully")
      }
      else{
        setdialog(true);
        setsuccess(false);
        set_text(response.data.error)
      }
      console.log(response);
    } catch (error) {
      alert ("error !!!! ",error)
    }

  }
  return (
    <div className='container-fluid '>
      <div className='row'>
        <div className='col-sm-12'>
        <Modal isOpen={modal_status} className='modal_color rounded' size="xl" toggle={toggle} >
        <ModalHeader  className='modal_color' toggle={toggle}>Import Membership</ModalHeader>
        <ModalBody className='modal_color'>
          <form onSubmit={onSubmits}>
          <div className='container-fluid p-2'>
            <div className='row'>
          
              <div className='col-sm-12 col-12 bg-white p-3 rounded'>
              {error_dialog && <Modals type="error" text={Error_text}/>}
              { success_dialog && <Modals type="success" text={Error_text}/>}
              <div className="mb-3 mt-3">
              <label for="file" className="form-label">File Upload:</label>
              <input type="file" className="form-control" required accept='.xlsx, .xls' onChange={onHandelChange} id="fullname" placeholder="Enter Full Name" name="fullname"/>
            </div>

           
            <button type='submit' className='register' >
            Upload
          </button>
              
              </div>

            </div>
            
            </div> 
          
          </form>
          <>
          <Import_View  result={data}/>
          </>
        </ModalBody>
        <ModalFooter className='modal_color'>
         
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        
        </ModalFooter>
        
      </Modal>
        </div>

      </div>

    </div>
  )
}

export default Import_Modal;