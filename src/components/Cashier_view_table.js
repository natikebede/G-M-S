import React ,{useState}from 'react'
import Modals from './Modals'
import moment from 'moment'
import $ from 'jquery';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { useDispatch } from 'react-redux';
import { Select_user, reset_selected_user } from '../store/Actions';
import Edit_user_modal from '../Admin_pages/Edit_user_modal';
function Cashier_view_table({data}) {
const dispatch= useDispatch();
const [modal, setModals] = useState(false);

  $(document).ready(function(){
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });
 const handelEdit=(id)=>{
   const result= data.filter((datas)=>{return(datas.emp_id==id)});
   dispatch(reset_selected_user());
    dispatch(Select_user(result[0]));
    Modal_toggle();
 };
 const Modal_toggle = () => {
  setModals(!modal);}
  if(data!==null)
{  
  
  return (
    <div className='contianer-fluid table-responsive'>
             <input type="text" id="myInput"  className= "cv_searchbar rounded" placeholder='Cashier name / Branch / Phone'/>
                    <table className="table table-hover table-striped">
    <thead className="table-dark">
      <tr>
        <th>Username</th>
        <th>fullname</th>
        <th>Phonenumber</th>
        <th>Position</th>
        <th>salary</th>
        <th>created Date</th>
        <th>role</th>
        <th>status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody id="myTable">
        {data.map((user)=>{

          return(
            <tr key={user.emp_id} className={user.status=="Active"? "fw-bold":"table-danger"}>
              <td>
                {user.username}
              </td>
              <td>
                {user.fullname}
              </td>
              <td>
                {user.contact_number}
              </td>
             
              <td>
                {user.position}
              </td>
              <td>
                {user.sallery}
              </td>
              <td>
                {moment(user.start_date ).format('YYYY-MM-DD')}
              </td>
              <td>
                {user.role}
              </td>
              <td>
                {user.status}
              </td>
              <td><SaveAsIcon  className='print_icon ' onClick={()=>handelEdit(user.emp_id)} /> <DeleteIcon className='delete_icon'/></td>
            </tr>
          )

        })

        }
      
      
    </tbody>
  </table>
<Edit_user_modal modal_status ={modal} Modal_toggle={Modal_toggle} />
    </div>
  )
}
else
{
  <Modals type="error" text="No Users found on database"/>
}
}

export default Cashier_view_table