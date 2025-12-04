export default function ValidationMessage({
  message,
}: {
  message: string | undefined;
}) {
  if (!message) return null;

  return (
    <p className="text-red-500 p-2 px-4 text-center h-10 rounded-md border border-red-500 flex items-center justify-center font-semibold text-sm">
      {message}
    </p>
  );
}
