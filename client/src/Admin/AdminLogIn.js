import React, {useState} from 'react'

const AdminLogIn = ({handleLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className='adminLogIn'>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='adminLogIn_username'
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className='adminLogIn_submit'>Login</button>
    </form>
  );
}

export default AdminLogIn;