import { MapPin, Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function EventCard({ title, location, date, category, volunteers }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="rounded-[var(--r-lg)] p-6 backdrop-blur-sm flex flex-col justify-between"
            style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
            }}
        >
            <div>
                <span
                    className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4"
                    style={{ background: "rgba(47, 168, 106, 0.15)", color: "var(--leaf-300)" }}
                >
                    {category}
                </span>

                <h2 className="text-xl font-bold text-white font-display">
                    {title}
                </h2>

                <div className="flex items-center gap-2 mt-4" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                    <MapPin size={16} style={{ color: "var(--leaf-400)" }} />
                    <span className="text-sm">{location}</span>
                </div>

                <div className="flex items-center gap-2 mt-2" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                    <Calendar size={16} style={{ color: "var(--leaf-400)" }} />
                    <span className="text-sm">{date}</span>
                </div>

                {volunteers !== undefined && (
                    <div className="flex items-center gap-2 mt-3" style={{ color: "var(--gold-300)" }}>
                        <Users size={16} />
                        <span className="text-sm font-medium">{volunteers} volunteers joined</span>
                    </div>
                )}
            </div>

            <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full mt-6 text-white py-2.5 rounded-[var(--r-sm)] font-semibold text-sm transition-all"
                style={{ background: "linear-gradient(135deg, var(--leaf-500), var(--forest-700))" }}
            >
                View Details
            </motion.button>
        </motion.div>
    );
}