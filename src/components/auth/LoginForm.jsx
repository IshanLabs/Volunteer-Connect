import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { loginUser } from "../../api/authService";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [remember, setRemember] = useState(false);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const validate = () => {

    const newErrors = {};

    if (!email.trim()) {

      newErrors.email = "Email is required.";

    } else if (!/\S+@\S+\.\S+/.test(email)) {

      newErrors.email = "Enter a valid email.";

    }

    if (!password.trim()) {

      newErrors.password = "Password is required.";

    }

    return newErrors;

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const validationErrors = validate();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      
      toast.success(response.message || "Login successful!");
      
      const role = response.user?.role;
      if (role === "VOLUNTEER") {
        navigate("/volunteer/dashboard");
      } else if (role === "NGO") {
        navigate("/ngo/dashboard");
      } else if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/role-selection");
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      const errMsg = error.response?.data?.message || "Invalid credentials. Please try again.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }

  };


  return (

    <form onSubmit={handleSubmit}>

      <AuthInput

        label="Email Address"

        type="email"

        placeholder="Enter your email"

        icon={FaEnvelope}

        value={email}

        onChange={(e) => setEmail(e.target.value)}

        error={errors.email}

      />

      <AuthInput

        label="Password"

        type="password"

        placeholder="Enter your password"

        icon={FaLock}

        value={password}

        onChange={(e) => setPassword(e.target.value)}

        error={errors.password}

      />

      <div className="flex justify-between items-center mb-8">

        <label className="flex items-center gap-2 text-gray-300 text-sm">

          <input

            type="checkbox"

            checked={remember}

            onChange={() => setRemember(!remember)}

            className="accent-green-500"

          />

          Remember Me

        </label>

        <Link

          to="/forgot-password"

          className="text-green-400 hover:text-green-300 text-sm"

        >

          Forgot Password?

        </Link>

      </div>

      <AuthButton loading={loading} type="submit">

        Login

      </AuthButton>

      <p className="text-center text-gray-300 mt-8">

        Don't have an account?

        <Link

          to="/signup"

          className="ml-2 text-green-400 hover:text-green-300"

        >

          Sign Up

        </Link>

      </p>

    </form>

  );

}

export default LoginForm;