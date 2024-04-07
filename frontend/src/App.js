//import logo from './logo.svg';
import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <div className="font-['jost']">
      <BrowserRouter>
        <Route exact path="/" component={Home} />

        <Route />
      </BrowserRouter>
    </div>
  );
}

export default App;
