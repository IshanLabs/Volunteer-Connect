import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth flow pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import VerifyEmail from "../pages/VerifyEmail";
import EmailVerified from "../pages/EmailVerified";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import PasswordChanged from "../pages/PasswordChanged";

// Dashboard and role pages
import RoleSelection from "../pages/RoleSelection";

// Volunteer
import VolunteerDashboard from "../pages/volunteer/Dashboard";

// NGO
import NGODashboard from "../pages/ngo/Dashboard";
import CreateEvent from "../pages/ngo/CreateEvent";
import MyEvents from "../pages/ngo/MyEvents";
import Profile from "../pages/ngo/Profile";

// Admin
import AdminDashboard from "../pages/admin/Dashboard";
import VerifyNGOs from "../pages/admin/VerifyNGOs";
import ManageEvents from "../pages/admin/ManageEvents";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing & Authentication */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/email-verified" element={<EmailVerified />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/password-changed" element={<PasswordChanged />} />

        {/* Role Selection */}
        <Route path="/role-selection" element={<RoleSelection />} />

        {/* Volunteer */}
        <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />

        {/* NGO */}
        <Route path="/ngo/dashboard" element={<NGODashboard />} />
        <Route path="/ngo/create-event" element={<CreateEvent />} />
        <Route path="/ngo/events" element={<MyEvents />} />
        <Route path="/ngo/profile" element={<Profile />} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/verify-ngos" element={<VerifyNGOs />} />
        <Route path="/admin/manage-events" element={<ManageEvents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;