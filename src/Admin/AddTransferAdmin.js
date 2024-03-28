import React from "react"
import {Form,FormGroup,Input,Label,Button,InputGroup} from "reactstrap"
import {Link} from "react-router-dom"
import { FaUser,FaLock } from "react-icons/fa";
import axios from "axios"

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

class AddTransferAdmin extends React.Component{

    constructor(props){
        super(props)
        this.state={
            numberBenef:"",
            numberDistrib:"",
            value:"",
            description:"",
            moneda:"",
            numberExist:"false",
            numberExist2:"false",
            numberError:"true",
            monedaError:"false",
            usernameNotMail:"false",
            fonduriInsuf:"false",
            savedAccount:{}
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleClick=this.handleClick.bind(this)

    }


    componentDidMount(){
        axios.get(`http://localhost:8080/getUser/${localStorage.getItem('username')}`).then(response=>{
            console.log(response.data)
            this.setState({
                user:response.data
            })
        })
    }
    handleClick(){
        if(this.state.moneda === "RON" || this.state.moneda === "EURO" )
        {
            this.setState({monedaError:"false"})
            axios.get(`http://localhost:8080/getAccount/${this.state.numberDistrib}`).then(responseDistrib=>{
                if(responseDistrib.data.number==="null")
                    this.setState({numberExist:"true"})
                else{
                    this.setState({numberExist:"false"})
                    axios.get(`http://localhost:8080/getAccount/${this.state.numberBenef}`).then (responseBenef => {
                        if (responseBenef.data.number === "null")
                            this.setState({numberExist2: "true"})
                        else {
                            const dau = parseInt(responseDistrib.data.balance, 10) - parseInt(this.state.value, 10);
                            const primesc = parseInt(responseBenef.data.balance, 10)+parseInt(this.state.value, 10);

                            // trec sthis.state.moneda in tipul de moneda pe care il am la distrib
                            // if (responseDistrib.data.moneda === "EURO" && this.state.moneda === "RON") {
                            //     dau = value/ 4.97;
                            // } else {
                            //     if (responseDistrib.data.moneda === "RON" && this.state.moneda === "EURO") {
                            //         this.setState({value1: this.state.value * 4.97});
                            //     }
                            //     else
                            //         this.setState.value1=this.state.value
                            //
                            // }
                            //
                            // if (responseBenef.data.moneda === "EURO" && this.state.moneda === "RON") {
                            //     this.setState({value2: this.state.value / 4.97});
                            // } else {
                            //     if (responseBenef.data.moneda === "RON" && this.state.moneda === "EURO") {
                            //         this.setState({value2: this.state.value * 4.97});
                            //     }
                            //     else
                            //         this.setState.value2=this.state.value
                            // }

                            console.log(responseDistrib.data.id,"  hai   ",dau.toString())

                            const dauString= dau.toString()
                            const primescString= primesc.toString()

                            if (dau < 0) {
                                this.setState({fonduriInsuf: "true"})
                            } else {
                                axios.post('http://localhost:8080/account/modify', null, {
                                    params: {
                                        id: responseDistrib.data.id,
                                        balance: dauString,
                                        operation: 'update'
                                    },
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }).then(r => {
                                    axios.post('http://localhost:8080/account/modify', null, {
                                        params: {
                                            id: responseBenef.data.id,
                                            balance: primescString,
                                            operation: 'update'
                                        },
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded'
                                        }
                                    }).then(r2 => {
                                        axios.post('http://localhost:8080/transfer/modify', null, {
                                            params: {
                                                id_account_benef: responseBenef.data.id,
                                                id_account_distrib: responseDistrib.data.id,
                                                description: this.state.description,
                                                moneda: this.state.moneda,
                                                value: this.state.value,
                                                operation: 'insert'
                                            },
                                            headers: {
                                                'Content-Type': 'application/x-www-form-urlencoded'
                                            }
                                        }).then(response => { //sa o pun dupa!!
                                            window.location.reload();
                                        })
                                            .catch(error => {
                                                console.error("Error adding account details:", error);
                                                // Handle error for adding client details
                                            });
                                    })
                                })

                            }
                        }
                    })
                }
            })
        }
        else
            this.setState({monedaError:"true"})
    }

    handleChange(event){
        console.log(event.target.value)
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
                <br></br>
                <div  className="adduser">
                    <Form className="register-form">
                    <span>
                        <h3>Create Transfer</h3>
                    </span>
                        <FormGroup>
                            {this.state.numberExist==="false" ?
                                <Label className="login-label">Source Account</Label>
                                :
                                <Label className="register-label">Number Account doesn't exist*</Label>}
                            <Input className="input" type="text"
                                   name="numberDistrib"
                                   onChange={this.handleChange}
                                   value={this.state.numberDistrib}
                                   placeholder="Number Source Account"
                            />
                        </FormGroup>


                        <FormGroup>
                            {this.state.numberExist2==="false" ?
                                <Label className="login-label">Destination Account</Label>
                                :
                                <Label className="register-label">Number Account doesn't exist*</Label>}
                            <Input className="input" type="text"
                                   name="numberBenef"
                                   onChange={this.handleChange}
                                   value={this.state.numberBenef}
                                   placeholder="Number Destination Account"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label className="login-label">Value</Label>
                            <Input className="input" type="text"
                                   name="value"
                                   onChange={this.handleChange}
                                   value={this.state.value}
                                   placeholder="Value"
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

export default AddTransferAdmin
