export interface ErrorLabelProps {
  error?: string;
}

export default function ErrorLabel({ error }: ErrorLabelProps) {
  if (!error) return;
  return <span className="text-sm text-red-400">{error}</span>;
}
