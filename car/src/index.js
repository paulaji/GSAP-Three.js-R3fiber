import React from "react";
// import ReactDOM from "react-dom";
import App from "./App";
import { createRoot } from "react-dom/client";

// react now uses concurrent mode entry process to load things faster for the users to see
// createRoot() helps in the same
// it takes a DOM element as arguement, here document.getElementById("root") and this represents the new entry point of the app
const root = createRoot(document.getElementById("root"));
// now the export default App from App.js will be our entry point
root.render(<App />);
