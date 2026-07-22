import { useState, useEffect } from "react";
import NGOSidebar from "../../components/ngo/NGOSidebar";
import NGONavbar from "../../components/ngo/NGONavbar";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Mail, Phone, MapPin, Target, FileText, Save, Check } from "lucide-react";
import toast from "react-hot-toast";
import { fetchMyProfile, updateNGOProfile } from "../../api/profileService";

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
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    const [ngo, setNgo] = useState({
        organizationName: "",
        contactEmail: "",
        contactPhone: "",
        city: "",
        mission: "",
        description: "",
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        setLoading(true);
        try {
            const res = await fetchMyProfile();
            const prof = res.data.profile || {};
            setNgo({
                organizationName: prof.organization_name || res.data.full_name || "",
                contactEmail: prof.contact_email || res.data.email || "",
                contactPhone: prof.contact_phone || "",
                city: prof.city || "",
                mission: prof.mission || "",
                description: prof.description || "",
            });
        } catch (error) {
            console.error("Error loading NGO profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => setNgo({ ...ngo, [e.target.name]: e.target.value });

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateNGOProfile(ngo);
            setSaved(true);
            toast.success("NGO Profile updated!");
            setTimeout(() => setSaved(false), 2000);
        } catch (error) {
            console.error("Failed to update NGO profile:", error);
            toast.error("Failed to update NGO profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen canopy-mesh flex items-center justify-center text-white">
                Loading profile...
            </div>
        );
    }

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
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                            style={{ background: "linear-gradient(135deg,var(--leaf-500),var(--forest-700))" }}
                        >
                            {(ngo.organizationName || "N").charAt(0)}
                        </div>
                        <div>
                            <h1 className="font-display text-2xl font-bold text-white">Organization Profile</h1>
                            <p className="text-sm mt-1" style={{ color: "rgba(255, 255, 255, 0.6)" }}>Keep your details current so volunteers trust who they're helping.</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Field icon={Building2} label="Organization Name" name="organizationName" value={ngo.organizationName} onChange={handleChange} />
                        <Field icon={Mail} label="Email" name="contactEmail" value={ngo.contactEmail} onChange={handleChange} />
                        <Field icon={Phone} label="Phone" name="contactPhone" value={ngo.contactPhone} onChange={handleChange} />
                        <Field icon={MapPin} label="City / Location" name="city" value={ngo.city} onChange={handleChange} />

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
                                <textarea rows="5" name="description" value={ngo.description} onChange={handleChange} className={`${fieldClass} text-white`} style={fieldStyle} />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <motion.button
                                onClick={handleSave}
                                disabled={saving}
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
                                            <Save size={17} /> {saving ? "Saving..." : "Save Changes"}
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
