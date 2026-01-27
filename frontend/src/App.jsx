import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useApplication } from "./context/ApplicationContext"

import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Consent from "./pages/Consent"
import Profile from "./pages/Profile"
import UploadDocs from "./pages/UploadDocs"
import Processing from "./pages/Processing"
import Dashboard from "./pages/Dashboard"
import Explainability from "./pages/Explainability"
import Simulation from "./pages/Simulation"
import FraudDetection from "./pages/FraudDetection"
import Compliance from "./pages/Compliance"

/* -------- Route Guards -------- */

function BorrowerRoute({ children }) {
  const { app } = useApplication()
  return app.role === "borrower" ? children : <Navigate to="/" />
}

function LenderRoute({ children }) {
  const { app } = useApplication()
  return app.role === "lender" ? children : <Navigate to="/" />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Landing />} />

        {/* -------- Borrower Flow -------- */}
        <Route
          path="/login"
          element={
            <BorrowerRoute>
              <Login />
            </BorrowerRoute>
          }
        />

        <Route
          path="/consent"
          element={
            <BorrowerRoute>
              <Consent />
            </BorrowerRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <BorrowerRoute>
              <Profile />
            </BorrowerRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <BorrowerRoute>
              <UploadDocs />
            </BorrowerRoute>
          }
        />

        <Route
          path="/processing"
          element={
            <BorrowerRoute>
              <Processing />
            </BorrowerRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <BorrowerRoute>
              <Dashboard />
            </BorrowerRoute>
          }
        />

        <Route
          path="/explain"
          element={
            <BorrowerRoute>
              <Explainability />
            </BorrowerRoute>
          }
        />

        <Route
          path="/simulate"
          element={
            <BorrowerRoute>
              <Simulation />
            </BorrowerRoute>
          }
        />

        <Route
          path="/compliance"
          element={
            <BorrowerRoute>
              <Compliance />
            </BorrowerRoute>
          }
        />

        {/* -------- Lender Views -------- */}
        <Route
          path="/fraud"
          element={
            <LenderRoute>
              <FraudDetection />
            </LenderRoute>
          }
        />

        <Route
          path="/lender/dashboard"
          element={
            <LenderRoute>
              <Dashboard />
            </LenderRoute>
          }
        />

        <Route
          path="/lender/compliance"
          element={
            <LenderRoute>
              <Compliance />
            </LenderRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}
