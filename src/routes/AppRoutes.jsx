import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import VerifyEmail from "../pages/VerifyEmail";
import EmailVerified from "../pages/EmailVerified";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

import PasswordChanged from "../pages/PasswordChanged";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route

        path="/email-verified"

        element={<EmailVerified/>}

        />
        <Route
        path="/forgot-password"
        element={<ForgotPassword/>}
        />

        <Route
        path="/reset-password"
        element={<ResetPassword/>}
        />

        <Route
        path="/email-verified"
        element={<EmailVerified/>}
        />

<Route

path="/password-changed"

element={<PasswordChanged/>}

/>

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;