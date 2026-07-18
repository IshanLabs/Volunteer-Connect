import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { motion } from "framer-motion";
import { Building2, Mail, Check, X } from "lucide-react";

const ngos = [
    { id: 1, name: "Green Earth NGO", email: "green@gmail.com" },
    { id: 2, name: "Helping Hands", email: "help@gmail.com" },
    { id: 3, name: "Hope Foundation", email: "hope@gmail.com" },
];

export default function VerifyNGOs() {
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
                    Verify NGOs
                </h1>

                <div className="space-y-4">
                    {ngos.map((ngo, i) => (
                        <motion.div
                            key={ngo.id}
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
                                    style={{ background: "rgba(255, 255, 255, 0.08)", color: "var(--gold-300)" }}
                                >
                                    <Building2 size={18} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">{ngo.name}</h2>
                                    <p className="flex items-center gap-1.5 text-sm mt-1" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                                        <Mail size={14} /> {ngo.email}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-[var(--r-sm)] font-semibold text-sm text-white"
                                    style={{ background: "linear-gradient(135deg, var(--leaf-500), var(--forest-700))" }}
                                >
                                    <Check size={15} />
                                    Approve
                                </motion.button>

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-[var(--r-sm)] font-semibold text-sm"
                                    style={{ background: "rgba(195,74,62,0.15)", color: "#ff8a7f" }}
                                >
                                    <X size={15} />
                                    Reject
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
