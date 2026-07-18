import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelopeOpenText } from "react-icons/fa";
import toast from "react-hot-toast";
import AuthLayout from "../components/auth/AuthLayout";
import OTPInput from "../components/auth/OTPInput";
import AuthButton from "../components/auth/AuthButton";
// import SuccessAnimation from "../components/auth/SuccessAnimation";

function VerifyEmail() {

  const [otp, setOTP] = useState("");

  const [timer, setTimer] = useState(30);

  const [loading, setLoading] = useState(false);


  const [resending, setResending] = useState(false);

  const [otpError, setOtpError] = useState("");

  const navigate = useNavigate();

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

      verifyOTP();

    }

  }, [otp]);

  const verifyOTP = () => {

  // Clear previous error
  setOtpError("");

  setLoading(true);

  setTimeout(() => {

    setLoading(false);

    // Demo OTP
    if (otp === "123456") {

      toast.success("Email verified successfully!");

      setTimeout(() => {
        navigate("/email-verified");
      }, 1000);

    } else {

      setOtpError("Invalid OTP. Please try again.");

      toast.error("Invalid OTP");

    }

  }, 1500);

};

const resendOTP = () => {

  setResending(true);

  setTimeout(() => {

    setResending(false);

    setTimer(30);

    setOtpError("");

    setOTP("");

    toast.success("OTP sent successfully!");

  }, 1500);

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

          onClick={verifyOTP}

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