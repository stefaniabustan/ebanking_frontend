import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientNavBar from "../NavBar/CustomerNavBar";
import {FormGroup, Input, Label} from "reactstrap";

const ViewAccountClient = () => {
    const [accounts, setaccounts] = useState([]);
    const [selectedAccountId, setSelectedAccountId] = useState(null);

    useEffect(() => {

            // const fetchUsers = async () => {
            //     try {
            //         const response = await axios.get(`http://localhost:8080/client/findOne?user_id=${this.state.user.id}`, {
            //             headers: {
            //                 'Content-Type': 'application/x-www-form-urlencoded'
            //             }
            //         }).then (response2=>{
            //             axios.get('http://localhost:8080/account/find', null, {
            //             params: {
            //                 client_id: response2.data.id
            //             },
            //             headers: {
            //                 'Content-Type': 'application/x-www-form-urlencoded'
            //             }})})
            //         setaccounts(response.data); // Assuming the response is an array of users
            //     } catch (error) {
            //         console.error('Error fetching users:', error);
            //     }
            // };
        const fetchUsers = async () => {
            try {
                const response1 = await axios.get(`http://localhost:8080/user/findByUsername?username=${localStorage.getItem('username')}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                const userData = response1.data;
                if (userData && userData.id) {
                    console.log(userData.username)
                    const clientResponse = await axios.get(`http://localhost:8080/client/findOne?user_id=${userData.id}`, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });


                    const response2 = await axios.get('http://localhost:8080/account/find', {
                        params: {
                            client_id: clientResponse.data.id
                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
                    setaccounts(response2.data);
                }



            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
            fetchUsers();
        }, []);



    const [editedMoneda, setEditedMoneda] = useState({});
    const [editedDescrip, setEditedDescrip] = useState({});

    const handleRowClick = (id, moneda, descr) => {
        setSelectedAccountId(id);
        setEditedMoneda({ [id]: moneda });
        setEditedDescrip({ [id]: descr });
    };

    const handleMonedaChange = (event, accId) => {
        const updateM = event.target.value;
        setEditedMoneda((prevM) => ({
            ...prevM,
            [accId]: updateM,
        }));
    };

    const handleDescrChange = (event, accId) => {
        const updateD = event.target.value;
        setEditedDescrip((prevD) => ({
            ...prevD,
            [accId]: updateD,
        }));
    };

    const handleEdit = async (accId,d, m) => {
        const updatedD = editedDescrip[accId] || d;
        const updatedM = editedMoneda[accId] || m;

        try {
            await axios.post('http://localhost:8080/account/modify', null, {
                params: {
                    id: accId,
                    description: updatedD,
                    moneda: updatedM,
                    operation: 'update'
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            window.location.reload(); // Reload the page after successful update
        } catch (error) {
            console.error('Error updating user:', error);
            // Handle error for updating user
        }
    };




    return (
        <div>
            <ClientNavBar/>
            <div className="user-table-container">
                <table className="user-table">
                    <thead>
                    <tr>
                        <th>Number</th>
                        <th>Balance</th>
                        <th>Moneda</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {accounts.map(account => (
                        <tr key={account.id} onClick={() => handleRowClick(account.id)}>
                            <td>{account.number}</td>
                            <td>{account.balance}</td>
                            <td>
                                <input
                                    className="input-table-td-profile"
                                    type="text"
                                    name="moneda"
                                    placeholder={account.moneda}
                                    value={editedMoneda[account.id] || account.moneda}
                                    onChange={(event) => handleMonedaChange(event, account.id)}
                                />
                            </td>
                            <td>

                                <input
                                    className="input-table-td-profile"
                                    type="text"
                                    name="description"
                                    placeholder={account.description}
                                    value={editedDescrip[account.id] || account.description}
                                    onChange={(event) => handleDescrChange(event, account.id)}
                                />

                            </td>
                            <td>
                                {selectedAccountId === account.id ? (
                                    <div className="action-buttons">
                                        <button className="edit-button" onClick={() => handleEdit(account.id, account.description,account.moneda)}>
                                            Save
                                        </button>
                                    </div>
                                ) : null}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewAccountClient;
