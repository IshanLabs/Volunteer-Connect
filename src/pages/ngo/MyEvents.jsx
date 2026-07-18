import NGOSidebar from "../../components/ngo/NGOSidebar";
import NGONavbar from "../../components/ngo/NGONavbar";
import { motion } from "framer-motion";
import { MapPin, CalendarDays, Users, Pencil, Trash2 } from "lucide-react";

const events = [
    { id: 1, title: "Beach Cleanup Drive", location: "Mumbai", date: "20 July 2026", volunteers: 25 },
    { id: 2, title: "Food Distribution", location: "Pune", date: "25 July 2026", volunteers: 18 },
    { id: 3, title: "Tree Plantation", location: "Nashik", date: "30 July 2026", volunteers: 32 },
];

export default function MyEvents() {
    return (
        <div className="min-h-screen canopy-mesh grain relative overflow-hidden text-white">
            {/* ambient orbs */}
            <motion.div
                className="absolute w-[36rem] h-[36rem] rounded-full opacity-20 pointer-events-none"
                style={{ background: "var(--gold-500)", top: "-10rem", right: "-10rem" }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute w-[28rem] h-[28rem] rounded-full opacity-20 pointer-events-none"
                style={{ background: "var(--leaf-400)", bottom: "-8rem", left: "-8rem" }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            <NGOSidebar />

            <main className="ml-64 p-8 relative z-10">
                <NGONavbar />

                <div className="flex items-center justify-between mt-8 mb-6">
                    <h1 className="font-display text-3xl font-bold text-white">My Events</h1>
                    <span
                        className="text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full"
                        style={{ background: "rgba(255, 255, 255, 0.1)", color: "var(--leaf-300)", border: "1px solid rgba(255, 255, 255, 0.15)" }}
                    >
                        {events.length} active
                    </span>
                </div>

                <div className="grid gap-5">
                    {events.map((event, i) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -3 }}
                            className="rounded-[var(--r-lg)] p-6 flex justify-between items-center backdrop-blur-sm"
                            style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.12)", boxShadow: "var(--shadow-sm)" }}
                        >
                            <div>
                                <h2 className="text-xl font-bold text-white">{event.title}</h2>

                                <p className="flex items-center gap-2 mt-2 text-sm" style={{ color: "rgba(255, 255, 255, 0.65)" }}>
                                    <MapPin size={15} style={{ color: "var(--leaf-400)" }} /> {event.location}
                                </p>
                                <p className="flex items-center gap-2 mt-1 text-sm" style={{ color: "rgba(255, 255, 255, 0.65)" }}>
                                    <CalendarDays size={15} style={{ color: "var(--leaf-400)" }} /> {event.date}
                                </p>
                                <p className="flex items-center gap-2 mt-3 text-sm font-semibold" style={{ color: "var(--gold-300)" }}>
                                    <Users size={15} /> {event.volunteers} applicants
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-[var(--r-sm)] font-semibold text-sm"
                                    style={{ background: "rgba(216,169,59,0.15)", color: "var(--gold-300)" }}
                                >
                                    <Pencil size={15} />
                                    Edit
                                </motion.button>

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-[var(--r-sm)] font-semibold text-sm"
                                    style={{ background: "rgba(195,74,62,0.15)", color: "#ff8a7f" }}
                                >
                                    <Trash2 size={15} />
                                    Delete
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
