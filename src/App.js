import './App.css';
import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { addUser, deleteUser, updateUser } from './features/User';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('');
  const [updatedUsername, setUpdatedUsername] = useState('');

  const dispatch = useDispatch();

  const users = useSelector(state => state.users)
  const { value } = users;

  // Add User
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { id: uuidv4(), name, username }
    if (name && username) {
      dispatch(addUser(newUser));
      setName('')
      setUsername('')
    }
  }
  const handleChange = (e) => {
    const newValue = e.target.value;
    const inputName = e.target.name;
    console.log(e.target);
    if (inputName === "name") {
      setName(newValue)
    } else if (inputName === "username") {
      setUsername(newValue)
    }
  }

  return (
    <div className="App">
      <h1>App</h1>
      <div className="add-user">
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="name" value={name} onChange={handleChange} />
          <input type="text" name="username" placeholder="username" value={username} onChange={handleChange} />
          <button>Add User</button>
        </form>
      </div>
      <div className="display-user">
        {value.map(user => {
          return (
            <div className="user" key={user.id}>
              <h1>{user.name}</h1>
              <h2>{user.username}</h2>
              <input type="text" placeholder="New username" name="updatedUsername" onChange={(e) => setUpdatedUsername(e.target.value)} />
              <button onClick={() => dispatch(updateUser({ user, updatedUsername }))}>Update Username</button>
              <button onClick={() => dispatch(deleteUser(user.id))}>Delete User</button>
            </div>
          )
        })}

      </div>
    </div>
  );
}

export default App;
