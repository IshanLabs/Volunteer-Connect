import { useState, useEffect } from "react";
import NGOSidebar from "../../components/ngo/NGOSidebar";
import NGONavbar from "../../components/ngo/NGONavbar";
import StatCard from "../../components/StatCard";
import { CalendarDays, FileStack, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fetchMyNGOEvents } from "../../api/eventService";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await fetchMyNGOEvents();
            setEvents(res.data || []);
        } catch (error) {
            console.error("Error loading NGO dashboard:", error);
        } finally {
            setLoading(false);
        }
    };

    const totalPosted = events.length;
    const totalApps = events.reduce((acc, e) => acc + parseInt(e.total_applications || 0), 0);
    const totalApproved = events.reduce((acc, e) => acc + parseInt(e.approved_applications || 0), 0);

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

                <div className="grid grid-cols-4 gap-6 mt-8">
                    <StatCard title="Events Posted" value={totalPosted} icon={CalendarDays} accent="leaf" />
                    <StatCard title="Applications" value={totalApps} icon={FileStack} accent="gold" />
                    <StatCard title="Active Events" value={totalPosted} icon={Clock} accent="plum" />
                    <StatCard title="Approved Volunteers" value={totalApproved} icon={CheckCircle2} accent="leaf" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="rounded-[var(--r-lg)] mt-8 p-6 backdrop-blur-sm"
                    style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.12)", boxShadow: "var(--shadow-sm)" }}
                >
                    <h2 className="font-display text-xl font-bold mb-5 text-white">
                        Recent Events
                    </h2>

                    {loading ? (
                        <div className="text-gray-400 py-10 text-center">Loading events...</div>
                    ) : events.length === 0 ? (
                        <div className="text-gray-400 py-10 text-center">No events created yet. Click "Create Event" to get started!</div>
                    ) : (
                        <div className="space-y-3">
                            {events.map((item, i) => (
                                <motion.div
                                    key={item.event_id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.35, delay: 0.2 + i * 0.08 }}
                                    whileHover={{ x: 4 }}
                                    className="flex justify-between items-center rounded-[var(--r-md)] p-4"
                                    style={{ border: "1px solid rgba(255, 255, 255, 0.1)", background: "rgba(255, 255, 255, 0.02)" }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="w-11 h-11 rounded-[var(--r-sm)] flex items-center justify-center"
                                            style={{ background: "rgba(255, 255, 255, 0.08)", color: "var(--leaf-300)" }}
                                        >
                                            <CalendarDays size={18} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">{item.event_name}</h3>
                                            <p className="text-sm mt-0.5" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                                                {item.city || "Remote"} • {new Date(item.start_at).toLocaleDateString()} • <span style={{ color: "var(--gold-300)" }}>{item.total_applications || 0} applicants</span>
                                            </p>
                                        </div>
                                    </div>

                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => navigate("/ngo/events")}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-[var(--r-sm)] font-semibold text-sm text-white"
                                        style={{ background: "linear-gradient(135deg, var(--leaf-500), var(--forest-700))" }}
                                    >
                                        View
                                        <ArrowRight size={15} />
                                    </motion.button>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </main>
        </div>
    );
}
