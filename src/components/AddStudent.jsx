import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import * as Yup from "yup";
import './AddStudent.css';

const validationSchema = Yup.object().shape({
  Name: Yup.string().required("Name is required"),
  DOB: Yup.date().required("DOB is required"),
  Course: Yup.string().oneOf(
    ["Science", "Commerce", "Humanities"],
    "Course needs to be selected"
  ),
});

const AddStudent = () => {
  const [age, setAge] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      Name: "",
      DOB: "",
      Course: "Select the Course",
      Age: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values,{ resetForm }) => {
      console.log(values, "+++");
      const { age, ...datas } = values;
      try {
        if (values.Course === "Select the Course") {
          formik.setFieldError("Course", "Course needs to be selected");
          return;
        }
        const response = await axios.post(
          "https://localhost:7048/api/Student/Addstudent",
          datas
        );
        console.log(response);
        resetForm({values: {...formik.initialValues,Age:"",} });
        setSuccessMessage("Student added successfully")
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errorMessages &&
          error.response.data.IsSuccess == false
        ) {
          const errorMessages = error.response.data.errorMessages;
          setErrorMessage(errorMessages);
          console.log(errorMessages);
        } else {
          setErrorMessage("An Error occurred");
        }
      }
    },
  });

  const calculateAge = (dob) => {
    const currentDate = new Date();
    const birthDate = new Date(dob);

    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age.toString();
  };

  const handleDOBChange = (e) => {
    const dob = e.target.value;
    const age = calculateAge(dob);
    setAge(age);
    formik.setFieldValue("DOB", dob);
    formik.setFieldValue("Age", age);
  };

  return (
    <div className="container">
      <h1>Add Student</h1>
      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage("")} dismissible>
          {successMessage}
        </Alert>
      )}
     
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Label>Student Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter student name"
            name="Name"
            {...formik.getFieldProps("Name")}
            className={formik.touched.Name && formik.errors.Name ? "is-invalid" : ""}
          />
          {formik.touched.Name && formik.errors.Name && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.Name}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            onChange={handleDOBChange}
            placeholder="Select the date of birth"
            name="DOB"
            value={formik.values.DOB}
            className={formik.touched.DOB && formik.errors.DOB ? "is-invalid" : ""}
          />
          {formik.touched.DOB && formik.errors.DOB && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.DOB}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="text"
            placeholder="Age"
            name="Age"
            value={age}
            readOnly
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Course</Form.Label>
          <Form.Select
            name="Course"
            {...formik.getFieldProps("Course")}
            isValid={formik.touched.Course && !formik.errors.Course}
            isInvalid={formik.touched.Course && formik.errors.Course}
            className={formik.touched.Course && formik.errors.Course ? "is-invalid" : ""}
          >
            <option disabled>Select the Course</option>
            <option value="Science">Science</option>
            <option value="Commerce">Commerce</option>
            <option value="Humanities">Humanities</option>
          </Form.Select>
          {formik.touched.Course && formik.errors.Course && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.Course}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default AddStudent;
