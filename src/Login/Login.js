import React from "react"
import {Form,FormGroup,Input,Label,Button,InputGroup} from "reactstrap"
import {Link } from "react-router-dom"
import { FaUser,FaLock } from "react-icons/fa";
import axios from "axios"
import BackgroundImg from '../assets/img2.png';
// import { Container, Row, Col } from 'react-bootstrap';
import NavBarNotLogged from "../NavBar/NavBarNotLogged";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    // width: "100%",
    height: "100%",
    backgroundImage: `url(${BackgroundImg})`
};
//
// const textStyle = {color: '#48d1cc',  fontWeight: 'bold' };
const backgroundColor={
    background:"none"
}


class LogIn extends React.Component{


    constructor(props){
        super(props)
        this.state={
            username:"",
            password:"",
            wrongUsername:"false",
            wrongPassword:"false"
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleClick=this.handleClick.bind(this)

    }

    handleClick(){
        axios.get(`http://localhost:8080/getUser/${this.state.username}`).then(response=>{
            if (response.data.username==="null") this.setState({
                wrongUsername:"true"
            })
            else{
                this.setState({
                    wrongUsername:"false"
                })
                if(response.data.password!==this.state.password) this.setState({
                    wrongPassword:"true"
                })
                else {
                    this.setState({
                        wrongPassword:"false",
                    })
                    localStorage.setItem("username",this.state.username)
                    response.data.type==="ADMIN" ? this.props.history.push("/AdminHome"):
                        response.data.type==="EMPLOYEE" ? this.props.history.push("/EmployeeHome"):
                            response.data.type==="CLIENT" ? this.props.history.push("/CustomerHome"):
                            this.props.history.push("/Login")

                }
            }
        })
    }

    handleChange(event){
        const {name,value}=event.target
        this.setState({
            [name]:value
        })
    }

    componentDidMount(){
        axios.get(`http://localhost:8080/getUser/${localStorage.getItem('username')}`).then(response=>{
            console.log(response.data)
            this.setState({
                user:response.data
            })
        })
    }
    render() {
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
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <Form className="login-form">
                    <FormGroup>
                        <FaUser/>
                        {this.state.wrongUsername==="false" ?
                            <Label className="login-label">Email</Label>:
                            <Label className="register-label">Wrong Email*</Label>
                        }
                        <Input className="input" type="text"
                               name="username"
                               onChange={this.handleChange}
                               value={this.state.username}
                               placeholder="Email"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FaLock/>
                        {this.state.wrongPassword==="false" ?
                            <Label className="login-label">Password</Label>:
                            <Label className="register-label">Wrong Password*</Label>
                        }
                        <InputGroup clasName="trans">
                            <Input className="trans" type="password"
                                   backgroundStyle={backgroundColor}
                                   placeholder="Password"
                                   onChange={this.handleChange}
                                   value={this.state.password}
                                   name="password"
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                    </FormGroup>
                    <Button className="btn-lg btn-dark btn-block"
                            onClick={this.handleClick}>Log In</Button>
                    <FormGroup>
                        <Label className="login-label">Don't have an account yet?
                            <Link to="/Register"> Sign up
                            </Link>
                        </Label>
                    </FormGroup>
                </Form>
                <br></br><br></br><br></br><br></br><br></br><br/><br/>

            </div>
        )
    }
}

export default LogIn