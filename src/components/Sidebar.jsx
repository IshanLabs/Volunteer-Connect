import {
    LayoutDashboard,
    CalendarDays,
    FileText,
    User,
    LogOut,
    Sprout
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const menu = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/volunteer/dashboard",
    },
    {
        title: "Browse Events",
        icon: CalendarDays,
        path: "/volunteer/dashboard",
    },
    {
        title: "Applications",
        icon: FileText,
        path: "/volunteer/dashboard",
    },
    {
        title: "Profile",
        icon: User,
        path: "/volunteer/dashboard",
    },
];

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <aside 
            className="w-64 h-screen fixed left-0 top-0 flex flex-col justify-between z-20"
            style={{ 
                background: "rgba(10, 46, 34, 0.4)", 
                backdropFilter: "blur(12px)",
                borderRight: "1px solid rgba(255, 255, 255, 0.1)" 
            }}
        >
            <div>
                <div className="p-6 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, var(--leaf-500), var(--forest-700))" }}
                    >
                        <Sprout size={20} color="white" />
                    </div>
                    <div>
                        <h1 className="font-display text-lg font-bold leading-tight text-white">
                            VolunteerConnect
                        </h1>
                        <p className="text-xs" style={{ color: "var(--leaf-300)" }}>Volunteer Portal</p>
                    </div>
                </div>

                <nav className="mt-6 px-4 space-y-1.5">
                    {menu.map((item, i) => {
                        const isActive = item.title === "Dashboard"; // keep dashboard highlighted for volunteer page since it is the only page
                        return (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.35, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div
                                    onClick={() => navigate(item.path)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-[var(--r-sm)] font-medium text-sm transition-all cursor-pointer"
                                    style={{
                                        background: isActive ? "linear-gradient(135deg, var(--leaf-500), var(--forest-700))" : "transparent",
                                        color: isActive ? "#fff" : "rgba(255, 255, 255, 0.65)",
                                        boxShadow: isActive ? "0 8px 20px -8px rgba(47,168,106,0.55)" : "none",
                                    }}
                                    onMouseEnter={(e) => {
                                        if(!isActive) {
                                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                                            e.currentTarget.style.color = "#fff";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if(!isActive) {
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.color = "rgba(255, 255, 255, 0.65)";
                                        }
                                    }}
                                >
                                    <item.icon size={18} />
                                    <span>{item.title}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </nav>
            </div>

            <div className="p-4" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
                <motion.button 
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate("/")}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-[var(--r-sm)] font-semibold text-sm"
                    style={{ background: "rgba(195,74,62,0.15)", color: "#ff8a7f" }}
                >
                    <LogOut size={18} />
                    Logout
                </motion.button>
            </div>
        </aside>
    );
}