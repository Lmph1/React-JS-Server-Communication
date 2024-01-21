import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { NavLink, useParams } from 'react-router-dom'
import { api } from '../../API/api'
export default function () {
    const {id} = useParams();
    const [mycate,setMyCate] = useState([]);
    useEffect(()=>{
        api.get(`/category/${id}`).then((r)=>
        {
            console.log('data form id'+ r.data.payload)
            setMyCate(r.data.payload)
            console.log('My data')     
          } )},[])

  return (
    <div>
        <Container>
            <div className='mybuttom'>
                <Button variant="secondary" as={NavLink} to='/'>Back</Button> 
                </div>
                <h1>Category Name: <span>{mycate.name}</span></h1>
        </Container>
    </div>
  )
}
