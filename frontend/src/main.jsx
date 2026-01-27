import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"   // 👈 THIS restores Tailwind
import { ApplicationProvider } from "./context/ApplicationContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApplicationProvider>
    <App />
  </ApplicationProvider>
)
