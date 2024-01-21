
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { Button} from 'react-bootstrap';
import { api } from '../../API/api';
import '../../../App.css';
export default function VeiwArticle() {
    const {id} = useParams();
    const [article,setArticle]= useState([]);
    useEffect(()=>{
        api.get(`/articles/${id}`).then((r)=>
        {
            console.log('data form id'+ r.data.payload)
            setArticle(r.data.payload)
            console.log('My data')
            console.log( article)
          } )},[])
           
  return (
    <div>
            <Container>
            <div className='out-box'>
                <div className='mybuttom'>
                <Button variant="secondary" as={NavLink} to='/'>Back</Button> 
                </div>
          
                <div className="box-img">
                    <img src={article.image ?? "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"} alt="" />
                </div>
                <div className="box-text">
                    <h2 className='title'>{article.title}</h2>
                    <p className='des limit-des-veiw'> {article.description}</p>

                    <h4 className='publish' >Publish: <span>{
                        article.published?'True':'Flase'
                    }
                    </span>
                    </h4>
                </div>
            </div>
            </Container>
    </div>
  )
}
