import { motion } from "framer-motion";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Award,
    Calendar,
    Edit,
} from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import StatCard from "../../components/StatCard";

export default function Profile() {
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
                        title="Events Joined"
                        value="12"
                        icon={Calendar}
                        accent="leaf"
                    />

                    <StatCard
                        title="Hours Served"
                        value="48"
                        icon={Award}
                        accent="gold"
                    />

                    <StatCard
                        title="Certificates"
                        value="6"
                        icon={Award}
                        accent="plum"
                    />

                    <StatCard
                        title="Impact Score"
                        value="890"
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
                            src="https://ui-avatars.com/api/?name=Ishan&background=2fa86a&color=fff&size=200"
                            alt="Profile"
                            className="w-32 h-32 rounded-full"
                        />

                        <h2 className="font-display text-2xl font-bold mt-5">
                            Ishan
                        </h2>

                        <p className="text-white/60 mt-2">
                            Volunteer
                        </p>

                        <button
                            className="mt-6 w-full py-3 rounded-[var(--r-sm)] font-semibold flex items-center justify-center gap-2"
                            style={{
                                background:
                                    "linear-gradient(135deg,var(--leaf-500),var(--forest-700))",
                            }}
                        >
                            <Edit size={18} />
                            Edit Profile
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

                        <h2 className="font-display text-2xl font-bold mb-8">
                            Personal Information
                        </h2>

                        <div className="grid grid-cols-2 gap-8">

                            <Info
                                icon={User}
                                title="Full Name"
                                value="Ishan Sharma"
                            />

                            <Info
                                icon={Mail}
                                title="Email"
                                value="ishan@email.com"
                            />

                            <Info
                                icon={Phone}
                                title="Phone"
                                value="+91 9876543210"
                            />

                            <Info
                                icon={MapPin}
                                title="Location"
                                value="Pune, Maharashtra"
                            />

                        </div>

                        <div className="mt-10">

                            <h3 className="font-semibold text-lg mb-4">
                                Skills
                            </h3>

                            <div className="flex flex-wrap gap-3">

                                <Skill text="Teaching" />
                                <Skill text="First Aid" />
                                <Skill text="Photography" />
                                <Skill text="Leadership" />
                                <Skill text="Public Speaking" />

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