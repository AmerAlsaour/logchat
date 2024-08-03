import React ,{useState}  from 'react'
// import './App.css'
import axios from 'axios'
function Create() {
    const [ disc , setTask ]=useState()
    const handleAdd=()=>{
        axios.post('http://localhost:4000/api/post',{ disc : disc})
        .then(result => {
          location.reload()
        })
        .catch(err =>{
            if (err.response) {
                // handle response error
              } else if (err.request) {
                // handle network error
                console.error('Network Error:', err.message);
              } else {
                // handle other errors
                console.error('Error:', err.message);
              }
            console.log(err)});
    }
  return(
    <div className='create_form'>
      <input type='text'  placeholder='Enter Task' id='' onChange={(e)=>setTask(e.target.value)}/>
      <button type='button' onClick={handleAdd}>Add</button>
    </div>
  )
};

export default Create
