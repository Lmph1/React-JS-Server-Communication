import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { api } from '../../API/api';

export default function CategoruHomepage() {
    const [category,setCategory] = useState([]);
    const [editCate,seteditCate] = useState([]);
    
    const mynav = useNavigate()
    console.log("before throw");
    console.log(editCate);

    useEffect(()=>{
        api.get('/category').then((r)=>
        {
            console.log(r.data.payload)
            setCategory(r.data.payload)
          } 
          )},[])
          const deleteCate= (id) =>{

            Swal.fire({
                title: 'Do you want to delete the category?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Delete',
                denyButtonText: `No`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const tmpCate = category.filter(category => category._id !== id)
                    setCategory(tmpCate)
                    api.delete(`/category/${id}`).then((r)=>{console.log(r.data.message);})
                  Swal.fire('Category have been delete successfully', '', 'success')
                } else if (result.isDenied) {
                  Swal.fire('Changes are not saved', '', 'info')
                }
              })


     
          }      

          const onUpdate = (item) => {
            mynav("/editCate", { state: { ...item } });
        }


  return (
    <div>
          <Container>
        <div className='sub-menu'>
        <h1 className='all'>All Category </h1>
        <Button className='home-btn' variant="light" as={NavLink} to='/addCategory'>New Category</Button>  
        </div>

        <Row className='mt-5'>
             {  
             category.map((item,index)=>(
              <Col key={index} xl={3} lg={3} md={3} sm={6}>
              <Card className='categoriesCard'>
                <Card.Body>
                  <Card.Title className='text-center'>{item.name}</Card.Title>
                  <div className='mybtn-group'>
                  <Button className='mybtn w-100 mt-3 mb-2' onClick={()=>{onUpdate(item)}} variant="primary">Edit</Button>
                  <Button className='mybtn w-100 mb-2' as={NavLink} to={`/veiwCate/${item._id}`} variant="warning">View</Button>
                  <Button className='mybtn w-100' onClick={()=>{deleteCate(item._id)}} variant="danger">Delete</Button>
                  </div>
                </Card.Body>
              </Card>
              </Col>
             ))}
              </Row>
        </Container>

    </div>
  )
}
