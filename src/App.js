import React from 'react';

import "./App.css";
import Login from "./Login/Login";
import Register from "./Login/Register"
import {BrowserRouter,Route} from "react-router-dom"
import AdminHome from "./Admin/AdminHome";
import AddUser from "./Admin/AddUser";
import AddClient from "./Admin/AddClient";
import ViewUsers from "./Admin/ViewUsers";
import ViewAccountsAdmin from "./Admin/ViewAccountsAdmin";
import AddTransferAdmin from "./Admin/AddTransferAdmin";
import AddAccountAdmin from "./Admin/AddAccountAdmin";
import CustomerHome from "./Customers/CustomerHome";
import ViewProfile from "./Customers/ViewProfile";
import AddAccountClient from "./Customers/AddAccountClient";
import AddTransferClient from "./Customers/AddTransferClient";
import ViewAccountsClient from "./Customers/ViewAccountsClient";



function App() {
    return (
        <div>
           <BrowserRouter forceRefresh={true}>
           <Route exact path="/" component={Login}/>
           <Route exact path="/Register" component={Register}/>
           <Route exact path="/AdminHome" component={AdminHome}/>
           <Route exact path="/AddUser" component={AddUser}/>
           <Route exact path="/AddClient" component={AddClient}/>
           <Route exact path="/ViewUsers" component={ViewUsers}/>
           <Route exact path="/AddAccountAdmin" component={AddAccountAdmin}/>
           <Route exact path="/AddAccountClient" component={AddAccountClient}/>
           <Route exact path="/AddTransferClient" component={AddTransferClient}/>
           <Route exact path="/AddTransferAdmin" component={AddTransferAdmin}/>
           <Route exact path="/ViewAccountsClient" component={ViewAccountsClient}/>
           <Route exact path="/ViewAccountsAdmin" component={ViewAccountsAdmin}/>
           <Route exact path="/CustomerHome" component={CustomerHome}/>
           <Route exact path="/ViewProfile" component={ViewProfile}/>
           </BrowserRouter >

        </div>
    );
}


export default App;

