import React from "react";
import { routes } from "@/routes/routes";
import PublicRoute from "@/routes/PublicRoute";
import ProtectedRoute from "@/routes/ProtectedRoute";
import RouteWrapper from "@/components/fallbacks/RouteWrapper";
import ErrorBoundaryTestPage from "./pages/BuggyComponent";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "@/components/ui/Header";

/**
 * Main App component that handles routing and layout
 * @returns {React.JSX.Element} The rendered App component
 */
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <Header />
        <div className="flex-1 container mx-auto px-4">
          <Routes>
            {routes.public.map(({ path, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <PublicRoute>
                    <RouteWrapper>
                      <Component />
                    </RouteWrapper>
                  </PublicRoute>
                }
              />
            ))}

            {routes.private.map(({ path, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <ProtectedRoute>
                    <RouteWrapper>
                      <Component />
                    </RouteWrapper>
                  </ProtectedRoute>
                }
              />
            ))}

            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route path="/error-test" element={<ErrorBoundaryTestPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
export default App;
