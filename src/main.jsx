import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { Buffer } from "buffer";
import "./index.css";
import App from "./App.jsx";

// Assign Buffer to the global object to mimic the Node.js environment
// if (!window.Buffer) {
//   window.Buffer = Buffer;
// }

// Render the React application
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
