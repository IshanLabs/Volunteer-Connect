import { motion } from "framer-motion";
import earth from "../../assets/images/earth.png";

function AuthLayout({ title, subtitle, children }) {
  return (
    <section
      className="
      min-h-screen
      bg-gradient-to-br
      from-[#06140D]
      via-[#0A2416]
      to-[#081C15]
      flex
      items-center
      justify-center
      p-6
      overflow-hidden
      relative
      "
    >
      {/* Background Glow */}

      <div className="absolute w-80 h-80 bg-green-500/20 blur-[120px] rounded-full -top-20 -left-20"></div>

      <div className="absolute w-96 h-96 bg-green-400/10 blur-[150px] rounded-full bottom-0 right-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .7 }}
        className="
        max-w-6xl
        w-full
        rounded-3xl
        overflow-hidden
        bg-white/10
        backdrop-blur-2xl
        border
        border-white/10
        shadow-2xl
        grid
        lg:grid-cols-2
        "
      >
        {/* LEFT */}

        <div
          className="
          hidden
          lg:flex
          flex-col
          justify-center
          items-center
          p-12
          relative
          "
        >
          <motion.img
            src={earth}
            alt="Earth"
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-80"
          />

          <h2 className="text-white text-4xl font-bold mt-10">

            Volunteer Connect

          </h2>

          <p className="text-gray-300 text-center mt-4">

            Together we create
            <br />
            a better tomorrow.

          </p>
        </div>

        {/* RIGHT */}

        <div className="p-10 lg:p-14">

          <h1 className="text-white text-4xl font-bold">

            {title}

          </h1>

          <p className="text-gray-400 mt-3 mb-10">

            {subtitle}

          </p>

          {children}

        </div>

      </motion.div>

    </section>
  );
}

export default AuthLayout;