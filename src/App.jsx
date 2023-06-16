import { useState } from 'react'

import { Home } from './pages/Home'
import MyNavbar from './components/Navbar'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import AddStudent from './components/AddStudent'
import StudentList from './components/StudentList'
import StudentSearch from './components/SearchByName'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <MyNavbar/>
    <Routes>
    <Route path='/' element = {<Home/>}/>
    <Route path='addstudent' element = {<AddStudent/>}/>
    <Route path='viewAllstudent' element = {<StudentList/>}/>
    <Route path='search' element = {<StudentSearch/>}/>
    </Routes>
      
    </BrowserRouter>
    </>
  )
}

export default App
