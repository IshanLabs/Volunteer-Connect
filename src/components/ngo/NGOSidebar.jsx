import {
    LayoutDashboard,
    PlusCircle,
    CalendarDays,
    Users,
    Building2,
    LogOut,
    Sprout
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const menuItems = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/ngo/dashboard",
    },
    {
        title: "Create Event",
        icon: PlusCircle,
        path: "/ngo/create-event",
    },
    {
        title: "My Events",
        icon: CalendarDays,
        path: "/ngo/events",
    },
    {
        title: "Profile",
        icon: Building2,
        path: "/ngo/profile",
    },
];

export default function NGOSidebar() {
    const navigate = useNavigate();
    return (
        <aside 
            className="fixed left-0 top-0 h-screen w-64 flex flex-col justify-between z-20"
            style={{ 
                background: "rgba(10, 46, 34, 0.4)", 
                backdropFilter: "blur(12px)",
                borderRight: "1px solid rgba(255, 255, 255, 0.1)" 
            }}
        >
            <div>
                {/* Logo */}
                <div className="p-6 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, var(--gold-500), var(--forest-800))" }}
                    >
                        <Sprout size={20} color="white" />
                    </div>
                    <div>
                        <h1 className="font-display text-lg font-bold leading-tight text-white">
                            VolunteerConnect
                        </h1>
                        <p className="text-xs" style={{ color: "var(--gold-300)" }}>NGO Panel</p>
                    </div>
                </div>

                {/* Menu */}
                <nav className="mt-6 px-4 space-y-1.5">
                    {menuItems.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.35, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <NavLink
                                to={item.path}
                                className="flex items-center gap-3 px-4 py-3 rounded-[var(--r-sm)] font-medium text-sm transition-all"
                                style={({ isActive }) => ({
                                    background: isActive ? "linear-gradient(135deg, var(--gold-500), var(--forest-800))" : "transparent",
                                    color: isActive ? "#fff" : "rgba(255, 255, 255, 0.65)",
                                    boxShadow: isActive ? "0 8px 20px -8px rgba(216,169,59,0.55)" : "none",
                                })}
                            >
                                <item.icon size={18} />
                                <span>{item.title}</span>
                            </NavLink>
                        </motion.div>
                    ))}
                </nav>
            </div>

            {/* Bottom */}
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