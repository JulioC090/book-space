export interface TextInputRootProps {
  children: React.ReactNode;
}

export default function TextInputRoot({ children }: TextInputRootProps) {
  return <div className="w-full">{children}</div>;
}
