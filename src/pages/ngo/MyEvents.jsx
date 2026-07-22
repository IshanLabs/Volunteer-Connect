import { useState, useEffect } from "react";
import NGOSidebar from "../../components/ngo/NGOSidebar";
import NGONavbar from "../../components/ngo/NGONavbar";
import { motion } from "framer-motion";
import { MapPin, CalendarDays, Users, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { fetchMyNGOEvents, deleteEvent } from "../../api/eventService";

export default function MyEvents() {
    const [eventsList, setEventsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNGOEvents();
    }, []);

    const loadNGOEvents = async () => {
        setLoading(true);
        try {
            const res = await fetchMyNGOEvents();
            setEventsList(res.data || []);
        } catch (error) {
            console.error("Error loading NGO events:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;

        try {
            await deleteEvent(id);
            toast.success("Event deleted successfully");
            loadNGOEvents();
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

            <NGOSidebar />

            <main className="ml-64 p-8 relative z-10">
                <NGONavbar />

                <div className="flex items-center justify-between mt-8 mb-6">
                    <h1 className="font-display text-3xl font-bold text-white">My Events</h1>
                    <span
                        className="text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full"
                        style={{ background: "rgba(255, 255, 255, 0.1)", color: "var(--leaf-300)", border: "1px solid rgba(255, 255, 255, 0.15)" }}
                    >
                        {eventsList.length} active
                    </span>
                </div>

                {loading ? (
                    <div className="text-gray-400 py-20 text-center">Loading your events...</div>
                ) : eventsList.length === 0 ? (
                    <div className="text-gray-400 py-20 text-center">You haven't posted any events yet.</div>
                ) : (
                    <div className="grid gap-5">
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
                                <div>
                                    <h2 className="text-xl font-bold text-white">{event.event_name}</h2>

                                    <p className="flex items-center gap-2 mt-2 text-sm" style={{ color: "rgba(255, 255, 255, 0.65)" }}>
                                        <MapPin size={15} style={{ color: "var(--leaf-400)" }} /> {event.city || "Remote"}
                                    </p>
                                    <p className="flex items-center gap-2 mt-1 text-sm" style={{ color: "rgba(255, 255, 255, 0.65)" }}>
                                        <CalendarDays size={15} style={{ color: "var(--leaf-400)" }} /> {new Date(event.start_at).toLocaleDateString()}
                                    </p>
                                    <p className="flex items-center gap-2 mt-3 text-sm font-semibold" style={{ color: "var(--gold-300)" }}>
                                        <Users size={15} /> {event.total_applications || 0} applicants ({event.approved_applications || 0} approved)
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleDelete(event.event_id)}
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
                )}
            </main>
        </div>
    );
}
