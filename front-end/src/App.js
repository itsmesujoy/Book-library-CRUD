import logo from './logo.svg';
import './App.scss';
  import "react-toastify/dist/ReactToastify.css";

import RoutesData from "./routes/routes";
  import { ToastContainer, toast } from "react-toastify";


function App() {
  return (
    <div className="App">
      <RoutesData />
      <ToastContainer />
    </div>
  );
}

export default App;
