import { motion } from "framer-motion";
import earth from "../../assets/images/earth.png";
import GlassButton from "../common/GlassButton";

function Hero() {
  return (
    <section
      className="
      relative
      min-h-screen
      overflow-hidden
      bg-gradient-to-br
      from-[#071B10]
      via-[#0D2818]
      to-[#071B10]
    "
    >
      {/* Green Glow Left */}
      <div
        className="
        absolute
        top-20
        left-10
        w-72
        h-72
        bg-green-500/20
        blur-[120px]
        rounded-full
      "
      />

      {/* Green Glow Right */}
      <div
        className="
        absolute
        bottom-20
        right-10
        w-96
        h-96
        bg-green-400/20
        blur-[150px]
        rounded-full
      "
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Hero Content */}
      <div
        className="
        relative
        z-10
        max-w-7xl
        mx-auto
        min-h-screen
        px-8
        pt-32
        lg:pt-36
        flex
        items-center
      "
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight">

              Go Green Today,

              <br />

              Save The World

              <br />

              <span className="text-green-400">
                Tomorrow.
              </span>

            </h1>

            <p className="text-gray-300 mt-8 text-lg max-w-xl leading-8">

              Volunteer with NGOs, participate in environmental campaigns,
              and help build a cleaner, greener future.

            </p>

            <div className="flex gap-5 mt-10">

              <GlassButton>
                Join Now
              </GlassButton>

              <GlassButton>
                Learn More
              </GlassButton>

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <motion.img
              src={earth}
              alt="Earth"
              className="w-[450px] lg:w-[550px]"
              animate={{ rotate: 360 }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Hero;