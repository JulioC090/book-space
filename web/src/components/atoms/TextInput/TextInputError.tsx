export interface TextInputErrorProps {
  error?: string;
  messages: { [key: string]: string };
}

export default function TextInputError({
  error,
  messages,
}: TextInputErrorProps) {
  if (!error) return;

  const errorMessage = messages[error] || '';
  return <span className="text-sm text-red-400">{errorMessage}</span>;
}
