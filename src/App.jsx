import React from "react";
import FileUploadPage from "./pages/FileUploadPage";
import RegistrationForm from "./pages/RegistrationForm";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  const handleLogin = (credentials) => {
    console.log("Logic")
  };
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <Router>
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <FileUploadPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>   
    </div>
  );
}

export default App;