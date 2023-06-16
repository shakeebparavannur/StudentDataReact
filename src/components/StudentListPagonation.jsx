import React, { useState, useEffect } from "react";
import axios from "axios";
import './StudentSearch.css';

const StudentListPagination = () => {
  const [students, setStudents] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchStudents();
  }, [pageNumber, pageSize]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7048/api/Student/paginated`,
        {
          params: {
            pagenumber: pageNumber,
            pagesize: pageSize,
          },
        }
      );
      const data = response.data;
      console.log(data);
      setStudents(data.students);
      setTotalCount(data.totalCount);
      setTotalPages(Math.ceil(data.totalCount / pageSize));
      console.log(totalPages, "totalPages");
      console.log(totalCount, "totalCount");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4 mx-6">Student List</h1>
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.course}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-link text-primary mr-2"
          disabled={pageNumber === 1}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="btn btn-link text-primary ml-2"
          disabled={pageNumber === totalPages}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default StudentListPagination;
