import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import CardComponent from './CardComponent'
import '../App.css'
import { api } from './API/api'
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'

export default function Homepage() {

  const [article,setArticle] = useState([]);
  
    useEffect(()=>{
        api.get('/articles').then((r)=>
        {
        
            console.log(r.data.payload)
            setArticle(r.data.payload)

            console.log('this is fetch data from api'+article)
          } 
          )},[])


    const deleteData= (id) =>{

        
      Swal.fire({
        title: 'Do you want to delete the article?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const tmpData = article.filter(article => article._id !== id)
          setArticle(tmpData)
          api.delete(`/articles/${id}`).then((r)=>{console.log(r.data.message);})
          Swal.fire('Article have been delete successfully', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
        }          
  
    return (
      <div>
        <Container>
        <div className='sub-menu'>
        <h1 className='all'>All Ariticles </h1>
        <Button className='home-btn' variant="light" as={NavLink} to='/addArticle'>New Article</Button>  
        </div>
          <CardComponent article={article} deleteData={deleteData}/>
        </Container>    
      </div>
    )
  }


  
 
