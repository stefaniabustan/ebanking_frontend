import React from "react";
import BackgroundImg from '../assets/img2.png';
import {Container} from "react-bootstrap";
import AdminNavBar from "../NavBar/AdminNavBar";

const textStyle = {color: 'white',  fontWeight: 'bold' };

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "100%",
    backgroundImage: `url(${BackgroundImg})`
};
function Home() {
    return (

        <div className="home">
            <AdminNavBar />
            <div style={backgroundStyle}>
                <Container fluid>
                    <br></br><br/>
                    <br></br><br></br><br></br><br></br><br></br><br></br>

                    <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>

                </Container>
            </div>
        </div>
    );
}

export default Home;
