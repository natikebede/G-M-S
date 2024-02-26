import React from 'react'
import { Route ,Routes } from 'react-router-dom';
import "./App.css"
import NavItem from './components/cashier_navbar_data.js';

import NavBar from './components/NavBar';
import Reservation from './cashier_Pages/Reservation';
import ReservationDetails from './components/ReservationDetails';
import Checkoutpage from './cashier_Pages/Checkoutpage';
import Viewreservations from './cashier_Pages/Viewreservations';
import Viewtrips from './cashier_Pages/Viewtrips';
import CashierDashbord from './cashier_Pages/CashierDashbord';
import Admin_NavItem from './components/admin_navbar_data.js';
import AdminDashbord from './Admin_pages/AdminDashbord.js';
import Loginpage from './Loginpage.js';
import Manage_cashier from './Admin_pages/Manage_cashier.js';
import ManageTrips from './Admin_pages/ManageTrips.js';
function App() {
  return (

    <div className="">
    <Routes>
        <Route exact path='/' element={<Loginpage/>}/>
        
        <Route path='/dashbord' element={(<NavBar NavItem={NavItem} ><CashierDashbord/></NavBar>)}/>
        <Route path='/MakeReservation' element={(<NavBar NavItem={NavItem}><Reservation/></NavBar>)}/>
        <Route path='/MakeReservation/:busID' element={(<NavBar NavItem={NavItem}><ReservationDetails/></NavBar>)}/>
        <Route path= '/Checkout/:bookingID' element={(<NavBar NavItem={NavItem}><Checkoutpage/></NavBar>)}/>
        <Route path="/view-Reservation" element={(<NavBar NavItem={NavItem}><Viewreservations/> </NavBar>)}/>
        <Route path="/View-trips" element={(<NavBar NavItem={NavItem}><Viewtrips/> </NavBar>)}/>
        {/* admin routes */}



        <Route path="/Admin__dashbord" element={(<NavBar NavItem={Admin_NavItem}><AdminDashbord/> </NavBar>)}/>
        <Route path="/Manage_Cashiers" element={(<NavBar NavItem={Admin_NavItem}><Manage_cashier/> </NavBar>)}/>
        <Route path="/Create_trip" element={(<NavBar NavItem={Admin_NavItem}><ManageTrips/> </NavBar>)}/>
      </Routes>  
    </div>
   
  );
}

export default App;
