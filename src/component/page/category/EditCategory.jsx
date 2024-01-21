import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { api } from '../../API/api';

export default function EditCategory() {
    const [name, setName] = useState("")
    const [id, setId] = useState("")
    let location = useLocation();
    const data = location.state
    const mynav = useNavigate()

    useEffect(() => {
        setId(data._id)
        setName(data.name)

    }, [location])
    const getName= (e)=>{
           setName( e.target.value)
    }

    const updateArticle = () =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You will save this category and it will show publicly!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Save it!'
          }).then((result) => {
            if (result.isConfirmed) {
                api
                .put(`/category/${id}`, {name})
                .then((res) => console.log(res.data.message))
                mynav('/category')
              Swal.fire(
                'Saved!',
                'Your category has been saved.',
                'success'
              )
            }
          })













        
      }

  return (
    <div>

<Container>
          <h1>Edit Category</h1>
          <Form>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={getName}
          
          />
        </Form.Group>

        <Button variant="primary" 
        onClick={ updateArticle}
        > 
               Submit
        </Button>
      </Form>
      </Container>

    </div>
  )
}
