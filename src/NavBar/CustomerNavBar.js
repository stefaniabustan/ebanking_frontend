import React from "react"
import {Navbar,Nav} from "react-bootstrap"


function CustomerNavBar() {

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
    function handleLogout()   {
        // Șterge datele de autentificare din localStorage sau orice alte date relevante
        localStorage.removeItem("username");
        // Redirecționează către pagina de Log In
        this.props.history.push("/");
    }
    return (
        <Navbar expend="lg" bg="black" variant="dark">
            <Nav className="mr-auto">
                <Nav.Link href="/CustomerHome" style={linkStyle1}>Home </Nav.Link>
                <Nav.Link href="/" style={linkStyle2} onClick={handleLogout}> LogOut</Nav.Link>
            </Nav>
        </Navbar>
    )

}

export default CustomerNavBar
