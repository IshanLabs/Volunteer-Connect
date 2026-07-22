import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    ClipboardList,
    CheckCircle2,
    Trophy,
    XCircle,
    MapPin,
    Calendar,
    Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import StatCard from "../../components/StatCard";
import { fetchMyApplications } from "../../api/applicationService";

const filters = [
    "All",
    "SUBMITTED",
    "SHORTLISTED",
    "APPROVED",
    "REJECTED",
];

const statusColors = {
    SUBMITTED: {
        bg: "rgba(234,179,8,.18)",
        color: "#FACC15",
    },
    SHORTLISTED: {
        bg: "rgba(59,130,246,.18)",
        color: "#60A5FA",
    },
    APPROVED: {
        bg: "rgba(34,197,94,.18)",
        color: "#4ADE80",
    },
    REJECTED: {
        bg: "rgba(239,68,68,.18)",
        color: "#F87171",
    },
};

export default function Applications() {
    const [selected, setSelected] = useState("All");
    const [appsList, setAppsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        setLoading(true);
        try {
            const res = await fetchMyApplications();
            setAppsList(res.data || []);
        } catch (error) {
            console.error("Error fetching applications:", error);
        } finally {
            setLoading(false);
        }
    };

    const filtered = useMemo(() => {
        if (selected === "All") return appsList;
        return appsList.filter((a) => a.status === selected);
    }, [selected, appsList]);

    return (
        <div className="min-h-screen canopy-mesh grain relative overflow-hidden text-white">

            {/* Background */}
            <motion.div
                className="absolute w-[36rem] h-[36rem] rounded-full opacity-20"
                style={{
                    background: "var(--gold-500)",
                    top: "-10rem",
                    right: "-10rem",
                }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute w-[28rem] h-[28rem] rounded-full opacity-20"
                style={{
                    background: "var(--leaf-400)",
                    bottom: "-8rem",
                    left: "-8rem",
                }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <Sidebar />

            <main className="ml-64 p-8 relative z-10">

                <Navbar />

                {/* Heading */}
                <div className="mt-8 mb-8">
                    <h1 className="font-display text-4xl font-bold">
                        My Applications
                    </h1>

                    <p
                        className="mt-2"
                        style={{ color: "rgba(255,255,255,.65)" }}
                    >
                        Track the status of your volunteer applications.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-5">
                    <StatCard
                        title="Total Applied"
                        value={appsList.length}
                        icon={ClipboardList}
                        accent="leaf"
                    />

                    <StatCard
                        title="Shortlisted"
                        value={appsList.filter((a) => a.status === "SHORTLISTED").length}
                        icon={CheckCircle2}
                        accent="gold"
                    />

                    <StatCard
                        title="Approved"
                        value={appsList.filter((a) => a.status === "APPROVED").length}
                        icon={Trophy}
                        accent="plum"
                    />

                    <StatCard
                        title="Rejected"
                        value={appsList.filter((a) => a.status === "REJECTED").length}
                        icon={XCircle}
                        accent="leaf"
                    />
                </div>

                {/* Filters */}
                <div className="flex gap-3 mt-10 mb-8">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setSelected(filter)}
                            className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
                            style={{
                                background:
                                    selected === filter
                                        ? "linear-gradient(135deg,var(--leaf-500),var(--forest-700))"
                                        : "rgba(255,255,255,.05)",
                                border: "1px solid rgba(255,255,255,.12)",
                            }}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Cards */}
                {loading ? (
                    <div className="text-center py-20 text-gray-400">Loading applications...</div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">No applications found.</div>
                ) : (
                    <div className="grid grid-cols-3 gap-6">
                        {filtered.map((application) => {
                            const statusConf = statusColors[application.status] || statusColors.SUBMITTED;
                            return (
                                <motion.div
                                    key={application.application_id}
                                    whileHover={{ y: -5 }}
                                    className="rounded-[var(--r-lg)] p-6 backdrop-blur-sm"
                                    style={{
                                        background: "rgba(255,255,255,.05)",
                                        border: "1px solid rgba(255,255,255,.12)",
                                    }}
                                >
                                    <span
                                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase mb-4"
                                        style={{
                                            background: "rgba(47,168,106,.15)",
                                            color: "var(--leaf-300)",
                                        }}
                                    >
                                        {application.organization_name || "NGO Event"}
                                    </span>

                                    <h2 className="font-display text-2xl font-bold">
                                        {application.event_name}
                                    </h2>

                                    <div className="space-y-3 mt-5 text-white/70">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} />
                                            {application.city || "On-Site"}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} />
                                            {new Date(application.start_at).toLocaleDateString()}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Clock size={16} />
                                            Applied on {new Date(application.submitted_at).toLocaleDateString()}
                                        </div>
                                    </div>

                                    <div
                                        className="inline-block mt-5 px-4 py-2 rounded-full text-sm font-semibold"
                                        style={{
                                            background: statusConf.bg,
                                            color: statusConf.color,
                                        }}
                                    >
                                        {application.status}
                                    </div>

                                    <button
                                        onClick={() => navigate(`/volunteer/events/${application.event_id}`)}
                                        className="w-full mt-6 py-3 rounded-[var(--r-sm)] font-semibold"
                                        style={{
                                            background:
                                                "linear-gradient(135deg,var(--leaf-500),var(--forest-700))",
                                        }}
                                    >
                                        View Event
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

            </main>

        </div>
    );
}