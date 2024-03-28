import { ring2 } from "ldrs";

function Button({
  onClick,
  children,
  type = "primary",
  loading,
  selected,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "primary" | "time_range";
  loading?: boolean;
  selected?: boolean;
}) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const variants = {
    primary:
      "bg-darkGreen rounded-full p-2 flex items-center justify-center gap-2 text-white font-semibold hover:scale-110 transition-all min-w-20 min-h-9 ",
    time_range: `bg-zinc-800 rounded-lg py-2 px-4 flex items-center justify-center gap-2 font-semibold hover:scale-110 transition-all text-sm min-w-20 min-h-9 whitespace-nowrap ${
      selected ? "text-lightGreen" : "text-white"
    }`,
  };

  const loadingVariants = {
    primary: "#ffffff",
    time_range: "#1ED760",
  };

  ring2.register();

  return (
    <button onClick={handleClick} className={variants[type]}>
      {loading ? (
        <l-ring-2
          size="20"
          stroke="2"
          stroke-length="0.25"
          bg-opacity="0.1"
          speed="0.6"
          color={loadingVariants[type]}
        />
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
