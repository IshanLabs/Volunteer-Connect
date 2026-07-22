import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
    MapPin,
    Calendar,
    Clock,
    Users,
    CheckCircle,
    Building2,
    ArrowLeft,
} from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { fetchEventById } from "../../api/eventService";
import { applyForEvent } from "../../api/applicationService";

export default function EventDetails() {
    const { id } = useParams();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [applied, setApplied] = useState(false);

    useEffect(() => {
        loadEventDetails();
    }, [id]);

    const loadEventDetails = async () => {
        setLoading(true);
        try {
            const res = await fetchEventById(id);
            setEvent(res.data);
        } catch (error) {
            console.error("Error fetching event details:", error);
            toast.error("Failed to load event details");
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async () => {
        if (applied || applying) return;
        setApplying(true);

        try {
            await applyForEvent({ eventId: id, coverNote: "Excited to volunteer for this cause!" });
            setApplied(true);
            toast.success("Application submitted successfully!");
        } catch (error) {
            console.error("Application error:", error);
            toast.error(error.response?.data?.message || "Failed to submit application");
        } finally {
            setApplying(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen canopy-mesh flex items-center justify-center text-white text-xl">
                Loading event details...
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen canopy-mesh flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl font-bold">Event not found</h2>
                <button
                    onClick={() => window.history.back()}
                    className="mt-4 px-4 py-2 bg-green-600 rounded-lg"
                >
                    Back to Events
                </button>
            </div>
        );
    }

    const requirements = event.required_skills
        ? event.required_skills.split(",").map(s => s.trim())
        : ["Punctual and reliable", "Enthusiastic team player", "Good communication skills"];

    return (
        <div className="min-h-screen canopy-mesh grain relative overflow-hidden text-white">

            {/* Background */}
            <motion.div
                className="absolute w-[36rem] h-[36rem] rounded-full opacity-20 pointer-events-none"
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
                className="absolute w-[28rem] h-[28rem] rounded-full opacity-20 pointer-events-none"
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

                {/* Back Button */}
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition mt-6"
                >
                    <ArrowLeft size={18} />
                    Back to Events
                </button>

                {/* Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 rounded-[var(--r-lg)] overflow-hidden"
                    style={{
                        background:
                            "linear-gradient(135deg,var(--leaf-500),var(--forest-800))",
                    }}
                >
                    <div className="p-10">

                        <span
                            className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase"
                            style={{
                                background: "rgba(255,255,255,.15)",
                            }}
                        >
                            {event.category || "Community"}
                        </span>

                        <h1 className="text-5xl font-display font-bold mt-5">
                            {event.event_name}
                        </h1>

                        <div className="flex items-center gap-2 mt-4 text-white/80">
                            <Building2 size={18} />
                            <span>{event.organization_name || "NGO Partner"}</span>
                        </div>

                    </div>
                </motion.div>

                {/* Content */}
                <div className="grid grid-cols-3 gap-8 mt-8">

                    {/* Left */}
                    <div className="col-span-2 space-y-6">

                        <GlassCard>
                            <h2 className="font-display text-2xl font-bold mb-5">
                                About Event
                            </h2>

                            <p className="text-white/70 leading-8">
                                {event.description}
                            </p>
                        </GlassCard>

                        <GlassCard>
                            <h2 className="font-display text-2xl font-bold mb-5">
                                Volunteer Requirements
                            </h2>

                            <div className="space-y-4">
                                {requirements.map((req, idx) => (
                                    <div
                                        key={idx}
                                        className="flex gap-3 items-center"
                                    >
                                        <CheckCircle
                                            size={18}
                                            color="#4ADE80"
                                        />
                                        <span className="text-white/75">
                                            {req}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                        <GlassCard>
                            <h2 className="font-display text-2xl font-bold mb-5">
                                What You'll Do
                            </h2>

                            <ul className="space-y-3 text-white/70 list-disc pl-6">
                                <li>Work alongside dedicated NGO staff and fellow volunteers.</li>
                                <li>Assist in executing on-ground activities and logistics.</li>
                                <li>Interact with community members and support the cause.</li>
                                <li>Earn verified volunteer experience hours.</li>
                            </ul>
                        </GlassCard>

                    </div>

                    {/* Right */}
                    <div className="space-y-6">

                        <GlassCard>
                            <h2 className="font-display text-xl font-bold mb-6">
                                Event Information
                            </h2>

                            <InfoRow
                                icon={MapPin}
                                label="Location"
                                value={event.city || "On-Site"}
                            />

                            <InfoRow
                                icon={Calendar}
                                label="Date"
                                value={new Date(event.start_at).toLocaleDateString()}
                            />

                            <InfoRow
                                icon={Clock}
                                label="Time"
                                value={`${new Date(event.start_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                            />

                            <InfoRow
                                icon={Users}
                                label="Volunteers"
                                value={`${event.filled_spots || 0} / ${event.capacity}`}
                            />

                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={handleApply}
                                disabled={applied || applying}
                                className="w-full mt-8 py-3 rounded-[var(--r-sm)] font-semibold transition-all"
                                style={{
                                    background: applied
                                        ? "linear-gradient(135deg,#15803d,#14532d)"
                                        : "linear-gradient(135deg,var(--leaf-500),var(--forest-700))",
                                }}
                            >
                                {applying
                                    ? "Submitting..."
                                    : applied
                                    ? "✓ Application Submitted"
                                    : "Apply Now"}
                            </motion.button>
                        </GlassCard>

                        <GlassCard>
                            <h2 className="font-display text-xl font-bold mb-5">
                                Organizer
                            </h2>

                            <div className="flex items-center gap-4">
                                <div
                                    className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold"
                                    style={{
                                        background:
                                            "linear-gradient(135deg,var(--leaf-500),var(--forest-700))",
                                    }}
                                >
                                    {(event.organization_name || "N").charAt(0)}
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        {event.organization_name || "NGO Partner"}
                                    </h3>

                                    <p className="text-white/60 text-sm">
                                        Verified NGO
                                    </p>
                                </div>
                            </div>
                        </GlassCard>

                    </div>

                </div>

            </main>

        </div>
    );
}

function GlassCard({ children }) {
    return (
        <div
            className="rounded-[var(--r-lg)] p-8 backdrop-blur-sm"
            style={{
                background: "rgba(255,255,255,.05)",
                border: "1px solid rgba(255,255,255,.12)",
            }}
        >
            {children}
        </div>
    );
}

function InfoRow({ icon: Icon, label, value }) {
    return (
        <div className="flex gap-4 mb-5">
            <Icon
                size={20}
                style={{ color: "var(--leaf-300)" }}
            />
            <div>
                <p className="text-white/55 text-sm">
                    {label}
                </p>
                <p className="font-semibold">
                    {value}
                </p>
            </div>
        </div>
    );
}