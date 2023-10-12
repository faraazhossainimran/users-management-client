import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email}
    console.log(user); 
    fetch('http://localhost:5000/users', {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log('indie post',data);
      const newUsers = [...users, data]
      setUsers(newUsers)
      form.reset()
    })
  }
  return (
    <>
      <h1>Users Management System {users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" placeholder="name" name="name" id=""></input>
        <br></br>
        <input type="email" placeholder="email" name="email" id=""></input>
        <br></br>
        <input type="submit" value="Add User"></input>
      </form>
      {users.map(user => <p key={user.id}>{user.id} : {user.name} :{user.email}</p>)}
    </>
  );
}

export default App;
