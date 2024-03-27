export interface TextInputErrorProps {
  children?: React.ReactNode;
}

export default function TextInputError({ children }: TextInputErrorProps) {
  return <span className="text-sm text-red-400">{children}</span>;
}
