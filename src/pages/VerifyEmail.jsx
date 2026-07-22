import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEnvelopeOpenText } from "react-icons/fa";
import toast from "react-hot-toast";
import AuthLayout from "../components/auth/AuthLayout";
import OTPInput from "../components/auth/OTPInput";
import AuthButton from "../components/auth/AuthButton";
import { sendOTP, verifyOTP } from "../api/authService";

function VerifyEmail() {
  const [otp, setOTP] = useState("");
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [otpError, setOtpError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const otpSentRef = useRef(false);

  const userEmail = location.state?.email || localStorage.getItem("userEmail") || "";
  const userName = location.state?.name || localStorage.getItem("userName") || "";

  // Send OTP on initial load if email exists (guarded against React StrictMode duplicate calls)
  useEffect(() => {
    if (userEmail && !otpSentRef.current) {
      otpSentRef.current = true;
      handleSendOTP(userEmail, userName);
    }
  }, [userEmail, userName]);

  const handleSendOTP = async (email, name) => {
    try {
      await sendOTP({ email, name });
      toast.success("OTP sent to your email!");
    } catch (error) {
      console.error("Failed to send OTP:", error);
      toast.error(error.response?.data?.message || "Failed to send OTP to email.");
    }
  };

  // Countdown Timer
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Auto Verify when OTP becomes 6 digits
  useEffect(() => {
    if (otp.length === 6) {
      handleVerifyOTP();
    }
  }, [otp]);

  const handleVerifyOTP = async () => {
    setOtpError("");
    setLoading(true);

    try {
      const response = await verifyOTP({ email: userEmail, otp });
      toast.success(response.message || "Email verified successfully!");

      setTimeout(() => {
        navigate("/email-verified");
      }, 1000);
    } catch (error) {
      const msg = error.response?.data?.message || "Invalid OTP. Please try again.";
      setOtpError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    if (!userEmail) {
      toast.error("No email address found. Please signup again.");
      return;
    }

    setResending(true);
    setOtpError("");
    setOTP("");

    try {
      await sendOTP({ email: userEmail, name: userName });
      setTimer(30);
      toast.success("New OTP sent successfully to your email!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };
  

 
  return (

    <AuthLayout

      title="Verify Your Email"

      subtitle="Enter the 6-digit verification code sent to your email."

    >

      <div className="flex justify-center mb-8">

        <FaEnvelopeOpenText

          className="text-green-400 text-6xl"

        />

      </div>

      {/* OTP Boxes */}

      <OTPInput onComplete={setOTP} />

      {/* Error */}

      {otpError && (

        <p className="text-red-400 text-center mt-5">

          {otpError}

        </p>

      )}

      {/* Verify Button */}

      <div className="mt-8">

        <AuthButton

          loading={loading}

          onClick={handleVerifyOTP}

          disabled={otp.length !== 6}

        >

          Verify Email

        </AuthButton>

      </div>

      {/* Resend */}

      <div className="text-center mt-8">

        {timer > 0 ? (

          <p className="text-gray-300">

            Resend OTP in

            <span className="text-green-400">

              {" "}
              00:{timer.toString().padStart(2, "0")}

            </span>

          </p>

        ) : (

          <button

            onClick={resendOTP}

            disabled={resending}

            className="text-green-400 hover:text-green-300"

          >

            {resending ? "Sending..." : "Resend OTP"}

          </button>

        )}

      </div>

      {/* Navigation */}

      <div className="text-center mt-8">

        <Link

          to="/login"

          className="text-gray-400 hover:text-white"

        >

          Back to Login

        </Link>

      </div>

      <div className="text-center mt-3">

        <Link

          to="/signup"

          className="text-green-400 hover:text-green-300"

        >

          Change Email

        </Link>

      </div>

    </AuthLayout>

  );

}

export default VerifyEmail;