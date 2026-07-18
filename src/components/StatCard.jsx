import { motion } from "framer-motion";

const ACCENTS = {
    leaf: {
        gradient: "linear-gradient(135deg, var(--leaf-500), var(--forest-700))",
        glow: "rgba(47,168,106,0.35)",
        text: "var(--leaf-300)"
    },
    gold: {
        gradient: "linear-gradient(135deg, var(--gold-500), var(--forest-800))",
        glow: "rgba(216,169,59,0.35)",
        text: "var(--gold-300)"
    },
    plum: {
        gradient: "linear-gradient(135deg, var(--plum-500), var(--slate-900))",
        glow: "rgba(108,92,166,0.35)",
        text: "#c4b5fd"
    }
};

export default function StatCard({ title, value, icon: Icon, accent = "leaf" }) {
    const theme = ACCENTS[accent] || ACCENTS.leaf;
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="rounded-[var(--r-lg)] p-6 backdrop-blur-sm flex items-center justify-between"
            style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "var(--shadow-sm)"
            }}
        >
            <div>
                <h3 className="text-sm font-medium" style={{ color: "rgba(255, 255, 255, 0.65)" }}>
                    {title}
                </h3>
                <h1 className="text-4xl font-bold mt-2 font-display text-white">
                    {value}
                </h1>
            </div>
            {Icon && (
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                    style={{ background: theme.gradient, boxShadow: `0 8px 20px -6px ${theme.glow}` }}
                >
                    <Icon size={22} />
                </div>
            )}
        </motion.div>
    );
}