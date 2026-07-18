import { Bell } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="backdrop-blur-sm rounded-xl p-5 flex justify-between items-center"
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
                <p className="text-sm mt-1" style={{ color: "var(--leaf-300)" }}>
                    Ready to make a difference today?
                </p>
            </div>

            <div className="flex items-center gap-5">
                <Bell className="cursor-pointer text-white opacity-80 hover:opacity-100 transition-opacity" size={20} />

                <div className="flex items-center gap-3">
                    <img
                        src="https://i.pravatar.cc/40"
                        className="rounded-full border border-white/20"
                        alt="avatar"
                    />

                    <div>
                        <h3 className="font-semibold text-white">
                            Alex
                        </h3>
                        <p className="text-xs" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                            Volunteer
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}