
import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import { api } from '../../API/api';
import '../../../App.css'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AddArticle() {

   const [title,setTitle]= useState("");
  const [description,setDescription]= useState("");
  const [published,setPublished]= useState(false);
  const [image,setImage]= useState("");
  const [imageUrl,setImageUrl] = useState();
  const mynav = useNavigate();


  const getTitle =(e)=>{
    setTitle(e.target.value);
    console.log({title});
  }

  const getDes =(e)=>{
    setDescription(e.target.value);
  }
  console.log({description});

  const getPublic =(e)=>{
    setPublished(e.target.checked);
  }
  console.log({published});

  const addArticle = () =>{
    api
    .post("/articles",{ title, description, published, image })
    .then((res) => console.log(res.data.message))
 
    .then(
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Article has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    )
    mynav('/')

  }

  const cancel = () =>{
    mynav('/')
  }


  const getImage = (e) => {
  
    const formData = new FormData();
    formData.append("image",e.target.files[0]);
    api.post("/images",formData).then( (f) =>{ 
        console.log(f.data.payload.url)
        setImage(f.data.payload.url)
   })
   setImageUrl(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <div>
      <Container  className='w-50' style={{marginTop:'50px'}}>
      <h2>Add New Article</h2>
      <Form>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="title"
            onChange={getTitle}
         
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="description"
            onChange={getDes}
          />
        </Form.Group>
        <img alt="preview" width={350} src={imageUrl??"https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png" }  tyle={{ height: "200px" }} />
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Image File</Form.Label>
          <Form.Control type="file"
          onChange={getImage?? "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"}
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Is Published"
            onChange={getPublic}
          />
        </Form.Group>


<div className='my-add-btn'>
  <div className="we-btn">
        <Button className='m-2' variant="danger" 
        onClick={cancel}
        > 
              Cancle
        </Button>
        <Button variant="primary" 
        onClick={ addArticle}
        > 
               Submit
        </Button>
        </div>
</div>
      </Form>
    </Container>


    </div>
  )
  
}
