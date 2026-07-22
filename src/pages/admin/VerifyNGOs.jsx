import { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { motion } from "framer-motion";
import { Building2, Mail, Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { fetchPendingNGOs, verifyNGO } from "../../api/adminService";

export default function VerifyNGOs() {
    const [ngosList, setNgosList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNGOs();
    }, []);

    const loadNGOs = async () => {
        setLoading(true);
        try {
            const res = await fetchPendingNGOs();
            setNgosList(res.data || []);
        } catch (error) {
            console.error("Error loading pending NGOs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (ngoProfileId, status) => {
        try {
            await verifyNGO(ngoProfileId, status);
            toast.success(`NGO ${status.toLowerCase()} successfully!`);
            loadNGOs();
        } catch (error) {
            console.error("Failed to verify NGO:", error);
            toast.error("Failed to update status");
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
                    Verify NGOs
                </h1>

                {loading ? (
                    <div className="text-gray-400 py-10 text-center">Loading NGOs...</div>
                ) : ngosList.length === 0 ? (
                    <div className="text-gray-400 py-10 text-center">No registered NGOs requiring verification right now.</div>
                ) : (
                    <div className="space-y-4">
                        {ngosList.map((ngo, i) => (
                            <motion.div
                                key={ngo.ngo_profile_id}
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                whileHover={{ y: -3 }}
                                className="rounded-[var(--r-lg)] p-6 flex justify-between items-center backdrop-blur-sm"
                                style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.12)", boxShadow: "var(--shadow-sm)" }}
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-11 h-11 rounded-[var(--r-sm)] flex items-center justify-center font-bold text-lg"
                                        style={{ background: "rgba(255, 255, 255, 0.08)", color: "var(--gold-300)" }}
                                    >
                                        <Building2 size={18} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-lg font-bold text-white">{ngo.organization_name || ngo.full_name}</h2>
                                            <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-yellow-300">
                                                {ngo.verification_status}
                                            </span>
                                        </div>
                                        <p className="flex items-center gap-1.5 text-sm mt-1" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                                            <Mail size={14} /> {ngo.contact_email || ngo.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleVerify(ngo.ngo_profile_id, "VERIFIED")}
                                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-[var(--r-sm)] font-semibold text-sm text-white"
                                        style={{ background: "linear-gradient(135deg, var(--leaf-500), var(--forest-700))" }}
                                    >
                                        <Check size={15} />
                                        Approve
                                    </motion.button>

                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleVerify(ngo.ngo_profile_id, "REJECTED")}
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
                )}
            </main>
        </div>
    );
}
