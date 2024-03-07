import './signUp.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'


function SignUp() {
    const navigate = useNavigate();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [error, setError] = useState('');
    function isValidEmail(email) {
        // Basic email validation using a regular expression
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      }
    function validate() {
        if (!usernameRef.current.value) {
          setError("Please enter your username");
        
        }
        if (!emailRef.current.value) {
          setError("Please enter your email");
          emailRef.current.focus();
          return false;
        } else if (!isValidEmail(emailRef.current.value)) {
          setError("Please enter a valid email");
          emailRef.current.focus();
          return false;
        }
        if (!passwordRef.current.value) {
          setError("Please enter your password");
          passwordRef.current.focus();
          return false;
        } else if (passwordRef.current.value < 4) {
          setError("Password must be at least 4 characters long");
          passwordRef.current.focus();
          return false;
        }
        if (!confirmPasswordRef.current.value) {
          setError("Please confirm your password");
          confirmPasswordRef.current.focus();
          return false;
        } else if (passwordRef.current.value !== confirmPasswordRef.current.value) {
          setError("Passwords do not match");
          confirmPasswordRef.current.focus();
          confirmPasswordRef.current.value = "";
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

function handleSubmit(e){
    e.preventDefault()
    const isValid = validate();
    if (isValid) {
        const user = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        let users = getData();
        let isExist = false;

        if (users.length) {
            isExist = users.some(el => {
                return el.username === user.username
            })
        }
        if (isExist) {
            setError("Username is already in use");
            usernameRef.current.focus();
            return;
        }
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        navigate('/login');
    }
}

  return (
    <div className="container">
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="title">Registration</h1>
      <div className="input-control">
        <label htmlFor="username">Username*</label>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          ref={usernameRef}
        />
      </div>
      <div className="input-control">
        <label htmlFor="email">Email*</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          ref={emailRef}
        />
      </div>
      <div className="input-control">
        <label htmlFor="password">Password*</label>
        <input
          type="password"
          name="password"
          placeholder="Password must be at least 4 characters"
          ref={passwordRef}
        />
      </div>
      <div className="input-control">
        <label htmlFor="password2">Confirm password*</label>
        <input
          type="password"
          name="password2"
          placeholder="Confirm your password"
          ref={confirmPasswordRef}
        />
        <div className="error">{error}</div>
      </div>
      <button className="btn">Sign Up</button>
      <Link to="/login">Sign In</Link>
    </form>
    
  </div>
  )
}

export default SignUp