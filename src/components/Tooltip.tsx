function Tooltip({
  children,
  message,
}: {
  children: React.ReactNode;
  message: string;
}) {
  return (
    <div className="group relative flex cursor-pointer">
      {children}
      <span
        className={`absolute ${
          message.length > 0 ? "scale-100" : "scale-0"
        } -top-10 right-0  transition-all rounded bg-green-500 p-1 text-xs text-white text-center font-medium`}
      >
        {message}
      </span>
    </div>
  );
}

export default Tooltip;
