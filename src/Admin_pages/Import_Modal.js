import React,{useEffect, useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Modals from '../components/Modals';
import * as XLSX from 'xlsx'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
function Import_Modal({modal_status,Modal_toggle}) {
   
    const [success_dialog, setsuccess]=useState(false);
    const navigate= useNavigate();
    const [error_dialog ,setdialog]= useState(false);
    const account= useSelector(state=>state.cashier_reducer.user);
    const [Error_text,set_text]=useState("");
    const [data, setData] =useState([]);
  const toggle = () => Modal_toggle();
  useEffect(()=>{
    if(account==null||undefined)
    return  navigate("/");
   },[])
  
  const onHandelChange=(e)=>{
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
    const data = e.target.result;
    const workbook = XLSX.read(data, { type: "binary" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets [sheetName];
    const parsedData = XLSX.utils.sheet_to_json(sheet);
    setData(parsedData);
   console.log("here is",data)
  }}
  const onSubmits= async(e)=>
  { e.preventDefault();
   
    


  }
  return (
    <div className='container-fluid '>
      <div className='row'>
        <div className='col-sm-12'>
        <Modal isOpen={modal_status} className='modal_color' size="xl" toggle={toggle} >
        <ModalHeader  className='modal_color' toggle={toggle}>cashier / Admin registration</ModalHeader>
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