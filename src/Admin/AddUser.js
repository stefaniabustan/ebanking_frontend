import React from "react"
import {Form,FormGroup,Input,Label,Button,InputGroup} from "reactstrap"
import {Link} from "react-router-dom"
import { FaUser,FaLock } from "react-icons/fa";
import axios from "axios"
import isEmail from 'validator/lib/isEmail';

import BackgroundImg from '../assets/img3.jpeg';
// import Jumbotron from "react-bootstrap/Jumbotron";
import NavBarNotLogged from "../NavBar/AdminNavBar";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "100%",
    backgroundImage: `url(${BackgroundImg})`
};

class AddUser extends React.Component{

    constructor(props){
        super(props)
        this.state={
            username:"",
            password1:"",
            password2:"",
            type:"",
            usernameExist:"false",
            usernameNotMail:"false",
            passwordError:"true",
            savedUser:{}
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleClick=this.handleClick.bind(this)

    }


    componentDidMount(){
    }

    handleClick(){
        // if(isEmail(this.state.username))
        {
            //     this.setState({
            //         usernameNotMail:"false"
            //     })
            axios.get(`http://localhost:8080/getUser/${this.state.username}`).then(response1=>{
                if(response1.data.username!=="null") this.setState({
                    usernameExist:"true"
                })
                else{
                    this.setState({
                        usernameExist:"false"
                    })
                    if(this.state.password1===this.state.password2){
                        this.setState({
                            passwordError:"true"
                        })
                        axios.post('http://localhost:8080/user/modify',  null,{
                            params: {
                                username: this.state.username,
                                password: this.state.password1,
                                type: this.state.type,
                                operation: 'insert'
                            },
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(response=>{
                            console.log(response.data.id)
                            if(this.state.type==="ADMIN") {
                                axios.post('http://localhost:8080/admin/modify', null, {
                                    params: {
                                        user_id:response.data.id,
                                        operation: 'insert'
                                    },
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }).catch(error => {
                                        console.error("Error adding admin details:", error);
                                        // Handle error for adding client details
                                    });
                            }
                            else {
                                if (this.state.type==="EMPLOYEE") {
                                    axios.post('http://localhost:8080/employee/modify', null, {
                                        params: {
                                            user_id: response.data.id,
                                            operation: 'insert'
                                        },
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded'
                                        }
                                    }).catch(error => {
                                            console.error("Error adding employee details:", error);
                                            // Handle error for adding client details
                                        });
                                }
                            }
                        })
                            .then(response=>{ //sa o pun dupa!!
                            //this.props.history.push("/ViewUsers")
                            window.location.reload();
                        })
                            .catch(error => {
                                console.error("Error adding client details:", error);
                                // Handle error for adding client details
                            });
                    }
                    else this.setState({
                        passwordError:"false"
                    })

                }
            })}

        // else this.setState({
        //     usernameNotMail:"true"
        // })
    }

    handleChange(event){
        console.log(event.target.value)
        const {name,value}=event.target
        this.setState({
            [name]:value
        })
    }
    render(){
        return(
            <div className="body">
                <NavBarNotLogged/>
                {/*<div style={backgroundStyle}>*/}
                    <br></br><br></br><br></br><br></br>
                    <div  className="adduser">
                        <Form className="register-form">
                    <span>
                        <h3>Register</h3>
                    </span>
                            <FormGroup>
                                {this.state.usernameNotMail==="true" ?
                                    <Label className="register-label">Not a valid email address*</Label> :
                                    this.state.usernameExist==="false" ?
                                        <Label className="login-label">Username</Label>
                                        :
                                        <Label className="register-label">Username already exist*</Label>}
                                <Input className="input" type="text"
                                       name="username"
                                       onChange={this.handleChange}
                                       value={this.state.username}
                                       placeholder="Username"
                                />
                            </FormGroup>
                            <FormGroup>
                                {this.state.passwordError==="true" ?
                                    <Label className="login-label">Password</Label>
                                    :
                                    <Label className="register-label">Password*</Label>}
                                <Input className="input" type="password"
                                       name="password1"
                                       onChange={this.handleChange}
                                       value={this.state.password1}
                                       placeholder="Password"
                                />
                            </FormGroup>
                            <FormGroup>
                                {this.state.passwordError==="true" ?
                                    <Label className="login-label">Password</Label>
                                    :
                                    <Label className="register-label">Password*</Label>}
                                <InputGroup className="trans">
                                    <Input className="trans" type="password"
                                           placeholder="Re-type password"
                                           onChange={this.handleChange}
                                           value={this.state.password2}
                                           name="password2"
                                    />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label className="login-label">Type</Label>
                                <Input className="input" type="text"
                                       name="type"
                                       onChange={this.handleChange}
                                       value={this.state.type}
                                       placeholder="Type"
                                />
                            </FormGroup>


                            <Button className="btn-lg btn-dark btn-block"
                                    onClick={this.handleClick}>Submit</Button>
                        </Form>
                    </div>
                {/*</div>*/}
            </div>
        )
    }
}

export default AddUser
