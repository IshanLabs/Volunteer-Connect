import { useState } from "react";
import NGOSidebar from "../../components/ngo/NGOSidebar";
import NGONavbar from "../../components/ngo/NGONavbar";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Mail, Phone, MapPin, Target, FileText, Save, Check } from "lucide-react";

const fieldClass = "w-full rounded-[var(--r-sm)] p-3 pl-11 outline-none transition-all text-sm mt-2 focus:border-leaf-400";
const fieldStyle = { border: "1px solid rgba(255, 255, 255, 0.15)", background: "rgba(10, 46, 34, 0.8)", color: "#fff" };

function Field({ icon: Icon, label, ...props }) {
    return (
        <div>
            <label className="font-semibold text-sm" style={{ color: "rgba(255, 255, 255, 0.75)" }}>{label}</label>
            <div className="relative">
                <Icon size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 mt-1" style={{ color: "var(--leaf-400)" }} />
                <input className={`${fieldClass} text-white`} style={fieldStyle} {...props} />
            </div>
        </div>
    );
}

export default function Profile() {
    const [ngo, setNgo] = useState({
        name: "Green Earth NGO",
        email: "greenearth@gmail.com",
        phone: "+91 9876543210",
        address: "Mumbai, Maharashtra",
        mission: "Making our environment greener through community service.",
        about: "Green Earth NGO organizes tree plantation drives, beach cleanups, and awareness campaigns across India.",
    });
    const [saved, setSaved] = useState(false);

    const handleChange = (e) => setNgo({ ...ngo, [e.target.name]: e.target.value });
    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
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
                    <div className="flex items-center gap-4 mb-8">
                        <img
                            src="https://i.pravatar.cc/64"
                            className="rounded-full"
                            style={{ outline: "3px solid var(--leaf-400)" }}
                            alt="logo"
                        />
                        <div>
                            <h1 className="font-display text-2xl font-bold text-white">Organization Profile</h1>
                            <p className="text-sm mt-1" style={{ color: "rgba(255, 255, 255, 0.6)" }}>Keep your details current so volunteers trust who they're helping.</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Field icon={Building2} label="Organization Name" name="name" value={ngo.name} onChange={handleChange} />
                        <Field icon={Mail} label="Email" name="email" value={ngo.email} onChange={handleChange} />
                        <Field icon={Phone} label="Phone" name="phone" value={ngo.phone} onChange={handleChange} />
                        <Field icon={MapPin} label="Address" name="address" value={ngo.address} onChange={handleChange} />

                        <div className="md:col-span-2">
                            <label className="font-semibold text-sm" style={{ color: "rgba(255, 255, 255, 0.75)" }}>Mission</label>
                            <div className="relative">
                                <Target size={17} className="absolute left-3.5 top-4 mt-2" style={{ color: "var(--leaf-400)" }} />
                                <textarea rows="3" name="mission" value={ngo.mission} onChange={handleChange} className={`${fieldClass} text-white`} style={fieldStyle} />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="font-semibold text-sm" style={{ color: "rgba(255, 255, 255, 0.75)" }}>About Organization</label>
                            <div className="relative">
                                <FileText size={17} className="absolute left-3.5 top-4 mt-2" style={{ color: "var(--leaf-400)" }} />
                                <textarea rows="5" name="about" value={ngo.about} onChange={handleChange} className={`${fieldClass} text-white`} style={fieldStyle} />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <motion.button
                                onClick={handleSave}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex items-center gap-2 text-white px-8 py-3 rounded-[var(--r-sm)] font-semibold"
                                style={{ background: "linear-gradient(135deg, var(--leaf-500), var(--forest-700))", boxShadow: "var(--shadow-glow)" }}
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {saved ? (
                                        <motion.span key="saved" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                            <Check size={17} /> Saved
                                        </motion.span>
                                    ) : (
                                        <motion.span key="save" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                            <Save size={17} /> Save Changes
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
