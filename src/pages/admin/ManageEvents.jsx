import { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { motion } from "framer-motion";
import { CalendarDays, Building2, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { fetchAllEvents, deleteEvent } from "../../api/eventService";

export default function ManageEvents() {
    const [eventsList, setEventsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        setLoading(true);
        try {
            const res = await fetchAllEvents();
            setEventsList(res.data || []);
        } catch (error) {
            console.error("Error loading events:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;

        try {
            await deleteEvent(id);
            toast.success("Event deleted!");
            loadEvents();
        } catch (error) {
            console.error("Failed to delete event:", error);
            toast.error("Failed to delete event");
        }
    };

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

                {loading ? (
                    <div className="text-gray-400 py-10 text-center">Loading events...</div>
                ) : eventsList.length === 0 ? (
                    <div className="text-gray-400 py-10 text-center">No active events found in database.</div>
                ) : (
                    <div className="space-y-4">
                        {eventsList.map((event, i) => (
                            <motion.div
                                key={event.event_id}
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
                                        <h2 className="text-lg font-bold text-white">{event.event_name}</h2>
                                        <p className="flex items-center gap-1.5 text-sm mt-1" style={{ color: "rgba(255, 255, 255, 0.65)" }}>
                                            <Building2 size={14} style={{ color: "var(--leaf-400)" }} /> {event.organization_name || "NGO"}
                                        </p>
                                        <p className="text-sm mt-0.5" style={{ color: "rgba(255, 255, 255, 0.5)" }}>{new Date(event.start_at).toLocaleDateString()} • {event.city || "Remote"}</p>
                                    </div>
                                </div>

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleDelete(event.event_id)}
                                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-[var(--r-sm)] font-semibold text-sm"
                                    style={{ background: "rgba(195,74,62,0.15)", color: "#ff8a7f" }}
                                >
                                    <Trash2 size={15} />
                                    Delete
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
