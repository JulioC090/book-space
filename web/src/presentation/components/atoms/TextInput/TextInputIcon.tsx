import { Slot } from '@radix-ui/react-slot';

export interface TextInputIconProps {
  children: React.ReactNode;
}

export default function TextInputIcon({ children }: TextInputIconProps) {
  return <Slot className="w-6 h-6 text-zinc-400">{children}</Slot>;
}
