import axios from "axios";
import React from "react";
import './StudentSearch.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const StudentList = () => {
  const [students, setStudemts] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);
  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7048/api/Student/Stduents"
      );
      const data = response.data;
      console.log(data);
      setStudemts(data.result);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="container">
      <h1 className="mt-4">Student list All</h1>
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>DOB(yy/mm/dd)</th>
            <th>Course</th>
          </tr>

        </thead>
        <tbody>
        {students.map((student) => (
            // <Link  to={`/studentdetails/${student.id}`}>
        <tr>
          <td>{student.id}</td>
          <td>{student.name}</td>
          <td>{student.age}</td>
          <td>{student.dob.split("T")[0]}</td>
          <td>{student.course}</td>
        </tr>
        // </Link>
      ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default StudentList;
