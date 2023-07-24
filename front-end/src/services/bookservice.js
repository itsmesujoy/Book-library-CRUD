import axios from "./axios";

const getAllBooks = (data) => {
  try {
    return axios
      .get("/books", { params: data })
      .then((response) => response);
  } catch (e) {
    console.log(e);
  }
};

const getAllBooksByID = (ID) => {
  try {
    return axios.get(`/books/${ID}`).then((response) => response);
  } catch (e) {
    console.log(e);
  }
};


const postBooksNew = (books) => {
  try {
    return axios.post("/books", { ...books}).then((response) => {
      return response;
    });
  } catch (e) {
    console.log(e);
  }
};


const postBooksById = (ID, books) => {
  try {
    return axios
      .put(`/books/${ID}`, { ...books })
      .then((response) => {
        return response;
      });
  } catch (error) {
    console.log(error, "service error");
  }
};

const deleteBooks = (_id) => {
  return axios.delete(`/books/${_id}`).then((response) => {
    return response;
  });
};






const bookService = {
  deleteBooks,
  postBooksById,
  getAllBooks,
  postBooksNew,
  getAllBooksByID,
};

export default bookService;
