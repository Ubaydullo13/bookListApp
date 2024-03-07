import './signIn.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
function SignIn() {
    const navigate = useNavigate();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    function validate() {
        if (!usernameRef.current.value) {
          setError("Please enter your username");
        }
        if (!passwordRef.current.value) {
          setError("Please enter your password");
          passwordRef.current.focus();
          return false;
        }
        
        return true;
      }

      function getData() {
        let users = [];
        
        if(localStorage.getItem("users")) {
            users = JSON.parse(localStorage.getItem("users"));
        }

        return users
      }

function handleLogin(e){
    e.preventDefault()
    const isValid = validate();
    if (isValid) {
        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }
        let users = getData();
        let isExist = false;

        if (users.length) {
            isExist = users.some(el => {
                return el.username === user.username && el.password === user.password
            })
        }
       
    }
}


  return (
    <div className="container">
    <form className="form" onSubmit={handleLogin}>
      <h1 className="title">Login</h1>
      <div className="input-control">
        <label htmlFor="username">Username*</label>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          
        />
        <div className="error"></div>
      </div>
      <div className="input-control">
        <label htmlFor="password">Password*</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          
        />
        <div className="error"></div>
      </div>
      <button className="btn">Sign In</button>
      <Link to="/register">Sign Up</Link>
    </form>
    
  </div>
  )
}

export default SignIn