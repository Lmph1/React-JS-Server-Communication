import React, { useEffect } from 'react'
import { Button, Card, Col, Navbar, Row } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import '../App.css'

export default function CardComponent({article,deleteData}) {
  const mynav = useNavigate();
  const onUpdate = (item) => {
    mynav("/editArticle", { state: { ...item } });
}

  return (
    <div className='mt-5 row'>
             {   
             article.map((item,i)=>
             (  
              //  <Col xl={2} lg={2} md={3} sm={4}>
              <div key={i} className="col-2 mt-4" >
                <Card  >
                <Card.Img variant="top" src={item.image?? "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png" } />
                <Card.Body>
                    <Card.Title className='limit-title'>{item.title}</Card.Title>
                    <Card.Text className='limit-des'>
                            {item.description}
                    </Card.Text>  
                      <div className='sna-btn'>
                    <Button   className='w-100 mb-2 ' onClick={()=>onUpdate(item)} variant="primary">Edit</Button>
                    <Button className='w-100  mb-2'  as={NavLink} to={`veiw/${item._id}`}variant="warning">Veiw</Button>
                    <Button className='w-100' onClick={()=>deleteData(item._id)}  variant="danger">Delete</Button>
                    </div>
                 
                </Card.Body>
                </Card>
                </div>    
           ))
            }
    </div>
  )
}
