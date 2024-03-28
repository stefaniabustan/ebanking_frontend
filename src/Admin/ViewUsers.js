import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavBar from "../NavBar/AdminNavBar";
import {FormGroup, Input, Label} from "reactstrap";

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    function componentDidMount(){
        const isLoggedIn = localStorage.getItem("username");

        // Dacă utilizatorul nu este autentificat, redirecționăm către pagina de autentificare
        if (!isLoggedIn) {
            this.props.history.push("/");
        }
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/user/allUsers');
                setUsers(response.data); // Assuming the response is an array of users
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const [editedUsername, setEditedUsername] = useState({});
    const [editedPass, setEditedPass] = useState({});

    const handleRowClick = (userId, username, password) => {
        setSelectedUserId(userId);
        setEditedUsername({ [userId]: username });
        setEditedPass({ [userId]: password });
    };

    const handleUsernameChange = (event, userId) => {
        const updatedUsername = event.target.value;
        setEditedUsername((prevEditedUsername) => ({
            ...prevEditedUsername,
            [userId]: updatedUsername,
        }));
    };
    const handlePassChange = (event, userId) => {
        const updatedPass = event.target.value;
        setEditedPass((prevEditedPass) => ({
            ...prevEditedPass,
            [userId]: updatedPass,
        }));
    };
    const handleEdit = async (userId, u, p, t) => {
        const updatedUsername = editedUsername[userId] || u; // Verificăm dacă a fost modificat username-ul
        const updatedPass = editedPass[userId] || u; // Verificăm dacă a fost modificat username-ul

        try {
            await axios.post('http://localhost:8080/user/modify', null, {
                params: {
                    id: userId,
                    username: updatedUsername,
                    password: updatedPass,
                    type: t,
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


    const handleDelete = async (userId , userType)=> {
        try {
            if (userType === "ADMIN") {
                await axios.post('http://localhost:8080/admin/modify', null, {
                    params: {
                        user_id: userId,
                        operation: 'delete'
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(response=> {
                    axios.post(
                        'http://localhost:8080/user/modify',
                        new URLSearchParams({
                            id: userId,
                            operation: 'delete'
                        }).toString(),
                        {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        })})
                }
            else{
                if (userType === "CLIENT")
                {
                    await axios.post('http://localhost:8080/client/modify', null, {
                        params: {
                            user_id: userId,
                            operation: 'delete'
                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(response=> {
                        axios.post(
                            'http://localhost:8080/user/modify',
                            new URLSearchParams({
                                id: userId,
                                operation: 'delete'
                            }).toString(),
                            {
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            })})
                }
                else
                {
                    await axios.post('http://localhost:8080/employee/modify', null, {
                        params: {
                            user_id: userId,
                            operation: 'delete'
                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(response=> {
                        axios.post(
                            'http://localhost:8080/user/modify',
                            new URLSearchParams({
                                id: userId,
                                operation: 'delete'
                            }).toString(),
                            {
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            })})
                }

            }
            console.log(`Deleted user with ID: ${userId}`);
            window.location.reload(); // Reload the page after successful deletion
        } catch (error) {
            console.error('Error deleting user:', error);
            // Handle error for deleting user
        }

    };


    return (

        <div>
            <AdminNavBar/>
        <div className="user-table-container">
            <table className="user-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id} onClick={() => handleRowClick(user.id)}>
                        <td>{user.id}</td>
                        <td>
                                <input
                                    className="input-table-td"
                                    type="text"
                                    name="username"
                                    placeholder={user.username}
                                    value={editedUsername[user.id] || user.username}
                                    onChange={(event) => handleUsernameChange(event, user.id)}
                                />
                        </td>
                        <td>

                            <input
                                className="input-table-td"
                                type="text"
                                name="password"
                                placeholder={user.password}
                                value={editedPass[user.id] || user.password}
                                onChange={(event) => handlePassChange(event, user.id)}
                                />

                        </td>
                        <td>{user.type}</td>
                        <td>
                            {selectedUserId === user.id ? (
                                <div className="action-buttons">
                                    <button className="edit-button" onClick={() => handleEdit(user.id,user.username, user.password, user.type)}>
                                        Save
                                    </button>
                                    <button className="delete-button" onClick={() => handleDelete(user.id, user.type)}>
                                        Delete
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

export default UserTable;
