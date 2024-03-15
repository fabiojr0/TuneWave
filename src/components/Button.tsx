function Button({
  onClick,
  children,
  type = "primary",
}: {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "primary" | "time_range";
}) {
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const variants = {
    primary:
      "bg-darkGreen rounded-full p-2 flex items-center gap-2 text-white font-semibold hover:scale-110",
    time_range:
      "bg-zinc-800 rounded-full p-2 flex items-center gap-2 text-white font-semibold hover:scale-110",
  };

  return (
    <button onClick={handleClick} className={variants[type]}>
      {children}
    </button>
  );
}

export default Button;
