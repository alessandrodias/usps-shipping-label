interface ButtonProps {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  isLoading,
  onClick,
  type,
  className,
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-blue-500 text-white p-2 rounded-md select-none ${
        disabled
          ? "opacity-50 cursor-default"
          : "cursor-pointer hover:bg-blue-600"
      } ${className}`}
      disabled={disabled || isLoading}
    >
      {children}
    </button>
  );
}
