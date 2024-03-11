import React ,{useEffect, useState}from 'react'
import TitleHeader from '../components/TitleHeader'
import AddBoxIcon from '@mui/icons-material/AddBox';
import * as XLSX from 'xlsx'
import ImportExportIcon from '@mui/icons-material/ImportExport';
import View_trips_table from '../components/View_trips_table';
import { getall_trips } from '../functions/counts_sales';
import Add_Trip_modal from './Add_Trip_modal';
function ManageTrips() {
    const [modal, setModals] = useState(false);
    const [results, setResult]= useState();
    const Modal_toggle = () => {
        setModals(!modal);}
        const handlonExport=()=>
        {
            var wb= XLSX.utils.book_new();
           var ws=XLSX.utils.json_to_sheet(results);
           XLSX.utils.book_append_sheet(wb,ws,"Trips");
           XLSX.writeFile(wb,"MyExcel.xlsx")

        }
        useEffect(()=>{
                setInterval(()=>{
                    getall_trips().then((res)=>{
                        setResult(res);
                    })
                },5000)


        },[])
  return (
    <div className='container-fluid p-4'>
    <div className="mc_title_container">
    <TitleHeader  title="Manage Trips " icon={<AddBoxIcon />}/> 
    </div>

    <div className='contianer-fluid p-1 my-3'>
                <div className='cv_searchbar_container'>
                    <div className='add_cashier_button_container'>
                        <button className='add_cashier_button' onClick={Modal_toggle}> <AddBoxIcon/> Create new trip</button>
                        <button className='export_button' onClick={handlonExport} > <ImportExportIcon/> Export</button>
                    </div>
                    <Add_Trip_modal modal_status= {modal} Modal_toggle={Modal_toggle}/>
                    <View_trips_table results={results}/>
                </div>
      

            </div>
        
        </div>


 
  )
}

export default ManageTrips