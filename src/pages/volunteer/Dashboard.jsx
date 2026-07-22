import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import StatCard from "../../components/StatCard";
import EventCard from "../../components/EventCard";
import { ClipboardList, CheckCircle2, Trophy, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { fetchAllEvents } from "../../api/eventService";
import { fetchMyApplications } from "../../api/applicationService";

export default function Dashboard() {
    const [events, setEvents] = useState([]);
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [eventsRes, appsRes] = await Promise.all([
                fetchAllEvents(),
                fetchMyApplications().catch(() => ({ data: [] })),
            ]);
            setEvents((eventsRes.data || []).slice(0, 3));
            setApps(appsRes.data || []);
        } catch (error) {
            console.error("Error loading dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    const appliedCount = apps.length;
    const acceptedCount = apps.filter(a => a.status === "APPROVED" || a.status === "SHORTLISTED").length;
    const completedCount = apps.filter(a => a.status === "APPROVED").length;
    const pendingCount = apps.filter(a => a.status === "SUBMITTED").length;

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

            <Sidebar />

            <main className="ml-64 p-8 relative z-10">
                <Navbar />

                <div className="grid grid-cols-4 gap-5 mt-8">
                    <StatCard title="Applied" value={appliedCount} icon={ClipboardList} accent="leaf" />
                    <StatCard title="Shortlisted / Approved" value={acceptedCount} icon={CheckCircle2} accent="gold" />
                    <StatCard title="Approved" value={completedCount} icon={Trophy} accent="plum" />
                    <StatCard title="Pending" value={pendingCount} icon={Clock} accent="leaf" />
                </div>

                <div className="mt-10">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between mb-6"
                    >
                        <h2 className="font-display text-2xl font-bold text-white">
                            Upcoming Events
                        </h2>
                        <span
                            className="text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full"
                            style={{ background: "rgba(255, 255, 255, 0.1)", color: "var(--leaf-300)", border: "1px solid rgba(255, 255, 255, 0.15)" }}
                        >
                            {events.length} open near you
                        </span>
                    </motion.div>

                    {loading ? (
                        <div className="text-gray-400 py-10 text-center">Loading events...</div>
                    ) : events.length === 0 ? (
                        <div className="text-gray-400 py-10 text-center">No upcoming events yet.</div>
                    ) : (
                        <div className="grid grid-cols-3 gap-6">
                            {events.map((e) => (
                                <EventCard
                                    key={e.event_id || e.id}
                                    id={e.event_id || e.id}
                                    title={e.event_name || e.title}
                                    ngo={e.organization_name || e.ngo}
                                    location={e.city || e.location}
                                    date={e.start_at ? new Date(e.start_at).toLocaleDateString() : e.date}
                                    image={e.banner_url || e.image}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
