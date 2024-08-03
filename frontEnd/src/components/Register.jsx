import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        console.log(name,email,password);
        event.preventDefault();
        fetch('http://localhost:4000/api/register',{
            method : 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({name, email, password})})
            .then(result => {
            console.log( "this the amer"+result+result.data);
            if(result.data === "Already registered"){
                alert("E-mail already registered! Please Login to proceed.");
                // console.log(result.data);
                navigate('/login');
            }
            else{
                    alert("Registered successfully! Please Login to proceed.")
                    console.log(result.data);
                    navigate('/login');
                }
})
    //     axios.post( 'http://localhost:3002/register', {name, email, password})
    //     .then(result => {
    //         console.log(result);
    //         if(result.data === "Already registered"){
    //             alert("E-mail already registered! Please Login to proceed.");
    //             navigate('/login');
    //         }
    //         else{
    //             alert("Registered successfully! Please Login to proceed.")
    //             navigate('/login');
    //         }
            
    //     })
    //     .catch(err => console.log(err));
    }


    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100" style= {{backgroundImage : "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))"}}>
                <div className="bg-white p-3 rounded" style={{width : '40%'}}>
                    <h2 className='mb-3 text-primary'>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong >Name</strong>
                            </label>
                            <input 
                                type="text"
                                placeholder="Enter Name"
                                className="form-control" 
                                id="exampleInputname" 
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                            /> 
                        </div>
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
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>

                    <p className='container my-2'>Already have an account ?</p>
                    <Link to='/login' className="btn btn-secondary">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register