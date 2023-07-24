import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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

const UpdateBooks = () => {
  let { id } = useParams();
  const [data, setData] = useState(null);
  const ref = useRef();
   const navigate = useNavigate();

  useEffect(() => {
    UpdateList();
  }, [id]);

  const UpdateList = async () => {
    let datas = await bookService.getAllBooksByID(id);
    console.log(datas);
    setData({ ...datas.data });
  };

  const handleSubmit = async (values, { C }) => {
    let data = {
      author: values.author,
      publishedYear: values.publishedYear,
      name: values.name,
      price: values.price,
      status:"active"
    };
    let datas = await bookService.postBooksById(id, data);
    // Handle form submission logic here

    console.log(datas);
    toast.success("Books details updated successfully")
     navigate("/books");
  };

  console.log(data);

  let initialValues = {
    author: "",
    publishedYear: "",
    name: "",
    price: "",
  };

  return (
    <div className="book-form">
      <h2>Edit Book</h2>
      <Formik
        initialValues={data ? data : initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
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
            <button
              style={{ width: "100px" }}
              className="btn btn-primary"
              type="submit"
            >
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default UpdateBooks;
