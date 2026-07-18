function AuthButton({
  loading = false,
  children,
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        w-full
        py-4
        rounded-xl
        text-white
        font-semibold
        transition-all
        duration-300

        ${
          loading || disabled
            ? "bg-gray-600 cursor-not-allowed opacity-70"
            : "bg-gradient-to-r from-green-500 to-green-400 hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/40"
        }
      `}
    >
      {loading ? (
        <div
          className="
            w-6
            h-6
            border-2
            border-white
            border-t-transparent
            rounded-full
            animate-spin
            mx-auto
          "
        ></div>
      ) : (
        children
      )}
    </button>
  );
}

export default AuthButton;