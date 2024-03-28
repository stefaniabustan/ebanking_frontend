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

class AddClient extends React.Component{

    constructor(props){
        super(props)
        this.state={
            username:"",
            password1:"",
            password2:"",
            firstname:"",
            secondname:"",
            address:"",
            email:"",
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
            axios.get(`http://localhost:8080/getUser/${this.state.username}`).then(response=>{
                if(response.data.username!=="null") this.setState({
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
                                type: 'CLIENT',
                                operation: 'insert'
                            },
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(response=>{
                            console.log(response.data)
                            axios.post('http://localhost:8080/client/modify', null, {
                                params: {
                                    firstname:this.state.firstname,
                                    secondname:this.state.secondname,
                                    email:this.state.username,
                                    address:this.state.address,
                                    user_id:response.data.id,
                                    operation: 'insert'
                                },
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }).then(response=>{
                                //this.props.history.push("/")
                                window.location.reload();
                            })
                                .catch(error => {
                                    console.error("Error adding client details:", error);
                                    // Handle error for adding client details
                                });
                        })
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
                <br></br>
                {/*<div style={backgroundStyle}>*/}
                {/*<div  style={backgroundStyle} className="jumbotron">*/}
                    <Form className="register-form">
                    {/*<span>*/}
                    {/*    /!*<h3>Register</h3>*!/*/}
                    {/*</span>*/}
                        <FormGroup>
                            {this.state.usernameNotMail==="true" ?
                                <Label className="register-label">Not a valid email address*</Label> :
                                this.state.usernameExist==="false" ?
                                    <Label className="login-label">Email</Label>
                                    :
                                    <Label className="register-label">Email already exist*</Label>}
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
                            <Label className="login-label">First Name</Label>
                            <Input className="input" type="text"
                                   name="firstname"
                                   onChange={this.handleChange}
                                   value={this.state.firstname}
                                   placeholder="First name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="login-label">Second Name</Label>
                            <Input className="input" type="text"
                                   name="secondname"
                                   onChange={this.handleChange}
                                   value={this.state.secondname}
                                   placeholder="Second name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="login-label">Address</Label>
                            <Input className="input" type="text"
                                   name="address"
                                   onChange={this.handleChange}
                                   value={this.state.address}
                                   placeholder="Address"
                            />
                        </FormGroup>
                        <Button className="btn-lg btn-dark btn-block"
                                onClick={this.handleClick}>Submit</Button>
                    </Form>
                {/*</div>*/}
                {/*</div>*/}
            </div>
        )
    }
}

export default AddClient
