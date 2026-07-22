import { Navigate, Outlet } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProtectedRoute({ allowedRoles }) {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");

  if (!token || !userStr) {
    toast.error("Please login to access this section.");
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userStr);
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      toast.error(`Access Denied: You cannot access ${allowedRoles.join("/")} section.`);
      if (user.role === "VOLUNTEER") return <Navigate to="/volunteer/dashboard" replace />;
      if (user.role === "NGO") return <Navigate to="/ngo/dashboard" replace />;
      if (user.role === "ADMIN") return <Navigate to="/admin/dashboard" replace />;
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
