import React from 'react'
import { Route ,Routes } from 'react-router-dom';
import "./App.css"
import NavItem from './components/cashier_navbar_data.js';

import NavBar from './components/NavBar';


import CashierDashbord from './cashier_Pages/CashierDashbord';
import Admin_NavItem from './components/admin_navbar_data.js';
import AdminDashbord from './Admin_pages/AdminDashbord.js';
import Loginpage from './Loginpage.js';
import Manage_cashier from './Admin_pages/Manage_cashier.js';
import Add_memebers from './cashier_Pages/Add_memebers.js';
import View_memebership from './cashier_Pages/View_memebership.js';
import Memebership_renewal from './cashier_Pages/Memebership_renewal.js';
import Payment_reports from './cashier_Pages/Payment_reports.js';
import Admin_view_Membership from './Admin_pages/Admin_view_Membership.js';
import Admin_payment_report from './Admin_pages/Admin_payment_report.js';
import Hr_management from './Admin_pages/Hr_management.js';
import Edit_Employee from './Admin_pages/Edit_Employee.js';
function App() {
  return (

    <div className="">
    <Routes>
        <Route exact path='/' element={<Loginpage/>}/>
        
        <Route path='/dashbord' element={(<NavBar NavItem={NavItem} ><CashierDashbord/></NavBar>)}/>
        <Route path='/Add-memeber' element={(<NavBar NavItem={NavItem}><Add_memebers/></NavBar>)}/>
        <Route path='/view-memebership' element={(<NavBar NavItem={NavItem}><View_memebership/></NavBar>)}/>
        <Route path='/Memebership/renewal/:name/:id' element={(<NavBar NavItem={NavItem}> <Memebership_renewal/> </NavBar>)}/>
        <Route path='/Payment-reports' element={(<NavBar NavItem={NavItem}> <Payment_reports/>  </NavBar>)}/>
       
       
        {/* admin routes */}



        <Route path="/Admin__dashbord" element={(<NavBar NavItem={Admin_NavItem}><AdminDashbord/> </NavBar>)}/>
        <Route path="/Manage_Cashiers" element={(<NavBar NavItem={Admin_NavItem}><Manage_cashier/> </NavBar>)}/>
        <Route path="/Admin/view-memebership" element={(<NavBar NavItem={Admin_NavItem}><Admin_view_Membership/> </NavBar>)}/>
        <Route path='/Admin/Memebership/renewal/:name/:id' element={(<NavBar NavItem={Admin_NavItem}> <Memebership_renewal/> </NavBar>)}/>
        <Route path='/Admin/Payment-reports' element={(<NavBar NavItem={Admin_NavItem}> <Admin_payment_report/> </NavBar>)}/>
        <Route path='/Hr-Management' element={(<NavBar NavItem={Admin_NavItem}> <Hr_management/> </NavBar>)}/>
        <Route path='/Admin/Employe/Edit/:emp_id' element={(<NavBar NavItem={Admin_NavItem}> <Edit_Employee/> </NavBar>)}/>

       
      </Routes>  
    </div>
   
  );
}

export default App;
