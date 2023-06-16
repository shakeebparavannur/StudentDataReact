import React from 'react'
import AddStudent from '../components/AddStudent'
import StudentListPagonation from '../components/StudentListPagonation'
import StudentList from '../components/StudentList'
import StudentSearch from '../components/SearchByName'

export const Home = () => {
  return (
    <div>
        Home Page
        {/* <AddStudent/> */}
        <StudentListPagonation/>
        {/* <StudentList/> */}
        {/* <StudentSearch/> */}
    </div>
  )
}
