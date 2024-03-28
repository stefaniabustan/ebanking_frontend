import React from 'react';
import NavBar from "../NavBar/AdminNavBar"


// import BackgroundImg from "../Admin/admin.jpg";
import {Container, Media} from "reactstrap";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import BackgroundImg from "../assets/img2.png";
import axios from "axios";
const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "100%",
    backgroundImage: `url(${BackgroundImg})`
};


const linkStyle1 = {
    paddingLeft: '40px',
    paddingTop: '18px',
    fontSize: '25px',
    fontFamily: '"Lucida Console", "Courier New", monospace',
    fontWeight: 'lighter',
    color: 'grey',
    // Add other styles as needed
};
const linkStyle2 = {
    paddingLeft: '1300px',
    paddingTop: '18px',
    fontSize: '20px',
    fontFamily: '"Lucida Console", "Courier New", monospace',
    fontWeight: 'lighter',
    color: 'grey',
    // Add other styles as needed
};
class AdminHome extends React.Component{
    // constructor(){
    //     super()
    // }

    componentDidMount(){
        const isLoggedIn = localStorage.getItem("username");

        // Dacă utilizatorul nu este autentificat, redirecționăm către pagina de autentificare
        if (!isLoggedIn) {
            this.props.history.push("/");
        }
    }
    render(){
        const myStyle = {
            backgroundImage: `url(${BackgroundImg})`,
            // height: "100vh",
            marginBottom: "-120px",
            // fontSize: "50px",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
        };
        return (
            <div  style={myStyle}>
                <NavBar/>
                <div className="sidenav">
                    <a href="/ViewUsers"><center> Users</center></a>
                    <a href="/AddUser"><center> Add Users</center></a>
                    {/*<a href="/AdminHome"><center> Customers</center></a>*/}
                    <a href="/AddClient"><center> Add Customers</center></a>
                    <a href="/ViewAccountsAdmin"><center> Accounts</center></a>
                    <a href="/AddAccountAdmin"><center> Add Accounts</center></a>

                </div>
                <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
                <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            </div>
        )

    }
}

export default AdminHome
