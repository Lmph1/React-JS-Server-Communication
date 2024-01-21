
import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import '../../../App.css'
import { api } from '../../API/api';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';

export default function UpdateArticle() {
    const [article,setArticle]= useState([]);
    const [id,setId] = useState("");
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
    

      const location = useLocation();
      const Data = location.state
      useEffect(() => {
          setId(Data._id)
          setTitle(Data.title)
          setDescription(Data.description)
          setImage(Data.image)
          setPublished(Data.isPublished)
      }, [location])
  
      const updateArticle = () =>{
    
            Swal.fire({
                title: 'Are you sure?',
                text: "You will save this article and it will show publicly!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Save it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    api
                    .patch(`/articles/${id}`, { title, description, published, image })
                    .then((res) => console.log(res.data.message))
                    mynav('/')
                    Swal.fire(
                    'Saved!',
                    'Your article has been saved.',
                    'success'
                  )
                }
              }) 
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
        <h2>Edit Article</h2>
      <Form> 
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="title"

            value={title}
            onChange={getTitle}
          
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
          value={description}
        //   value={article.description}
            type="text"
            placeholder="description"
            onChange={getDes}
          />
        </Form.Group>
        <img alt="preview" width={350} src={image??"https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png" }  tyle={{ height: "200px" }} />
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Image File</Form.Label>
          <Form.Control type="file"
          onChange={getImage?? "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"}
          />
        </Form.Group>
       
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            checked={article.published}
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
        onClick={updateArticle}
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
