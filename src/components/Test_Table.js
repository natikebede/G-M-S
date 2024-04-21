import React from 'react'
import MUIDataTable from "mui-datatables";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import moment from 'moment/moment';
function Test_Table({results}) {
    const handelEdit=(id)=>{
        const result= results.filter((datas)=>{return(datas.emp_id==id)});
        console.log(result)
    }
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
        {label:"Status",name:"status"},
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
    
  return (
    <MUIDataTable 
  title={"Account List"}
  data={results}
  columns={columns}
  options={options}
/>
  )
}

export default Test_Table
