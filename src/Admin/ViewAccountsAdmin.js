import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientNavBar from "../NavBar/AdminNavBar";
import {FormGroup, Input, Label} from "reactstrap";

const ViewAccountAdmin = () => {
    const [accounts, setaccounts] = useState([]);
    const [selectedAccountId, setSelectedAccountId] = useState(null);

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/account/find', null, {
                    params: {

                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }})
                setaccounts(response.data); // Assuming the response is an array of users
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
                            <td>{account.moneda}</td>
                            <td>{account.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewAccountAdmin;
