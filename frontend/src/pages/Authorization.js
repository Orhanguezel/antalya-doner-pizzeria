import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumb';
import { Table, Button, Form } from 'react-bootstrap'; // Bootstrap bileşenleri ekledim
import './Authorization.css';

const Authorization = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('/api/users'); // API endpointi projenize göre ayarlayın
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (id, role) => {
    try {
      await axios.put(`/api/users/${id}/role`, { role });
      setUsers(users.map(user => (user._id === id ? { ...user, role } : user)));
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <Breadcrumb />
      <h3>Yetkilendirme</h3>
      <p>Bu bölümde kullanıcı yetkilendirmelerini yönetebilirsiniz.</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Kullanıcı Adı</th>
            <th>Email</th>
            <th>Rol</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Form.Select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Form.Select>
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteUser(user._id)}>Sil</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Authorization;
