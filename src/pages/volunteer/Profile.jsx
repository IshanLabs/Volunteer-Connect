import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Award,
    Calendar,
    Edit,
    Check
} from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import StatCard from "../../components/StatCard";
import { fetchMyProfile, updateVolunteerProfile } from "../../api/profileService";
import { fetchMyApplications } from "../../api/applicationService";

export default function Profile() {
    const [userData, setUserData] = useState(null);
    const [appsCount, setAppsCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        phone: "",
        city: "",
        bio: "",
        skills: "",
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        setLoading(true);
        try {
            const res = await fetchMyProfile();
            setUserData(res.data);
            if (res.data.profile) {
                setForm({
                    phone: res.data.profile.phone || "",
                    city: res.data.profile.city || "",
                    bio: res.data.profile.bio || "",
                    skills: res.data.profile.skills || "",
                });
            }
            const appsRes = await fetchMyApplications();
            setAppsCount(appsRes.count || 0);
        } catch (error) {
            console.error("Error loading profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateVolunteerProfile(form);
            toast.success("Profile updated successfully!");
            setIsEditing(false);
            loadProfile();
        } catch (error) {
            console.error("Error saving profile:", error);
            toast.error("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen canopy-mesh flex items-center justify-center text-white">
                Loading profile...
            </div>
        );
    }

    const name = userData?.full_name || "Volunteer";
    const email = userData?.email || "volunteer@email.com";
    const profile = userData?.profile || {};
    const skillsList = profile.skills ? profile.skills.split(",").map(s => s.trim()) : ["Community", "Leadership"];

    return (
        <div className="min-h-screen canopy-mesh grain relative overflow-hidden text-white">

            {/* Background Orbs */}
            <motion.div
                className="absolute w-[36rem] h-[36rem] rounded-full opacity-20"
                style={{
                    background: "var(--gold-500)",
                    top: "-10rem",
                    right: "-10rem",
                }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
            />

            <motion.div
                className="absolute w-[28rem] h-[28rem] rounded-full opacity-20"
                style={{
                    background: "var(--leaf-400)",
                    bottom: "-8rem",
                    left: "-8rem",
                }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 9, repeat: Infinity }}
            />

            <Sidebar />

            <main className="ml-64 p-8 relative z-10">

                <Navbar />

                <div className="mt-8">
                    <h1 className="font-display text-4xl font-bold">
                        My Profile
                    </h1>
                    <p
                        className="mt-2"
                        style={{ color: "rgba(255,255,255,.65)" }}
                    >
                        Manage your volunteer information.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-5 mt-8">
                    <StatCard
                        title="Events Applied"
                        value={appsCount}
                        icon={Calendar}
                        accent="leaf"
                    />

                    <StatCard
                        title="Hours Verified"
                        value={profile.total_verified_hours || "0"}
                        icon={Award}
                        accent="gold"
                    />

                    <StatCard
                        title="Role"
                        value={userData?.role || "VOLUNTEER"}
                        icon={User}
                        accent="plum"
                    />

                    <StatCard
                        title="Status"
                        value="Active"
                        icon={User}
                        accent="leaf"
                    />
                </div>

                <div className="grid grid-cols-3 gap-6 mt-10">

                    {/* Left Card */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        className="rounded-[var(--r-lg)] p-8 backdrop-blur-sm flex flex-col items-center"
                        style={{
                            background: "rgba(255,255,255,.05)",
                            border: "1px solid rgba(255,255,255,.12)",
                        }}
                    >
                        <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2fa86a&color=fff&size=200`}
                            alt="Profile"
                            className="w-32 h-32 rounded-full"
                        />

                        <h2 className="font-display text-2xl font-bold mt-5">
                            {name}
                        </h2>

                        <p className="text-white/60 mt-2">
                            {userData?.role || "Volunteer"}
                        </p>

                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="mt-6 w-full py-3 rounded-[var(--r-sm)] font-semibold flex items-center justify-center gap-2"
                            style={{
                                background:
                                    "linear-gradient(135deg,var(--leaf-500),var(--forest-700))",
                            }}
                        >
                            <Edit size={18} />
                            {isEditing ? "Cancel Edit" : "Edit Profile"}
                        </button>
                    </motion.div>

                    {/* Right Card */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        className="col-span-2 rounded-[var(--r-lg)] p-8 backdrop-blur-sm"
                        style={{
                            background: "rgba(255,255,255,.05)",
                            border: "1px solid rgba(255,255,255,.12)",
                        }}
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="font-display text-2xl font-bold">
                                Personal Information
                            </h2>
                            {isEditing && (
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="px-5 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold flex items-center gap-2"
                                >
                                    <Check size={18} />
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            )}
                        </div>

                        {isEditing ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white outline-none"
                                        placeholder="+91 9876543210"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1">City / Location</label>
                                    <input
                                        type="text"
                                        value={form.city}
                                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white outline-none"
                                        placeholder="Mumbai, Maharashtra"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1">Skills (comma separated)</label>
                                    <input
                                        type="text"
                                        value={form.skills}
                                        onChange={(e) => setForm({ ...form, skills: e.target.value })}
                                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white outline-none"
                                        placeholder="Teaching, Leadership, First Aid"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1">Bio</label>
                                    <textarea
                                        value={form.bio}
                                        onChange={(e) => setForm({ ...form, bio: e.target.value })}
                                        rows={3}
                                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white outline-none"
                                        placeholder="Tell NGOs about yourself..."
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-8">
                                <Info
                                    icon={User}
                                    title="Full Name"
                                    value={name}
                                />

                                <Info
                                    icon={Mail}
                                    title="Email"
                                    value={email}
                                />

                                <Info
                                    icon={Phone}
                                    title="Phone"
                                    value={profile.phone || "Not set"}
                                />

                                <Info
                                    icon={MapPin}
                                    title="Location"
                                    value={profile.city || "Not set"}
                                />
                            </div>
                        )}

                        <div className="mt-10">
                            <h3 className="font-semibold text-lg mb-4">
                                Skills
                            </h3>

                            <div className="flex flex-wrap gap-3">
                                {skillsList.map((skill, idx) => (
                                    <Skill key={idx} text={skill} />
                                ))}
                            </div>
                        </div>

                    </motion.div>

                </div>

            </main>

        </div>
    );
}

function Info({ icon: Icon, title, value }) {
    return (
        <div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
                <Icon size={16} />
                {title}
            </div>

            <p className="mt-2 text-lg font-semibold">
                {value}
            </p>
        </div>
    );
}

function Skill({ text }) {
    return (
        <span
            className="px-4 py-2 rounded-full text-sm font-semibold"
            style={{
                background: "rgba(47,168,106,.15)",
                color: "var(--leaf-300)",
            }}
        >
            {text}
        </span>
    );
}