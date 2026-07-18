import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { motion } from "framer-motion";
import { CalendarDays, Building2, Trash2 } from "lucide-react";

const events = [
    { id: 1, title: "Beach Cleanup", ngo: "Green Earth NGO", date: "20 July" },
    { id: 2, title: "Food Distribution", ngo: "Helping Hands", date: "22 July" },
    { id: 3, title: "Tree Plantation", ngo: "Hope Foundation", date: "25 July" },
];

export default function ManageEvents() {
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

            <AdminSidebar />

            <main className="ml-64 p-8 relative z-10">
                <AdminNavbar />

                <h1 className="font-display text-3xl font-bold mt-6 mb-6 text-white">
                    Manage Events
                </h1>

                <div className="space-y-4">
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
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-11 h-11 rounded-[var(--r-sm)] flex items-center justify-center"
                                    style={{ background: "rgba(255, 255, 255, 0.08)", color: "#c4b5fd" }}
                                >
                                    <CalendarDays size={18} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">{event.title}</h2>
                                    <p className="flex items-center gap-1.5 text-sm mt-1" style={{ color: "rgba(255, 255, 255, 0.65)" }}>
                                        <Building2 size={14} style={{ color: "var(--leaf-400)" }} /> {event.ngo}
                                    </p>
                                    <p className="text-sm mt-0.5" style={{ color: "rgba(255, 255, 255, 0.5)" }}>{event.date}</p>
                                </div>
                            </div>

                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-1.5 px-5 py-2.5 rounded-[var(--r-sm)] font-semibold text-sm"
                                style={{ background: "rgba(195,74,62,0.15)", color: "#ff8a7f" }}
                            >
                                <Trash2 size={15} />
                                Delete
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
