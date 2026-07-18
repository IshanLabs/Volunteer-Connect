import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function AdminNavbar() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[var(--r-lg)] p-6 flex justify-between items-center backdrop-blur-sm"
            style={{ 
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "var(--shadow-sm)"
            }}
        >
            <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white font-display">Welcome, Admin 👋</h2>
                <p className="mt-1 text-sm" style={{ color: "#a78bfa" }}>
                    Manage NGOs, users, and events
                </p>
            </div>

            <div
                className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
                style={{ background: "linear-gradient(135deg, var(--plum-500), var(--slate-900))", boxShadow: "0 0 0 1px rgba(255,255,255,0.2)" }}
            >
                <ShieldCheck size={22} />
            </div>
        </motion.div>
    );
}
