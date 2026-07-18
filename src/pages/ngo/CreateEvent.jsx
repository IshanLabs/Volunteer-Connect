import NGOSidebar from "../../components/ngo/NGOSidebar";
import NGONavbar from "../../components/ngo/NGONavbar";
import { motion } from "framer-motion";
import { Type, Tag, Users, MapPin, CalendarDays, AlignLeft, Send } from "lucide-react";

const fieldClass =
    "w-full rounded-[var(--r-sm)] p-3 pl-11 outline-none transition-all text-sm focus:border-leaf-400";
const fieldStyle = {
    border: "1px solid rgba(255, 255, 255, 0.15)",
    background: "rgba(10, 46, 34, 0.8)",
    color: "#white",
};

function Field({ icon: Icon, label, children }) {
    return (
        <div>
            <label className="block mb-2 text-sm font-semibold" style={{ color: "rgba(255, 255, 255, 0.75)" }}>
                {label}
            </label>
            <div className="relative">
                <Icon size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--leaf-400)" }} />
                {children}
            </div>
        </div>
    );
}

export default function CreateEvent() {
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

            <NGOSidebar />

            <main className="ml-64 p-8 relative z-10">
                <NGONavbar />

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-[var(--r-lg)] p-8 mt-6 max-w-4xl backdrop-blur-sm"
                    style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.12)", boxShadow: "var(--shadow-sm)" }}
                >
                    <h2 className="font-display text-2xl font-bold mb-1 text-white">
                        Create New Event
                    </h2>
                    <p className="text-sm mb-7" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                        Tell volunteers what you're organizing and how they can help.
                    </p>

                    <form className="grid grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="col-span-2">
                            <Field icon={Type} label="Event Title">
                                <input
                                    type="text"
                                    placeholder="Beach Cleanup Drive"
                                    className={`${fieldClass} text-white`}
                                    style={fieldStyle}
                                />
                            </Field>
                        </div>

                        <Field icon={Tag} label="Category">
                            <select className={`${fieldClass} text-white`} style={fieldStyle}>
                                <option className="bg-[#145C43] text-white">Environment</option>
                                <option className="bg-[#145C43] text-white">Education</option>
                                <option className="bg-[#145C43] text-white">Healthcare</option>
                                <option className="bg-[#145C43] text-white">Food Distribution</option>
                            </select>
                        </Field>

                        <Field icon={Users} label="Volunteers Needed">
                            <input type="number" placeholder="20" className={`${fieldClass} text-white`} style={fieldStyle} />
                        </Field>

                        <Field icon={MapPin} label="Location">
                            <input type="text" placeholder="Mumbai" className={`${fieldClass} text-white`} style={fieldStyle} />
                        </Field>

                        <Field icon={CalendarDays} label="Date">
                            <input type="date" className={`${fieldClass} text-white`} style={fieldStyle} />
                        </Field>

                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-semibold" style={{ color: "rgba(255, 255, 255, 0.75)" }}>
                                Description
                            </label>
                            <div className="relative">
                                <AlignLeft size={17} className="absolute left-3.5 top-4" style={{ color: "var(--leaf-400)" }} />
                                <textarea
                                    rows="5"
                                    placeholder="Describe your event..."
                                    className={`${fieldClass} text-white`}
                                    style={fieldStyle}
                                />
                            </div>
                        </div>

                        <div className="col-span-2">
                            <motion.button
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex items-center gap-2 text-white px-8 py-3 rounded-[var(--r-sm)] font-semibold"
                                style={{ background: "linear-gradient(135deg, var(--leaf-500), var(--forest-700))", boxShadow: "var(--shadow-glow)" }}
                            >
                                <Send size={17} />
                                Publish Event
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </main>
        </div>
    );
}
