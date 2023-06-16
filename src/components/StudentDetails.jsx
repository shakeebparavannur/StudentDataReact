import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './StudentDetails.css';
import { useNavigate } from "react-router-dom";

const StudentDetails = () => {
    const navigate = useNavigate()
  const { id } = useParams();
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    fetchStudentData();
  }, []);

  useEffect(() => {
    console.log(studentData); // Log whenever studentData changes
  }, [studentData]);

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7048/api/Student/${id}`
      );
      const data = response.data;
      console.log(data, "+++");
      setStudentData(data.result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = ()=>{
    if(window.confirm(`Are you sure you want to delete${studentData.name}`)){
        deleteStudent();
    }
  }

  const deleteStudent =async () => {
    try {
        await axios.delete(`https://localhost:7048/api/Student/delete/${id}`);
        console.log("Student deleted successfully!");
        alert("Student deleted successfully!")
        navigate('/viewAllstudent')
      } catch (error) {
        console.error(error);
        
      }
  };

  const handleUpdate = () => {};

  return (
    <div className="container">
      <h2 className="title">Student Details</h2>
      {studentData ? (
        <div className="details-container">
          <p>
            <strong>ID:</strong> {studentData.id}
          </p>
          <p>
            <strong>Name:</strong> {studentData.name}
          </p>
          <p>
            <strong>Age:</strong> {studentData.age}
          </p>
          <p>
            <strong>Course:</strong> {studentData.course}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="buttons-container">
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
        <button className="update-button" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

export default StudentDetails;
