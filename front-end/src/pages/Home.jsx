import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import bookService from "../services/bookservice";

const validationSchema = Yup.object().shape({
  author: Yup.string().required("Author is required"),
  publishedYear: Yup.number()
    .typeError("Published Year must be a number")
    .integer("Published Year must be an integer")
    .required("Published Year is required"),
  name: Yup.string().required("Name is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be a positive number")
    .required("Price is required"),
});

const BookForm = () => {
  const initialValues = {
    author: "",
    publishedYear: "",
    name: "",
    price: "",
  };
     const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    let datas = await bookService.postBooksNew(values);
    // Handle form submission logic here
     toast.success("Books details added successfully");
     navigate("/books");
    console.log(datas);
  };

  return (
    <div className="book-form">
      <h2>Book Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="row mb-4">
            <label className="col-sm-4">Author:</label>
            <div class="col-sm-8">
              <Field className="form-control" type="text" name="author" />
            </div>
            <ErrorMessage name="author" component="div" className="error" />
          </div>
          <div className="row mb-4">
            <label className="col-sm-4">Published Year:</label>
            <div class="col-sm-8">
              <Field
                className="form-control"
                type="number"
                name="publishedYear"
              />
            </div>
            <ErrorMessage
              name="publishedYear"
              component="div"
              className="error"
            />
          </div>
          <div className="row mb-4">
            <label className="col-sm-4">Name:</label>
            <div class="col-sm-8">
              <Field className="form-control" type="text" name="name" />
            </div>
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div className="row mb-4">
            <label className="col-sm-4">Price:</label>
            <div class="col-sm-8">
              <Field className="form-control" type="number" name="price" />
            </div>
            <ErrorMessage name="price" component="div" className="error" />
          </div>
          <div className="row justify-content-center">
            <button style={{'width':'100px'}} className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default BookForm;
