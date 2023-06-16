import React, { useState } from 'react';
import axios from 'axios';
import './StudentSearch.css';

const StudentSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        'https://localhost:7048/api/Student/searchByname',
        searchQuery,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = response.data;
      if (data.isSuccess) {
        setStudents(data.result);
      } else {
        console.error('Something went wrong:', data.errorMessages);
      }

      setLoading(false);
    } catch (error) {
      console.error('Something went wrong:', error);
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <h1 className='mt-4'>Student Search</h1>
      <div className='search-container'>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch} className='search-button'>Search</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className='student-table'>
          <thead>
            <tr>
              
              <th>Name</th>
              <th>Age</th>
              <th>Course</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.course}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentSearch;
