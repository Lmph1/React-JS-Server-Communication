import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { api } from '../../API/api';

export default function AddCategory() {

    const [name,setName]= useState("")
    const mynav = useNavigate()

    const getName =(e)=>{
            setName(e.target.value);
    }
console.log(name);
    const addCategory = () =>{
        api
        .post("/category", { name})
        .then((res) => console.log(res.data.message))
        .then( Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Category has been saved',
            showConfirmButton: false,
            timer: 1500
          }))
        mynav('/category')
        
      }
  return (
    <div>
      <Container>
          <h1>Add New Category</h1>
          <Form>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            onChange={getName}
          
          />
        </Form.Group>

        <Button variant="primary" 
        onClick={ addCategory }
        > 
               Submit
        </Button>
      </Form>
      </Container>

    </div>
  )
}
