import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import toast from "react-hot-toast";

import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import { sendOTP } from "../api/authService";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await sendOTP({ email });
      localStorage.setItem("userEmail", email);
      toast.success("OTP code sent to your email!");
      navigate("/verify-email", { state: { email } });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to send OTP to your email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your registered email to receive an OTP."
    >
      <form onSubmit={handleSubmit}>
        <AuthInput
          label="Email"
          type="email"
          placeholder="Enter email"
          icon={FaEnvelope}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />

        <AuthButton loading={loading} type="submit">
          Send OTP
        </AuthButton>
      </form>
    </AuthLayout>
  );
}

export default ForgotPassword;