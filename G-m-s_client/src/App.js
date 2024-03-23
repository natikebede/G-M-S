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
       
      </Routes>  
    </div>
   
  );
}

export default App;
