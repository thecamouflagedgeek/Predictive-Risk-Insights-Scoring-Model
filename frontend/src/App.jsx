import { BrowserRouter, Routes, Route } from "react-router-dom"

import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Consent from "./pages/Consent"
import Profile from "./pages/Profile"
import UploadDocs from "./pages/UploadDocs"
import Processing from "./pages/Processing"
import Dashboard from "./pages/Dashboard"
import Explainability from "./pages/Explainability"
import Simulation from "./pages/Simulation"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/consent" element={<Consent />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<UploadDocs />} />
        <Route path="/processing" element={<Processing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explain" element={<Explainability />} />
        <Route path="/simulate" element={<Simulation />} />
      </Routes>
    </BrowserRouter>
  )
}