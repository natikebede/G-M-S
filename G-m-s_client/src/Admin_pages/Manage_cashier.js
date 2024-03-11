import React ,{useEffect, useState}from 'react'
import TitleHeader from '../components/TitleHeader'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import "./Manage_cashier.css";
import Cashier_view_table from '../components/Cashier_view_table';
import Add_Cashier_modal from './Add_Cashier_modal';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { get_all_users } from '../functions/admin_functions';
import * as XLSX from 'xlsx'
function Manage_cashier() {
    const [modal, setModals] = useState(false);
    const [users,setUsers]=useState([]);
    useEffect(()=>{
   setInterval(() => {
    get_all_users().then((result)=>{
        if(result.result!==0)
        {
            setUsers(result.data)
        }
        else
        {
            setUsers(null);
        }
      

    })


   }, 5000);

        


    },[])

    const Modal_toggle = () => {
        setModals(!modal);}
        const handlonExport=()=>
        {
            var wb= XLSX.utils.book_new();
           var ws=XLSX.utils.json_to_sheet(users);
           XLSX.utils.book_append_sheet(wb,ws,"users");
           XLSX.writeFile(wb,"MyExcel.xlsx")

        }
  return (
    <div className='container-fluid p-4'>
        <div className="mc_title_container">
        <TitleHeader  title="Manage Cashiers " icon={<PersonAddAltIcon/>}/> 
        </div>
        
        <div className='contianer-fluid p-1 my-3'>
                <div className='cv_searchbar_container'>
                    <div className='add_cashier_button_container'>
                        <button className='add_cashier_button' onClick={Modal_toggle}> <PersonAddAltIcon/> Add Cashier/Admin</button>
                        <button className='export_button' onClick={handlonExport} > <ImportExportIcon/> Export</button>
                    </div>

                    <Add_Cashier_modal  modal_status ={modal} Modal_toggle={Modal_toggle}/>
                   
                 <Cashier_view_table data={users}/>
                </div>
      

            </div>
        
        </div>
  )
}

export default Manage_cashier