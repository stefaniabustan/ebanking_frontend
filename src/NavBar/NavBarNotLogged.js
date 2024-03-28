import React from "react"
import {Navbar,Nav} from "react-bootstrap"


function NavBarNotLogged() {

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
        return (
            <Navbar expend="lg" bg="black" variant="dark">
                <Nav className="mr-auto">
                    <Nav.Link href="/" style={linkStyle1}>Home </Nav.Link>
                    <Nav.Link href="/" style={linkStyle2}> LogIn</Nav.Link>
                </Nav>
            </Navbar>
        )

}

export default NavBarNotLogged
