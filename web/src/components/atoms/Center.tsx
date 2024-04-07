export interface CenteringWrapperProps {
  children: React.ReactNode;
}

export default function Center({ children }: CenteringWrapperProps) {
  return (
    <div className="flex justify-center items-center flex-col h-screen">
      {children}
    </div>
  );
}
