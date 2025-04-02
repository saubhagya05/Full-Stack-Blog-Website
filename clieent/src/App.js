import React from 'react'
import {Route,Routes} from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Header from"./Components/Header";
import Register from "./Pages/Register";
import AddCategory from './Pages/AddCategory';
import AddBlog from './Pages/AddBlog';
import SingleBlog from './Pages/SingleBlog';
import PrivateRoute from './services/ProtectedRoutes';

const App = () => {
  return (
   <>
   <Header/>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/*Protected routes*/}
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="/add-category" element={<AddCategory />} />
      </Route>
    </Routes>
   </>
  )
}

export default App