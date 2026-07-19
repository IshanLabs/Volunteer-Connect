import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import StatCard from "../../components/StatCard";
import EventCard from "../../components/EventCard";
import { ClipboardList, CheckCircle2, Trophy, Clock } from "lucide-react";
import { motion } from "framer-motion";

const events = [
    { id: 1, title: "Beach Cleanup", location: "Mumbai", date: "20 July", category: "Environment", volunteers: 25 },
    { id: 2, title: "Reading Circle", location: "Pune", date: "24 July", category: "Education", volunteers: 12 },
    { id: 3, title: "Meal Drive", location: "Nashik", date: "28 July", category: "Food Distribution", volunteers: 30 },
];

export default function Dashboard() {
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
                    <StatCard title="Applied" value="5" icon={ClipboardList} accent="leaf" />
                    <StatCard title="Accepted" value="3" icon={CheckCircle2} accent="gold" />
                    <StatCard title="Completed" value="2" icon={Trophy} accent="plum" />
                    <StatCard title="Upcoming" value="1" icon={Clock} accent="leaf" />
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

                    <div className="grid grid-cols-3 gap-6">
                        {events.map((e) => (
                            <EventCard key={e.title} {...e} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
