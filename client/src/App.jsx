import React from 'react'
import Header from '../components/Header'
import Home from '../components/Home'
import Create from '../components/Create'
import Edit from '../components/Edit'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Update from '../components/Update'
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/edit' element={<Edit />} />
        <Route path='*' element={<div>Not Found</div>} />
        <Route path='/update-song/:id' element={<Update />} />
      </Routes>
    </Router>
  )
}

export default App
