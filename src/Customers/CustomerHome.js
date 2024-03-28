import React from 'react';
import NavBar from "../NavBar/CustomerNavBar"


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



class CustomerHome extends React.Component{
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
                    <a href="/ViewProfile"><center> My profile</center></a>
                    <a href="/ViewAccountsClient"><center> Accounts</center></a>
                    <a href="/AddAccountClient"><center> Add Accounts</center></a>
                    {/*<a href="/CustomerHome"><center> Transfers</center></a>*/}
                    <a href="/AddTransferClient"><center> Add Transfers</center></a>

                </div>
                <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
                <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            </div>
        )
    }
}

export default CustomerHome
