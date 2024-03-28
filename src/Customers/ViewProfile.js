import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavBar from "../NavBar/CustomerNavBar";
import {FormGroup, Input, Label} from "reactstrap";

const ViewProfile = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/findByUsername?username=${localStorage.getItem('username')}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                const userData = response.data;
                console.log(userData.username)
                if (userData && userData.id) {

                    const clientResponse = await axios.get(`http://localhost:8080/client/findOne?user_id=${userData.id}`, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });

                        const clientData = clientResponse.data;

                        const combinedData = {
                            ...userData,
                            ...clientData
                        };
                    setUsers(prevUsers => [...[], combinedData]);
                }

            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const [editedFirstname, setEditedFirstname] = useState({});
    const [editedSecondname, setEditedSecondname] = useState({});
    const [editedAddressname, setEditedAddressname] = useState({});

    const handleRowClick = (userId, firstname, secondname, address) => {
        setSelectedUserId(userId);
        setEditedFirstname({ [userId]: firstname });
        setEditedSecondname({ [userId]: secondname });
        setEditedAddressname({ [userId]: address });
    };

    const handleFirstNameChange = (event, userId) => {
        const updatedname = event.target.value;
        setEditedFirstname((prevEditedFirstname) => ({
            ...prevEditedFirstname,
            [userId]: updatedname,
        }));
    };
    const handleSecondNameChange = (event, userId) => {
        const updatesdname = event.target.value;
        setEditedSecondname((prevEditedSecondUsername) => ({
            ...prevEditedSecondUsername,
            [userId]: updatesdname,
        }));
    };
    const handleAddressChange = (event, userId) => {
        const updatedaddr= event.target.value;
        setEditedAddressname((prevEditedAddressname) => ({
            ...prevEditedAddressname,
            [userId]: updatedaddr,
        }));
    };
    const handleEdit = async (userId, f,s,a) => {
        const updatedFirstName = editedFirstname[userId] || f;
        const updatedSecName = editedSecondname[userId] || s;
        const updatedAddress = editedAddressname[userId] || a;

        try {
            await axios.post('http://localhost:8080/client/modify', null, {
                params: {
                    id: userId,
                    firstname: updatedFirstName,
                    secondname: updatedSecName,
                    address: updatedAddress,
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
            <AdminNavBar/>
            <div className="user-table-container">
                <table className="user-table">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Firstname</th>
                        <th>Secondname</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id} onClick={() => handleRowClick(user.id)}>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>
                                <input
                                    className="input-table-td-profile"
                                    type="text"
                                    name="firstname"
                                    placeholder={user.firstname}
                                    value={editedFirstname[user.id] || user.firstname}
                                    onChange={(event) => handleFirstNameChange(event, user.id)}
                                />
                            </td>
                            <td>

                                <input
                                    className="input-table-td-profile"
                                    type="text"
                                    name="secondname"
                                    placeholder={user.secondname}
                                    value={editedSecondname[user.id] || user.secondname}
                                    onChange={(event) => handleSecondNameChange(event, user.id)}
                                />

                            </td>
                            <td>

                                <input
                                    className="input-table-td-profile"
                                    type="text"
                                    name="address"
                                    placeholder={user.address}
                                    value={editedAddressname[user.id] || user.address}
                                    onChange={(event) => handleAddressChange(event, user.id)}
                                />

                            </td>
                            <td>
                                {selectedUserId === user.id ? (
                                    <div className="action-buttons">
                                        <button className="edit-button" onClick={() => handleEdit(user.id, user.firstname,user.secondname, user.address)}>
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

export default ViewProfile;
