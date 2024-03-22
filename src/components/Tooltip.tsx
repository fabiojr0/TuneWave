function Tooltip({
  children,
  message,
  color,
}: {
  children: React.ReactNode;
  message: string;
  color?: string;
}) {
  return (
    <div className="group relative flex cursor-pointer">
      {children}
      <span
        className={`absolute ${
          message.length > 0 ? "scale-100" : "scale-0"
        } -top-10 right-0  transition-all rounded  p-1 text-xs text-white text-center font-medium`}
        style={{ backgroundColor: color || "#1ED760" }}
      >
        {message}
      </span>
    </div>
  );
}

export default Tooltip;
