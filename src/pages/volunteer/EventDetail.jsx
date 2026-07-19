import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
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
import { events } from "../../data/events";

export default function EventDetails() {
    const { id } = useParams();

    const [applied, setApplied] = useState(false);

    const event = events.find((e) => e.id === Number(id));

    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white text-2xl">
                Event not found.
            </div>
        );
    }

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
                            {event.category}
                        </span>

                        <h1 className="text-5xl font-display font-bold mt-5">
                            {event.title}
                        </h1>

                        <div className="flex items-center gap-2 mt-4 text-white/80">

                            <Building2 size={18} />

                            <span>{event.ngo}</span>

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

                                {event.requirements.map((req) => (

                                    <div
                                        key={req}
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

                                <li>Work with other volunteers.</li>

                                <li>Assist the NGO team.</li>

                                <li>Complete assigned tasks safely.</li>

                                <li>Represent VolunteerConnect positively.</li>

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
                                value={event.location}
                            />

                            <InfoRow
                                icon={Calendar}
                                label="Date"
                                value={event.date}
                            />

                            <InfoRow
                                icon={Clock}
                                label="Time"
                                value={event.time}
                            />

                            <InfoRow
                                icon={Users}
                                label="Volunteers"
                                value={`${event.volunteers} / ${event.capacity}`}
                            />

                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setApplied(true)}
                                className="w-full mt-8 py-3 rounded-[var(--r-sm)] font-semibold transition-all"
                                style={{
                                    background: applied
                                        ? "linear-gradient(135deg,#15803d,#14532d)"
                                        : "linear-gradient(135deg,var(--leaf-500),var(--forest-700))",
                                }}
                            >
                                {applied
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
                                    {event.ngo.charAt(0)}
                                </div>

                                <div>

                                    <h3 className="font-semibold">
                                        {event.ngo}
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