import axios from "axios";
import React, { useState, useEffect } from "react";
import "./StudentSearch.css";
import { Link } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);

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
      setStudents(data.result);
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
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              {/* <Link to={`/studentdetails/${student.id}`}> */}
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.dob.split("T")[0]}</td>
              <td>{student.course}</td>
              <td><Link className="details-link" to={`/studentdetails/${student.id}`}>Details</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
