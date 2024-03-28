import React from "react"
import {Form,FormGroup,Input,Label,Button,InputGroup} from "reactstrap"
import {Link} from "react-router-dom"
import { FaUser,FaLock } from "react-icons/fa";
import axios from "axios"

import BackgroundImg from '../assets/img3.jpeg';
// import Jumbotron from "react-bootstrap/Jumbotron";
import NavBarNotLogged from "../NavBar/CustomerNavBar";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "100%",
    backgroundImage: `url(${BackgroundImg})`
};

class AddAcountClient extends React.Component{

    constructor(props){
        super(props)
        this.state={
            user:"",
            number:"",
            number2:"",
            balance:"",
            description:"",
            moneda:"",
            numberExist:"false",
            numberError:"true",
            monedaError:"false",
            usernameNotMail:"false",
            savedAccount:{}
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleClick=this.handleClick.bind(this)

    }


    componentDidMount(){
        axios.get(`http://localhost:8080/getUser/${localStorage.getItem('username')}`).then(response=>{
            // console.log(response.data)
            this.setState({
                user:response.data
            })
        })
    }
    handleClick(){
        if(this.state.moneda === "RON" || this.state.moneda === "EURO" )
        {
            this.setState({
                monedaError:"false"
            })
            axios.get(`http://localhost:8080/getAccount/${this.state.number}`).then(response1=>{
            if(response1.data.number!=="null") this.setState({
                numberExist:"true"
            })
            else{
                this.setState({
                    numberExist:"false"
                })
                if(this.state.number===this.state.number2){
                    this.setState({
                        numberError:"true"
                    })


                    axios.get(`http://localhost:8080/client/findOne?user_id=${this.state.user.id}`, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then (response2=>{
                        axios.post('http://localhost:8080/account/modify',  null,{
                        params: {
                            number: this.state.number,
                            description: this.state.description,
                            moneda: this.state.moneda,
                            balance: this.state.balance,
                            client_id: response2.data.id,
                            operation: 'insert'
                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(response=>{ //sa o pun dupa!!
                            window.location.reload();
                        })
                        .catch(error => {
                            console.error("Error adding account details:", error);
                            // Handle error for adding client details
                        })});
                }
                else this.setState({
                    numberError:"false"
                })

            }
        })}

        else this.setState({
            monedaError:"true"
        })
    }

    handleChange(event){
        // console.log(event.target.value)
        const {name,value}=event.target
        this.setState({
            [name]:value
        })
    }
    render()
    {
        return(
            <div className="body">
                <NavBarNotLogged/>
                {/*<div style={backgroundStyle}>*/}
                <br></br><br></br>
                <div  className="adduser">
                    <Form className="register-form">
                    <span>
                        <h3>Create Account</h3>
                    </span>
                        <FormGroup>
                            {this.state.numberExist==="false" ?
                                    <Label className="login-label">Number Account</Label>
                                    :
                                    <Label className="register-label">Number Account already exist*</Label>}
                            <Input className="input" type="text"
                                   name="number"
                                   onChange={this.handleChange}
                                   value={this.state.number}
                                   placeholder="Number Account"
                            />
                        </FormGroup>

                        <FormGroup>
                            {this.state.numberError==="true" ?
                                <Label className="login-label">Number Account*</Label>
                                :
                                <Label className="register-label">Number Account*</Label>}
                            <InputGroup className="trans">
                                <Input className="trans" type="text"
                                       placeholder="Re-type number account"
                                       onChange={this.handleChange}
                                       value={this.state.number2}
                                       name="number2"
                                />
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label className="login-label">Balance</Label>
                            <Input className="input" type="text"
                                   name="balance"
                                   onChange={this.handleChange}
                                   value={this.state.balance}
                                   placeholder="Balance"
                            />
                        </FormGroup>

                        <FormGroup>
                            {this.state.monedaError==="true" ?
                                <Label className="register-label">You can choose RON/EURO</Label>
                                :
                                <Label className="login-label">Moneda</Label>}

                            <Input className="input" type="text"
                                   name="moneda"
                                   onChange={this.handleChange}
                                   value={this.state.moneda}
                                   placeholder="RON/EURO"
                            />
                        </FormGroup>


                        <FormGroup>
                            <Label className="login-label">Description</Label>
                            <Input className="input" type="text"
                                   name="description"
                                   onChange={this.handleChange}
                                   value={this.state.description}
                                   placeholder="Description account"
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

export default AddAcountClient
