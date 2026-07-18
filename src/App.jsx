import { BrowserRouter, Routes, Route } from "react-router-dom";

import RoleSelection from "./pages/RoleSelection";

// Volunteer
import VolunteerDashboard from "./pages/volunteer/Dashboard";

// NGO
import NGODashboard from "./pages/ngo/Dashboard";
import CreateEvent from "./pages/ngo/CreateEvent";
import MyEvents from "./pages/ngo/MyEvents";
import Profile from "./pages/ngo/Profile";

// Admin
import AdminDashboard from "./pages/admin/Dashboard";
import VerifyNGOs from "./pages/admin/VerifyNGOs";
import ManageEvents from "./pages/admin/ManageEvents";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<RoleSelection />} />

        {/* Volunteer */}
        <Route
          path="/volunteer/dashboard"
          element={<VolunteerDashboard />}
        />

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

export default App;