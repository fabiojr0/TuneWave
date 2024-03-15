import DotLoading from "./DotLoading";

function Button({
  onClick,
  children,
  type = "primary",
  loading,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "primary" | "time_range";
  loading?: boolean;
}) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const variants = {
    primary:
      "bg-darkGreen rounded-full p-2 flex items-center gap-2 text-white font-semibold hover:scale-110 transition-all",
    time_range:
      "bg-zinc-800 rounded-lg p-2 flex items-center justify-center gap-2 text-white font-semibold hover:scale-110 transition-all text-sm min-w-20 min-h-9",
  };

  return (
    <button onClick={handleClick} className={variants[type]}>
      {loading ? <DotLoading /> : children}
    </button>
  );
}

export default Button;
