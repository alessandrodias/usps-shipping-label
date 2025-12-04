import { CheckIcon, XIcon, Loader2Icon } from "lucide-react";

interface StatusTagProps {
  status: "validating" | "valid" | "invalid" | null;
}

const commonClasses =
  "px-3 text-center rounded-md border flex items-center justify-center text-sm";

export default function StatusTag({ status }: StatusTagProps) {
  if (status === "valid") {
    return (
      <span className={`${commonClasses} text-green-500 border-green-500`}>
        Valid <CheckIcon className="w-4 h-4 ml-2" />
      </span>
    );
  }

  if (status === "invalid") {
    return (
      <span className={`${commonClasses} text-red-500 border-red-500`}>
        Invalid <XIcon className="w-4 h-4 ml-2" />
      </span>
    );
  }

  if (status === "validating") {
    return (
      <span className={`${commonClasses} text-yellow-500 border-yellow-500`}>
        Validating <Loader2Icon className="w-4 h-4 ml-2" />
      </span>
    );
  }

  return null;
}
