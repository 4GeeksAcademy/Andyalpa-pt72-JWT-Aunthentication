import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Signup = () => {
  const { store, actions } = useContext(Context);  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async () => {
     actions.signUp(email, password)
     navigate('/')
  };

  return (
    <div className="text-center mt-5">
        <div class="form-floating mb-3">
        <input type="email" onChange={(e) => setEmail(e.target.value)} class="form-control" id="floatingInput" placeholder="name@example.com"/>
        <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
        <input type="password" onChange={(e) => setPassword(e.target.value)} class="form-control" id="floatingPassword" placeholder="Password"/>
        <label for="floatingPassword">Password</label>
        </div>
        <button onClick={() => handleSubmit()} className='btn btn-danger'>Sign Up</button>
    </div>
  );
};

export default Signup;
