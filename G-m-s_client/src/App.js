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
function App() {
  return (

    <div className="">
    <Routes>
        <Route exact path='/' element={<Loginpage/>}/>
        
        <Route path='/dashbord' element={(<NavBar NavItem={NavItem} ><CashierDashbord/></NavBar>)}/>
        <Route path='/Add-memeber' element={(<NavBar NavItem={NavItem}><Add_memebers/></NavBar>)}/>
       
        {/* admin routes */}



        <Route path="/Admin__dashbord" element={(<NavBar NavItem={Admin_NavItem}><AdminDashbord/> </NavBar>)}/>
        <Route path="/Manage_Cashiers" element={(<NavBar NavItem={Admin_NavItem}><Manage_cashier/> </NavBar>)}/>
       
      </Routes>  
    </div>
   
  );
}

export default App;
