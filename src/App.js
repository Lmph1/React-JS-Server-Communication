import logo from './logo.svg';
import './App.css';

import NavbarComponent from './component/NavbarComponent';
import { Route, Routes } from 'react-router-dom';
import Homepage from './component/Homepage';
import AddArticle from './component/page/article/AddArticle';
import UpdateArticle from './component/page/article/UpdateArticle';
import VeiwArticle from './component/page/article/VeiwArticle';
import CategoruHomepage from './component/page/category/CategoruHomepage';
import AddCategory from './component/page/category/AddCategory';
import VeiwCategory from './component/page/category/VeiwCategory';
import EditCategory from './component/page/category/EditCategory';

function App() {
  return (
    <div>
      <NavbarComponent/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/addArticle' element={<AddArticle/>}/>
        <Route path='/editArticle' element={<UpdateArticle/>}/>
        <Route path='/veiw/:id' element={<VeiwArticle/>}/>
        <Route path='/category' element={<CategoruHomepage/>}/>  
        <Route path='/addCategory' element={<AddCategory/>}/>
        <Route path='/veiwCate/:id' element={<VeiwCategory/>}/>
        <Route path='/editCate' element={<EditCategory/>}/>
        
      </Routes>


    </div>
  );
}

export default App;
