import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BookForm from "../pages/Home";
import List from "../pages/List";
import UpdateBooks from "../pages/Update";

const RoutesData = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul className="navigation">
            <li>
              <Link to="/books">Books</Link>
            </li>
            <li>
              <Link to="/">Add</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<BookForm />} />
          <Route path="/books" element={<List />} />
          <Route path="/update/:id" exact element={<UpdateBooks />} />
        </Routes>
      </div>
    </Router>
  );
};

export default RoutesData;
