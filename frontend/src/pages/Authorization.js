import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumb';

const Authorization = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/auth/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // JWT token'ınızı ekleyin
          }
        });

        console.log('API response:', response.data);

        // API yanıtının geçerli olup olmadığını kontrol edin
        if (Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          setUsers([]); // Geçersiz yanıt formatı durumunda boş bir dizi ayarlayın
          throw new Error('Invalid response format');
        }
      } catch (error) {
        setError('Error fetching users');
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (id, role) => {
    try {
      await axios.put(`/api/auth/users/role/${id}`, { role }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // JWT token'ınızı ekleyin
        }
      });
      setUsers(users.map(user => (user._id === id ? { ...user, role } : user)));
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`/api/auth/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // JWT token'ınızı ekleyin
        }
      });
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
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Kullanıcı Adı</th>
            <th>Email</th>
            <th>Rol</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleDeleteUser(user._id)}>Sil</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Authorization;
