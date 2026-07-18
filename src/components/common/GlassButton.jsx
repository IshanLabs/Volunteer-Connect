function GlassButton({ children }) {
  return (
    <button
      className="
      relative
      overflow-hidden
      px-8
      py-4
      rounded-full
      font-semibold
      text-white
      bg-gradient-to-r
      from-green-500
      to-green-400
      shadow-lg
      hover:shadow-green-500/50
      hover:scale-105
      transition-all
      duration-300
      "
    >
      {children}
    </button>
  );
}

export default GlassButton;