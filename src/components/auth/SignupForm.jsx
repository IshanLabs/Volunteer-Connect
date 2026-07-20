import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUsers,
} from "react-icons/fa";

import { signupUser } from "../../api/authService";

import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

function SignupForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "VOLUNTEER",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm password.";
    }

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.terms) {
      newErrors.terms = "Please accept Terms & Conditions.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const userData = {
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      const response = await signupUser(userData);

      toast.success(response.message || "Account created successfully!");

      navigate("/verify-email");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <AuthInput
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        icon={FaUser}
        value={formData.name}
        onChange={handleChange}
        name="name"
        error={errors.name}
      />

      <AuthInput
        label="Email"
        type="email"
        placeholder="Enter your email"
        icon={FaEnvelope}
        value={formData.email}
        onChange={handleChange}
        name="email"
        error={errors.email}
      />

      <AuthInput
        label="Password"
        type="password"
        placeholder="Create password"
        icon={FaLock}
        value={formData.password}
        onChange={handleChange}
        name="password"
        error={errors.password}
      />

      <AuthInput
        label="Confirm Password"
        type="password"
        placeholder="Confirm password"
        icon={FaLock}
        value={formData.confirmPassword}
        onChange={handleChange}
        name="confirmPassword"
        error={errors.confirmPassword}
      />

      {/* Role */}

      <div className="mb-6">
        <label className="text-gray-300 text-sm block mb-2">
          Role
        </label>

        <div className="relative">
          <FaUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400" />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-green-400"
          >
            <option
              value="VOLUNTEER"
              className="bg-[#0A2416]"
            >
              Volunteer
            </option>

            <option
              value="NGO"
              className="bg-[#0A2416]"
            >
              NGO
            </option>
          </select>
        </div>
      </div>

      {/* Terms */}

      <div className="mb-6">
        <label className="flex items-start gap-3 text-gray-300 text-sm">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            className="accent-green-500 mt-1"
          />

          I agree to the Terms & Conditions
        </label>

        {errors.terms && (
          <p className="text-red-400 text-sm mt-2">
            {errors.terms}
          </p>
        )}
      </div>

      <AuthButton loading={loading} type="submit">
        Create Account
      </AuthButton>

      <p className="text-center text-gray-300 mt-8">
        Already have an account?

        <Link
          to="/login"
          className="text-green-400 ml-2"
        >
          Login
        </Link>
      </p>
    </form>
  );
}

export default SignupForm;