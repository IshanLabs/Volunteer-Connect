import { useMemo, useState } from "react";
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

const applications = [
    {
        id: 1,
        title: "Beach Cleanup",
        category: "Environment",
        location: "Mumbai",
        date: "20 July",
        appliedOn: "15 July",
        status: "Pending",
    },
    {
        id: 2,
        title: "Reading Circle",
        category: "Education",
        location: "Pune",
        date: "24 July",
        appliedOn: "16 July",
        status: "Accepted",
    },
    {
        id: 3,
        title: "Meal Drive",
        category: "Food Distribution",
        location: "Nashik",
        date: "28 July",
        appliedOn: "10 July",
        status: "Completed",
    },
    {
        id: 4,
        title: "Blood Donation Camp",
        category: "Health",
        location: "Delhi",
        date: "2 August",
        appliedOn: "17 July",
        status: "Rejected",
    },
];

const filters = [
    "All",
    "Pending",
    "Accepted",
    "Rejected",
    "Completed",
];

const statusColors = {
    Pending: {
        bg: "rgba(234,179,8,.18)",
        color: "#FACC15",
    },
    Accepted: {
        bg: "rgba(34,197,94,.18)",
        color: "#4ADE80",
    },
    Completed: {
        bg: "rgba(59,130,246,.18)",
        color: "#60A5FA",
    },
    Rejected: {
        bg: "rgba(239,68,68,.18)",
        color: "#F87171",
    },
};

export default function Applications() {
    const [selected, setSelected] = useState("All");
    const navigate = useNavigate();

    const filtered = useMemo(() => {
        if (selected === "All") return applications;
        return applications.filter((a) => a.status === selected);
    }, [selected]);

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
                        title="Applied"
                        value={applications.length}
                        icon={ClipboardList}
                        accent="leaf"
                    />

                    <StatCard
                        title="Accepted"
                        value={
                            applications.filter(
                                (a) => a.status === "Accepted"
                            ).length
                        }
                        icon={CheckCircle2}
                        accent="gold"
                    />

                    <StatCard
                        title="Completed"
                        value={
                            applications.filter(
                                (a) => a.status === "Completed"
                            ).length
                        }
                        icon={Trophy}
                        accent="plum"
                    />

                    <StatCard
                        title="Rejected"
                        value={
                            applications.filter(
                                (a) => a.status === "Rejected"
                            ).length
                        }
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

                                border:
                                    "1px solid rgba(255,255,255,.12)",
                            }}
                        >
                            {filter}
                        </button>

                    ))}

                </div>

                {/* Cards */}

                <div className="grid grid-cols-3 gap-6">

                    {filtered.map((application) => (

                        <motion.div
                            key={application.id}
                            whileHover={{ y: -5 }}
                            className="rounded-[var(--r-lg)] p-6 backdrop-blur-sm"
                            style={{
                                background:
                                    "rgba(255,255,255,.05)",
                                border:
                                    "1px solid rgba(255,255,255,.12)",
                            }}
                        >

                            <span
                                className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase mb-4"
                                style={{
                                    background:
                                        "rgba(47,168,106,.15)",
                                    color: "var(--leaf-300)",
                                }}
                            >
                                {application.category}
                            </span>

                            <h2 className="font-display text-2xl font-bold">
                                {application.title}
                            </h2>

                            <div className="space-y-3 mt-5 text-white/70">

                                <div className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    {application.location}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    {application.date}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    Applied on {application.appliedOn}
                                </div>

                            </div>

                            <div
                                className="inline-block mt-5 px-4 py-2 rounded-full text-sm font-semibold"
                                style={{
                                    background:
                                        statusColors[
                                            application.status
                                        ].bg,

                                    color:
                                        statusColors[
                                            application.status
                                        ].color,
                                }}
                            >
                                {application.status}
                            </div>

                            <button
                                onClick={() => navigate(`/volunteer/events/${application.id}`)}
                                className="w-full mt-6 py-3 rounded-[var(--r-sm)] font-semibold"
                                style={{
                                    background:
                                        "linear-gradient(135deg,var(--leaf-500),var(--forest-700))",
                                }}
                            >
                                View Event
                            </button>

                        </motion.div>

                    ))}

                </div>

            </main>

        </div>
    );
}