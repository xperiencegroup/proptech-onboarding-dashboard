import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import Onboarding from "../pages/onboarding/onboarding";
import Dashboard from "../pages/dashboard/dashboard";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formulario" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
