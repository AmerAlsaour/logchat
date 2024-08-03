// import React from 'react';
// import {Nav} from "react-bootstrap";
// import './home.css'
// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div className='vh-200 '>
//       <div className=''>
//         <h1 className='success'>Login Success Page</h1>
//       </div>
//       <div className='vh-100'>
//             <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
//             activeKey="/home"
//             onSelect={selectedKey => alert(`selected ${selectedKey}`)}>
//                 <div className="sidebar-sticky"><b>logo</b></div>
//             <Nav.Item>
//                 <Nav.Link href="/account">Personal account</Nav.Link>
//             </Nav.Item>
//             <hr/>
//             <Nav.Item>
//                 <Nav.Link href="/home">Home page</Nav.Link>
//             </Nav.Item>
//             <hr/>
//             <Nav.Item>
//                 <Nav.Link href="/navigation">Navigation</Nav.Link>
//             </Nav.Item>
//             <hr/>
//             <Nav.Item>
//                 <Nav.Link eventKey="link-1">Expenses</Nav.Link>
//             </Nav.Item>
//             <hr/>
//             <Nav.Item>
//                 <Nav.Link eventKey="link-2">Help</Nav.Link>
//             </Nav.Item>
//             <hr/>
//             <Nav.Item>
//                 <Nav.Link eventKey="link-3">Add</Nav.Link>
//             </Nav.Item>
//             <hr/>
//             <Nav.Item>
//               <Link to='/login' className="btn btn-light my-5">Logout</Link>
//             </Nav.Item>
//             <hr/>
//             </Nav>
//       </div>
        
//       {/* <div style= {{backgroundImage : "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))"}} className="d-flex flex-column justify-content-center align-items-center text-center vw-50 vh-100">
//         <h1>Login Success Page</h1>
//         <div className=''>
//         <h1 className='success'>Login Success Page</h1>
//       </div>
//         <Link to='/login' className="btn btn-light my-5">Logout</Link>
//       </div> */}
// </div>
//   )
// }


   

 
        


// export default Home
import React, { useEffect, useState } from 'react'
import { BsFillTrashFill, BsCircleFill } from "react-icons/bs";

import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Link } from "react-router-dom";
import axios from 'axios'
import Create from "./Create";

const data = [
  { name: 'Jan', value: 1200 },
  { name: 'Feb', value: 1500 },
  { name: 'Mar', value: 1000 },
  { name: 'Apr', value: 1400 },
  { name: 'May', value: 1600 },
  { name: 'Jun', value: 1300 },
  { name: 'Jul', value: 1700 },
  { name: 'Aug', value: 1900 },
  { name: 'Sep', value: 1500 },
  { name: 'Oct', value: 1800 },
  { name: 'Nov', value: 1400 },
  { name: 'Dec', value: 1600 },
];


const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:4000/api/get')
    .then(result=> setTodos(result.data))
    .catch(err=>console.log(err))
  },[])
  
  const handleEdite = (id)=>{
    axios.put('http://localhost:4000/api/update/'+id)
    .then(result=> {
      location.reload()
    })
    .catch(err=>console.log(err))
  }
  
  const handleDelete=(id)=>{
    axios.delete('http://localhost:4000/api/delete/'+id)
    .then( result=> {
      location.reload()
      // console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }
  const handleAddTodo = (description, value) => {
    setTodos([...todos, { description, value, id: new Date().getTime() }]);
  };

  // const handleLogout = () => {
  //   // Handle logout logic here
  // };

  return (
    <div>
        <div style={{ display: "flex" }}>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">My App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">Dashboard</Nav.Link>
              <Nav.Link href="#">Reports</Nav.Link>
            </Nav>
            <Nav>
              <Link to='/login' className="btn btn-light my-5">Logout</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{ padding: "20px", width: "100%" }}>
        <h3>Todo List</h3>
        <div>
          <input placeholder="Description" />
          <input placeholder="Value" type="number" />
          <Button onClick={() => {}}>Add Todo</Button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.description} - Value: {todo.value}
            </li>
          ))}
        </ul>

        <h3>Yearly Chart</h3>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
      
    </div>
    {/* <div className='home'>
      <h2 className=''>Todo list</h2>
      <Create/>
      <br/>
      {
        todos.length===0
        ?
        <div><h2>No Record</h2></div>
        :
        todos.map( todo=>(
          <div className='task'>
            <div className='checkbox' onClick={()=>{handleEdite(todo._id)}}>
              {todo.done=== false ? <BsCircleFill className="icon"/>
              :<p className="icon"> </p>}
              <p className={todo.done?"line_therough":""}>{todo.task}</p>
            </div>
            <div>
                <span><BsFillTrashFill className="icon"
                onClick={()=>handleDelete(todo._id)}/></span>
            </div>
            </div>
          ))
      }

    </div> */}
  </div>

  );
};

export default Home;