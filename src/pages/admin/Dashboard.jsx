import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import StatCard from "../../components/StatCard";
import { motion } from "framer-motion";
import { Users, Building2, CalendarDays, Hourglass, BadgeCheck, PartyPopper, UserPlus, Building } from "lucide-react";

const activities = [
    { icon: BadgeCheck, text: "Green Earth NGO registered.", tint: "leaf" },
    { icon: PartyPopper, text: "Beach Cleanup event created.", tint: "gold" },
    { icon: UserPlus, text: "10 volunteers joined Food Drive.", tint: "leaf" },
    { icon: Building, text: "Hope Foundation waiting for approval.", tint: "plum" },
];

const TINTS = {
    leaf: { bg: "rgba(47,168,106,0.15)", text: "var(--leaf-300)" },
    gold: { bg: "rgba(216,169,59,0.15)", text: "var(--gold-300)" },
    plum: { bg: "rgba(108,92,166,0.15)", text: "#c4b5fd" },
};

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

            <AdminSidebar />

            <main className="ml-64 p-8 relative z-10">
                <AdminNavbar />

                <h1 className="font-display text-3xl font-bold mt-6 mb-6 text-white">
                    Admin Dashboard
                </h1>

                <div className="grid md:grid-cols-4 gap-6">
                    <StatCard title="Users" value="245" icon={Users} accent="plum" />
                    <StatCard title="NGOs" value="18" icon={Building2} accent="leaf" />
                    <StatCard title="Events" value="42" icon={CalendarDays} accent="gold" />
                    <StatCard title="Pending" value="5" icon={Hourglass} accent="plum" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="rounded-[var(--r-lg)] p-6 mt-8 backdrop-blur-sm"
                    style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.12)", boxShadow: "var(--shadow-sm)" }}
                >
                    <h2 className="font-display text-xl font-bold mb-5 text-white">
                        Recent Activities
                    </h2>

                    <ul className="space-y-3">
                        {activities.map((a, i) => {
                            const tint = TINTS[a.tint];
                            return (
                                <motion.li
                                    key={a.text}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.35, delay: 0.2 + i * 0.08 }}
                                    className="flex items-center gap-3 rounded-[var(--r-md)] p-3"
                                    style={{ border: "1px solid rgba(255, 255, 255, 0.1)", background: "rgba(255, 255, 255, 0.02)" }}
                                >
                                    <div
                                        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                                        style={{ background: tint.bg, color: tint.text }}
                                    >
                                        <a.icon size={16} />
                                    </div>
                                    <span className="text-sm" style={{ color: "rgba(255, 255, 255, 0.75)" }}>{a.text}</span>
                                </motion.li>
                            );
                        })}
                    </ul>
                </motion.div>
            </main>
        </div>
    );
}
