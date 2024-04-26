import React from "react";
import FileUploadPage from "./pages/FileUploadPage";
import RegistrationForm from "./pages/RegistrationForm";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <Router>
          <Routes>
            <Route path="/register" element={<RegistrationForm />} />
            <Route
              path="/login"
              element={<LoginPage />}
            />
            <Route path="/" element={<ProtectedFileUploadPage />} />
          </Routes>
        </Router>
      </div>
  );
}
const ProtectedFileUploadPage = () => {
  return (
    <ProtectedRoute>
      <FileUploadPage />
    </ProtectedRoute>
  );
};
export default App;
