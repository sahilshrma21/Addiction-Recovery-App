import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // Make sure the path is correct

// ReactDOM.render(
  // <BrowserRouter>
  //   <App />
  // </BrowserRouter>,
//   document.getElementById("root") // Assuming your index.html has a div with id="root"
// );
const container = document.getElementById('root');
const root = createRoot(container);

// Render the app
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  );