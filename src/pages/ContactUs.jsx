import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
} from "lucide-react";

import Navbar from "../components/Navbar";

export default function ContactUs() {
  return (
    <div className="min-h-screen canopy-mesh grain relative overflow-hidden text-white">

      {/* Background */}

      <motion.div
        className="absolute w-[36rem] h-[36rem] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "var(--gold-500)",
          top: "-10rem",
          right: "-10rem",
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute w-[28rem] h-[28rem] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "var(--leaf-400)",
          bottom: "-8rem",
          left: "-8rem",
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 9, repeat: Infinity }}
      />

      <Navbar />

      <main className="max-w-7xl mx-auto px-8 py-20 relative z-10">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-6xl font-display font-bold">
            Contact Us
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-white/70 leading-8">
            We'd love to hear from you. Whether you have questions,
            suggestions, or partnership opportunities, feel free to reach out.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-12 mt-20">

          {/* Contact Info */}

          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >

            <InfoCard
              icon={Mail}
              title="Email"
              value="support@volunteerconnect.com"
            />

            <InfoCard
              icon={Phone}
              title="Phone"
              value="+91 98765 43210"
            />

            <InfoCard
              icon={MapPin}
              title="Address"
              value="Mumbai, Maharashtra, India"
            />

            <InfoCard
              icon={Clock}
              title="Working Hours"
              value="Monday - Friday | 9:00 AM - 6:00 PM"
            />

          </motion.div>

          {/* Contact Form */}

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-[var(--r-lg)] p-8 backdrop-blur-sm"
            style={{
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.12)",
            }}
          >

            <h2 className="text-3xl font-display font-bold mb-8">
              Send a Message
            </h2>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-green-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-green-500"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-green-500"
              />

              <textarea
                rows={6}
                placeholder="Your Message..."
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 outline-none resize-none focus:border-green-500"
              />

              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-4 rounded-xl font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg,var(--leaf-500),var(--forest-700))",
                }}
              >
                <Send size={18} />
                Send Message
              </button>

            </form>

          </motion.div>

        </div>

      </main>
    </div>
  );
}

function InfoCard({ icon: Icon, title, value }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-[var(--r-lg)] p-6 backdrop-blur-sm flex gap-5 items-start"
      style={{
        background: "rgba(255,255,255,.05)",
        border: "1px solid rgba(255,255,255,.12)",
      }}
    >

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg,var(--leaf-500),var(--forest-700))",
        }}
      >
        <Icon size={22} color="white" />
      </div>

      <div>

        <h3 className="font-semibold text-lg">
          {title}
        </h3>

        <p className="mt-2 text-white/70 leading-7">
          {value}
        </p>

      </div>

    </motion.div>
  );
}