import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  token: string;
}

const roles = ['employee', 'manager', 'admin'];

const RegisterUserForm: React.FC<Props> = ({ token }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('employee');
  const [status, setStatus] = useState('');

  const handleRegister = async () => {
    const randomPassword = Math.random().toString(36).slice(-10) + 'A1!';

    try {
      const userRes = await axios.post(
        'http://localhost:8084/admin/realms/Time/users',
        {
          username,
          enabled: true,
          credentials: [
            {
              type: 'password',
              value: randomPassword,
              temporary: true,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Get created user ID
      const locationHeader = userRes.headers['location'];
      const userId = locationHeader.split('/').pop();

      // Assign role
      const roleRes = await axios.get(
        `http://localhost:8084/admin/realms/Time/roles/${role}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const roleObj = roleRes.data;

      await axios.post(
        `http://localhost:8084/admin/realms/Time/users/${userId}/role-mappings/realm`,
        [roleObj],
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStatus(`User ${username} created with temporary password: ${randomPassword}`);
    } catch (err) {
      console.error(err);
      setStatus('Failed to create user');
    }
  };

  return (
    <div>
      <h3>Register New User</h3>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        {roles.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
      <button onClick={handleRegister}>Register</button>
      <p>{status}</p>
    </div>
  );
};

export default RegisterUserForm;
