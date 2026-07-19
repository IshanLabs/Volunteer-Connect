import { motion } from "framer-motion";
import {
  HeartHandshake,
  Users,
  CalendarDays,
  Building2,
  Target,
  Globe,
} from "lucide-react";

import Navbar from "../components/Navbar";

const features = [
  {
    icon: HeartHandshake,
    title: "Connect",
    description:
      "Bring volunteers and NGOs together through one simple platform.",
  },
  {
    icon: CalendarDays,
    title: "Discover",
    description:
      "Explore meaningful volunteering opportunities in your community.",
  },
  {
    icon: Building2,
    title: "Organize",
    description:
      "NGOs can create, manage and monitor events with ease.",
  },
  {
    icon: Users,
    title: "Collaborate",
    description:
      "Build stronger communities by working together for social impact.",
  },
];

const stats = [
  { value: "500+", label: "Volunteers" },
  { value: "75+", label: "NGOs" },
  { value: "200+", label: "Events" },
  { value: "5,000+", label: "Volunteer Hours" },
];

export default function About() {
  return (
    <div className="min-h-screen canopy-mesh grain relative overflow-hidden text-white">

      {/* Background Orbs */}

      <motion.div
        className="absolute w-[36rem] h-[36rem] rounded-full opacity-20"
        style={{
          background: "var(--gold-500)",
          top: "-10rem",
          right: "-10rem",
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute w-[28rem] h-[28rem] rounded-full opacity-20"
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

        {/* Hero */}

        <section className="text-center">

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-display font-bold"
          >
            About VolunteerConnect
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .15 }}
            className="max-w-3xl mx-auto mt-8 text-lg leading-8 text-white/70"
          >
            VolunteerConnect bridges the gap between passionate volunteers
            and organizations creating positive social impact. Our platform
            makes it easy to discover volunteer opportunities, organize
            community events, and inspire meaningful change.
          </motion.p>

        </section>

        {/* Mission */}

        <section className="mt-24">

          <div
            className="rounded-[var(--r-lg)] p-10 backdrop-blur-sm"
            style={{
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.12)",
            }}
          >

            <div className="flex items-center gap-4 mb-6">

              <Target
                size={32}
                style={{ color: "var(--leaf-300)" }}
              />

              <h2 className="text-3xl font-display font-bold">
                Our Mission
              </h2>

            </div>

            <p className="text-white/70 leading-8 text-lg">
              We believe that every individual has the power to make a
              difference. VolunteerConnect empowers communities by helping
              volunteers discover meaningful opportunities while enabling
              NGOs to efficiently organize and manage impactful events.
            </p>

          </div>

        </section>

        {/* Features */}

        <section className="mt-24">

          <h2 className="text-4xl font-display font-bold text-center">
            What We Do
          </h2>

          <div className="grid grid-cols-2 gap-8 mt-12">

            {features.map((feature) => (
              <motion.div
                key={feature.title}
                whileHover={{ y: -5 }}
                className="rounded-[var(--r-lg)] p-8 backdrop-blur-sm"
                style={{
                  background: "rgba(255,255,255,.05)",
                  border: "1px solid rgba(255,255,255,.12)",
                }}
              >
                <feature.icon
                  size={40}
                  style={{ color: "var(--leaf-300)" }}
                />

                <h3 className="mt-6 text-2xl font-display font-bold">
                  {feature.title}
                </h3>

                <p className="mt-4 text-white/70 leading-7">
                  {feature.description}
                </p>

              </motion.div>
            ))}

          </div>

        </section>

        {/* Stats */}

        <section className="mt-24">

          <h2 className="text-4xl font-display font-bold text-center">
            Our Impact
          </h2>

          <div className="grid grid-cols-4 gap-6 mt-12">

            {stats.map((stat) => (

              <div
                key={stat.label}
                className="rounded-[var(--r-lg)] p-8 text-center backdrop-blur-sm"
                style={{
                  background: "rgba(255,255,255,.05)",
                  border: "1px solid rgba(255,255,255,.12)",
                }}
              >

                <h3
                  className="text-5xl font-bold"
                  style={{ color: "var(--leaf-300)" }}
                >
                  {stat.value}
                </h3>

                <p className="mt-3 text-white/65">
                  {stat.label}
                </p>

              </div>

            ))}

          </div>

        </section>

        {/* Vision */}

        <section className="mt-24">

          <div
            className="rounded-[var(--r-lg)] p-10 text-center backdrop-blur-sm"
            style={{
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.12)",
            }}
          >

            <Globe
              size={42}
              className="mx-auto"
              style={{ color: "var(--gold-300)" }}
            />

            <h2 className="text-3xl font-display font-bold mt-6">
              Our Vision
            </h2>

            <p className="max-w-3xl mx-auto mt-6 text-lg leading-8 text-white/70">
              To become the trusted platform that connects people with
              opportunities to serve, empowering communities through
              technology, collaboration, and social responsibility.
            </p>

          </div>

        </section>

        {/* CTA */}

        <section className="mt-24 text-center">

          <h2 className="text-5xl font-display font-bold">
            Ready to Make an Impact?
          </h2>

          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
            Whether you're a volunteer looking to help or an NGO seeking
            passionate people, VolunteerConnect is here to bring everyone
            together.
          </p>

          <button
            className="mt-10 px-8 py-4 rounded-[var(--r-sm)] font-semibold"
            style={{
              background:
                "linear-gradient(135deg,var(--leaf-500),var(--forest-700))",
            }}
          >
            Join VolunteerConnect
          </button>

        </section>

      </main>
    </div>
  );
}