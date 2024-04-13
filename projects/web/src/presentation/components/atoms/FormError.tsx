export interface FormErrorProps {
  error?: string;
  messages: { [key: string]: string };
}

export default function FormError({ error, messages }: FormErrorProps) {
  if (!error) return;

  const errorMessage = messages[error];
  if (!errorMessage) return;

  return (
    <div className="bg-red-300 py-3 px-4 w-full text-sm text-red-700 border-red-400 border-2 font-bold rounded">
      {errorMessage}
    </div>
  );
}
