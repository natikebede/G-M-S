import React ,{useState}from 'react'
import Modals from './Modals'
import moment from 'moment'
import $ from 'jquery';
import MUIDataTable from "mui-datatables";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { useDispatch } from 'react-redux';
import { Select_user, reset_selected_user } from '../store/Actions';
import Edit_user_modal from '../Admin_pages/Edit_user_modal';
function Cashier_view_table({data}) {
const dispatch= useDispatch();
const [modal, setModals] = useState(false);
//columns layout
const columns = [
       
  {label:"Username",name:"username"},
  {label:"Fullname",name:"fullname"},
  {label:"Phonenumber",name:"contact_number"},
  {label:"Position",name:"position"},
  {label:"Salary",name:"sallery"},
  {label:"Created Date",name:"start_date",
  options:{
      customBodyRender:(value)=>(
          moment(value ).format('YYYY-MM-DD')
      )
}},
  {label:"Role",name:"role"},
  {label:"Status",name:"status" ,options:{
      customBodyRender:(value)=>(
          value=='Active'?
          <span className='bg-success  text-white p-3 rounded fw-bold'> Active </span>:
          <span className='bg-danger text-white p-3 rounded fw-bold'> Inactive </span>
          
      )
  }},
  {label:"Action",name:"emp_id", options:{
          customBodyRender:(value)=>(
              <SaveAsIcon  className='print_icon ' onClick={()=>handelEdit(value)} />
          )
  }},

];
const options = {
  filterType: 'checkbox',
  pagination:true,
  
  responsive:'stacked',
  rowsPerPage:5,
  rowsPerPageOptions:[5,10,15,20],
  rowHover:true,
  // sort:true,
  // filter:true,
  // Search:true,
  // download:true,
  selectableRowsHeader:false,
  selectableRows:false
};

 const handelEdit=(id)=>{
   const result= data.filter((datas)=>{return(datas.emp_id==id)});
   dispatch(reset_selected_user());
    dispatch(Select_user(result[0]));
    Modal_toggle();
 };
 const Modal_toggle = () => {
  setModals(!modal);}

  
  return (
    <div>
  <MUIDataTable  title={<h4 className='fw-bold'> Account List</h4>}data={data} columns={columns} options={options} />
<Edit_user_modal modal_status ={modal} Modal_toggle={Modal_toggle} />
    </div>
  )


}

export default Cashier_view_table