import { useNavigate } from "react-router-dom";
import { useAuth } from "./authProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

 const Login = () => {
//   const { setToken } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     setToken("this is a test token");
//     navigate("./Home", { replace: true });
//   };

//   setTimeout(() => {
//     handleLogin();
//   }, 3 * 1000);

  return (
    <div>
        <div className="d-flex justify-content-center align-items-center text-center vh-100" style= {{backgroundImage : "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))"}}>
            <div className="bg-white p-3 rounded" style={{width : '40%'}}>
                <h2 className='mb-3 text-primary'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            <strong>Email Id</strong>
                        </label>
                        <input 
                            type="email" 
                            placeholder="Enter Email"
                            className="form-control" 
                            id="exampleInputEmail1" 
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        /> 
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            <strong>Password</strong>
                        </label>
                        <input 
                            type="password" 
                            placeholder="Enter Password"
                            className="form-control" 
                            id="exampleInputPassword1" 
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                {/* TO add ' appostopee */}
                <p className='container my-2'>Don&apos;t have an account?</p>
                <Link to='/register' className="btn btn-secondary">Register</Link>
            </div>
        </div>
    </div>
)
};

export default Login;
