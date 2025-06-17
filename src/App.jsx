import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";


const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Layout />} />
       
      </Routes>
    </Router>
  );
};

export default App;

{/* <div className='owerflow-x-hidden'>
<Navbar />
<Hero />
</div> */}