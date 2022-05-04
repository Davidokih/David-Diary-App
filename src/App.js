import React from 'react'
import InUp from './components/HolderInUp/InUp'
import Home from './components/HomePage/Home'
import AddEntries from './components/AddEntries/AddEntries'
import Profile from './components/HomePage/SideBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Detail from './components/Details/Detail'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<InUp />} />
          <Route path="/addEntries" element={<AddEntries />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App