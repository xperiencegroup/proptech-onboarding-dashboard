import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import Onboarding from "../pages/onboarding/onboarding";
import Dashboard from "../pages/dashboard/dashboard";
import AlunaClickAndXperience from "../pages/aluna-click-and-xperience/aluna-click-and-xperience";
import ProtectedRoute from "../components/protected-route/protected-route";
import { ToastProvider } from "../components/toast/toast-context";

export default function Router() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route
            path="/click-and-xperience"
            element={<AlunaClickAndXperience />}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}
