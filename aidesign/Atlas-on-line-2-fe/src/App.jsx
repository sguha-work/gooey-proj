import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GenerateImage from "./components/GenerateImage";
import EditImage from "./components/EditImage";
import RemixImage from "./components/RemixImage";
import UpscaleImage from "./components/UpscaleImage";
import DescribeImage from "./components/DescribeImage";

const App = () => {
  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<GenerateImage />} />
          <Route path="/edit" element={<EditImage />} />
          <Route path="/remix" element={<RemixImage />} />
          <Route path="/upscale" element={<UpscaleImage />} />
          <Route path="/describe" element={<DescribeImage />} />
        </Routes>
      
    </Router>
  );
};

export default App;
