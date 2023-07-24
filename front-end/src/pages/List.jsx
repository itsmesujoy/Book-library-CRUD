import React, { useEffect, useState } from "react";
import bookService from "../services/bookservice";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import UpdateBooks from "./Update";

function List() {
  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(10)
   const [skip, setSkip] = useState(0);
    const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [id, setId] = useState(false);
  const [list, setList] = useState([]);
  const [data, setData] = useState({})
  
  const ListBooks = async () => {
    let datas={
      limit:limit,
      skip:skip,
      search:search
    }
    let data = await bookService.getAllBooks(datas);
    console.log(data);
    setList(data.data.books);
    setData(data.data)
  };
  const UpdateBook = async (id) => {
    let datas = await bookService.postBooksById(id);
  };
  const DeleteBooks = async (id) => {
    let datas = await bookService.deleteBooks(id);
    ListBooks();
  };
  const handlePageChange = (selectedPage, p) => {
    setCurrentPage(selectedPage.selected);
    console.log(p)
  };

  const openModal = (id) => {
    setShowModal(true);
    setId(id);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    ListBooks();
  }, []);
  useEffect(() => {
    ListBooks();
  }, [search]);

  return (
    <div>
      <div className="form-group" style={{margin:'15px',width:"50%"}}>
        <label for="exampleInputEmail1">Search</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={(ev) =>{setSearch(ev.target.value);}}
        />
      </div>
      <div className="book-list">
        <h2>Book List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Author</th>
              <th>Price</th>
              <th>Publish Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Using map to loop through the tableData and render each row */}
            {list.map((row) => (
              <tr key={row?._id}>
                <td>{row?.name}</td>
                <td>{row?.author}</td>
                <td>{row?.price}</td>
                <td>{row?.publishedYear}</td>
                <td className="actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      navigate("/update/" + row._id, {
                        state: {
                          ID: row._id,
                        },
                      });
                    }}
                  >
                    Update
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => DeleteBooks(row?._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        previousLabel={<button className="btn pagination-btn">Previous</button>}
        nextLabel={<button className="btn pagination-btn">Next</button>}
        breakLabel={"..."}
        pageCount={Math.ceil(data.total / perPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default List;
