import { Bell } from "lucide-react";
import { motion } from "framer-motion";

export default function NGONavbar() {
    return (
        <motion.header 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="backdrop-blur-sm rounded-xl p-5 flex items-center justify-between"
            style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "var(--shadow-sm)"
            }}
        >
            <div>
                <h2 className="text-2xl font-bold text-white">
                    Welcome Back 👋
                </h2>
                <p className="text-sm mt-1" style={{ color: "var(--gold-300)" }}>
                    Manage your events and volunteers.
                </p>
            </div>

            <div className="flex items-center gap-5">
                <Bell
                    size={20}
                    className="cursor-pointer text-white opacity-80 hover:opacity-100 transition-opacity"
                />

                <div className="flex items-center gap-3">
                    <img
                        src="https://i.pravatar.cc/45"
                        alt="avatar"
                        className="rounded-full border border-white/20"
                    />

                    <div>
                        <h4 className="font-semibold text-white">
                            Green Earth NGO
                        </h4>
                        <p className="text-xs" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                            Verified Organization
                        </p>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}