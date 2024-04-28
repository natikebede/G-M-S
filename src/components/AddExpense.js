import { Description } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { add_catagory, get_expense_catagory_list } from '../functions/admin_functions';
import Modals from './Modals';
import Add_Catagory_modal from './Add_Catagory_modal';
import api from '../Apis/api';
import { useNavigate } from 'react-router-dom';
import {useSelector } from 'react-redux';
import TitleHeader from './TitleHeader';
import { BarChart } from '@mui/icons-material';
import { get_today_date } from '../functions/BookingGenerator';

function AddExpense() {
    const account= useSelector(state=>state.cashier_reducer.user);
    const [expense_data,setData]=useState({
            description:"",
            amount:0,
            date:"",
            created_date:get_today_date(),
            catagory:"",
            expense_type:"One-Time",
            account_id:account.account_id,
            date:get_today_date(),
    });
    const [error_text, settext] = useState('');
    const [modal_status,setModal]=useState(false);
  const [error_type, settype] = useState('success');
  const [error_alert, setAlert] = useState(false);
    const [catagory_data,setCatagory]= useState(null);
    const [new_catagory,setNewCatagory]=useState("");
    const navigate= useNavigate();
    // for handel adding Expense
    const handelSubmitExpense =async(e)=>{
        e.preventDefault();
        const response= await api.post("/Expense/Add-New-Expense",{
            expense_data,
        })
        if(response.data.status=="success"){
            setAlert(true);
            settype("success");
            settext("New expense added");
           setData({
            description:"",
            amount:0,
            catagory:"",
            expense_type:"One-Time",
            account_id:account.account_id,
            date:get_today_date(),
           }
         );
         
        }
        else{
            setAlert(true);
            settype("error");
            settext(response.data.message);
        }
    
    }

    // for handling adding a new catagory
    const handleAddCatagory=(e)=>{
        e.preventDefault();
        Modal_toggle();
        add_catagory(new_catagory).then((res)=>{
            if(res.data.status=="success"){
                setAlert(true);
                settype("success");
                settext("New Catagory added");
                load_data();
            }
            else{
                setAlert(true);
                settype("error");
                settext(res.data.message);
            }
        })
    
    }
    // add catagory modal toggel
    
    const Modal_toggle=()=>{
        setModal(!modal_status)
    }
    // for making loading data
    const load_data= ()=>{
        get_expense_catagory_list().then((res)=>{
            if(res.data.status=="fail")
            {
                settype("error");
                setAlert(true);
                settext(res.data.message);
            }
            else{
             
                if (res.data.result==0){
                    setCatagory(null);
                }
               else{
            
                setCatagory(res.data.data);
               }
            }
        })
    }

    // for handling input change 
    const onHandelChange=(e)=>{
        setData( (prev)=>({
          ...prev,
          [e.target.name]:e.target.value
        }))}
        useEffect(()=>{
            if(account==null){
                navigate("/")
            }
            load_data()
        },[])
  return (
    <div className='container-fluid rounded bg-white p-4 px-4'>
           <div className="mc_title_container row">
        <div className='col-sm-12'>
        <TitleHeader title="Add Expense" icon={<BarChart/>}/>
        </div>
        </div>
       
      <div className='col-sm-12 col-md-8 mt-3 shadow p-4 mb-4 bg-white p-3 rounded mx-auto'>
      <form onSubmit={handelSubmitExpense}>
      { error_alert &&<Modals type={error_type} text={error_text}/>}
        <div className="mb-3 mt-3">
                <label for="email" className="form-label">Description:</label>
                <input type="Text" className="form-control" required value={expense_data.description} onChange={onHandelChange} id="description" placeholder="Enter Description" name="description"/>
              </div>
  
              <div className='row mb-3 mt-3'>
                  <div className='col-sm-12 col-md'>
                <label for="email" className="form-label">Expense Amount:</label>
                <div class="input-group">
                  <span class="input-group-text fw-bold">ETB</span>
                <input type="number" className="form-control" required value={expense_data.amount}  onChange={onHandelChange} id="amount" placeholder="" name="amount"/>
                </div>
              
              </div>
  
              <div className=' col-sm-12 col-md'>
              <label for="email" className="form-label">Expense type:</label>
                <select className="form-select" required value={expense_data.expense_type} onChange={onHandelChange} name='expense_type'>
                    <option value="One-Time">One-Time</option>
                    <option value="Recuring">Recuring</option>
                  </select>    
              </div>
                 
  
              </div>
  
              <div className="row mb-3 mt-3">
                <div className="col-sm-12 col-md">
                <label for="email" className="form-label">Catagory:</label>
                <select className="form-select" required value={expense_data.catagory} onChange={onHandelChange} name='catagory'>
                <option value={null}></option>
                    {
                      catagory_data && catagory_data.map((data)=>{
                        return ( <option value={data.catagory_id}>{data.catagory}</option>)
  
                      })
                    }
                    
                  </select>
                </div>
                <div className="col-sm-12 col-md p-2 d-flex justify-content-center">
                  <button type="button"className='btn btn-primary mt-4 fw-bold' onClick={Modal_toggle}>Add New catagory</button>
  
                </div>
                </div>
                <div className=" col-sm-12 col-md-6 mb-3 mt2">
                <label for="email" className="form-label">Date:</label>
                <input type="date" className="form-control" required value={expense_data.date} onChange={onHandelChange} id=""  name="date"/>
              </div>
                <div className='row  px-4'>
                  <button type="submit"className='fw-bold btn btn-success btn-block'>
                      Add Expense
                  </button>
  
                </div>
        </form>
      </div>
      <Add_Catagory_modal modal_status={modal_status} Modal_toggle={Modal_toggle} 
      new_catagory={new_catagory} setNewCatagory={setNewCatagory} handleAddCatagory={handleAddCatagory}/>
    </div>
  )
}

export default AddExpense