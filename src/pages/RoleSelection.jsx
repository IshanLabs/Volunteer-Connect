import { Users, Building2, ShieldCheck, ArrowRight, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const roles = [
    {
        roleKey: "VOLUNTEER",
        title: "Volunteer",
        blurb: "Find causes near you and start showing up.",
        icon: Users,
        gradient: "linear-gradient(135deg, var(--leaf-500), var(--forest-700))",
        glow: "rgba(47,168,106,0.35)",
        path: "/volunteer/dashboard",
    },
    {
        roleKey: "NGO",
        title: "NGO",
        blurb: "Post events and coordinate your volunteers.",
        icon: Building2,
        gradient: "linear-gradient(135deg, var(--gold-500), var(--forest-800))",
        glow: "rgba(216,169,59,0.35)",
        path: "/ngo/dashboard",
    },
    {
        roleKey: "ADMIN",
        title: "Admin",
        blurb: "Verify organizations and oversee the platform.",
        icon: ShieldCheck,
        gradient: "linear-gradient(135deg, var(--plum-500), var(--slate-900))",
        glow: "rgba(108,92,166,0.35)",
        path: "/admin/dashboard",
    },
];

export default function RoleSelection() {
    const navigate = useNavigate();

    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    const handleRoleClick = (roleObj) => {
        if (user && user.role) {
            if (user.role.toUpperCase() !== roleObj.roleKey) {
                toast.error(`Access Denied: Your account role is ${user.role}. You cannot access ${roleObj.title}.`);
                return;
            }
        }
        navigate(roleObj.path);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden canopy-mesh grain px-6">
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

            <div className="relative z-10 w-full max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: -14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center mb-12"
                >
                    <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                        style={{ background: "rgba(255,255,255,0.12)", boxShadow: "0 0 0 1px rgba(255,255,255,0.15)" }}
                    >
                        <Sprout size={26} color="white" />
                    </div>
                    <h1 className="font-display text-5xl font-bold text-white">
                        VolunteerConnect
                    </h1>
                    <p className="mt-3 text-lg" style={{ color: "var(--leaf-300)" }}>
                        One platform, three roles, a thousand small acts of good.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {roles.map((role, i) => {
                        const isForbidden = user && user.role && user.role.toUpperCase() !== role.roleKey;
                        return (
                            <motion.button
                                key={role.title}
                                onClick={() => handleRoleClick(role)}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                whileHover={!isForbidden ? { y: -8 } : {}}
                                className={`text-left rounded-[var(--r-lg)] p-8 backdrop-blur-sm transition-all ${
                                    isForbidden ? "opacity-40 cursor-not-allowed" : "hover:border-green-400"
                                }`}
                                style={{
                                    background: "rgba(255,255,255,0.06)",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                }}
                            >
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6"
                                    style={{ background: role.gradient, boxShadow: `0 12px 28px -8px ${role.glow}` }}
                                >
                                    <role.icon size={28} />
                                </div>

                                <h2 className="font-display text-2xl font-bold text-white flex items-center justify-between">
                                    {role.title}
                                    {user && user.role?.toUpperCase() === role.roleKey && (
                                        <span className="text-xs font-normal px-2.5 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/40">
                                            Your Role
                                        </span>
                                    )}
                                </h2>
                                <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                                    {role.blurb}
                                </p>

                                <div
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
                                    style={{ color: isForbidden ? "rgba(255,255,255,0.3)" : "var(--gold-300)" }}
                                >
                                    {isForbidden ? "Restricted" : "Continue"}
                                    <ArrowRight size={16} />
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
