import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import CreateBooks from './pages/CreateBooks';
import DeleteBooks from './pages/DeleteBooks';
import EditBooks from './pages/EditBooks';
import ShowBooks from './pages/ShowBooks';

const App = () => {
  return (
  <Routes>
    <Route exact  path='/'  element = {<Home />}/>
    <Route path='/books/create' element = {< CreateBooks/>}/>
    <Route path='/books/details/:id' element = {<ShowBooks/>}/>
    <Route path='/books/edit/:id' element = {<EditBooks/>}/>
    <Route path='/books/delete/:id' element={<DeleteBooks/>}/>
  </Routes>
  )
}

export default App