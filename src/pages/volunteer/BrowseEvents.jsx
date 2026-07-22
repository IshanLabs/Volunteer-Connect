import { useMemo, useState, useEffect } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import EventCard from "../../components/EventCard";
import { fetchAllEvents } from "../../api/eventService";

const categories = [
  "All",
  "Environment",
  "Education",
  "Health",
  "Food",
  "Animal Welfare",
  "Community",
];

export default function BrowseEvents() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [eventsList, setEventsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, [search, selectedCategory]);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const response = await fetchAllEvents({
        search,
        category: selectedCategory !== "All" ? selectedCategory : undefined,
      });
      setEventsList(response.data || []);
    } catch (error) {
      console.error("Failed to fetch live events:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen canopy-mesh grain relative overflow-hidden text-white">

      {/* Background Orbs */}
      <motion.div
        className="absolute w-[36rem] h-[36rem] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "var(--gold-500)",
          top: "-10rem",
          right: "-10rem",
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[28rem] h-[28rem] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "var(--leaf-400)",
          bottom: "-8rem",
          left: "-8rem",
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <Sidebar />

      <main className="ml-64 p-8 relative z-10">

        <Navbar />

        {/* Header */}

        <div className="mt-8 flex items-end justify-between">

          <div>
            <h1 className="font-display text-4xl font-bold">
              Browse Events
            </h1>

            <p
              className="mt-2"
              style={{ color: "rgba(255,255,255,.65)" }}
            >
              Discover volunteer opportunities around you.
            </p>
          </div>

          <div
            className="px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              background: "rgba(255,255,255,.08)",
              border: "1px solid rgba(255,255,255,.12)",
              color: "var(--leaf-300)",
            }}
          >
            {eventsList.length} Events Found
          </div>

        </div>

        {/* Search */}

        <div className="relative mt-8">

          <Search
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events, cities..."
            className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none backdrop-blur-sm focus:border-green-500 transition"
          />

        </div>

        {/* Categories */}

        <div className="flex flex-wrap gap-3 mt-6">

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
              style={{
                background:
                  selectedCategory === category
                    ? "linear-gradient(135deg,var(--leaf-500),var(--forest-700))"
                    : "rgba(255,255,255,.05)",

                border: "1px solid rgba(255,255,255,.1)",

                color:
                  selectedCategory === category
                    ? "#fff"
                    : "rgba(255,255,255,.7)",
              }}
            >
              {category}
            </button>
          ))}

        </div>

        {/* Grid */}

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading events...</div>
        ) : eventsList.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No events found matching your criteria.</div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-3 gap-6 mt-10"
          >
            {eventsList.map((event) => (
              <EventCard
                key={event.event_id || event.id}
                id={event.event_id || event.id}
                title={event.event_name || event.title}
                ngo={event.organization_name || event.ngo}
                location={event.city || event.location}
                date={event.start_at ? new Date(event.start_at).toLocaleDateString() : event.date}
                image={event.banner_url || event.image}
              />
            ))}
          </motion.div>
        )}

      </main>

    </div>
  );
}