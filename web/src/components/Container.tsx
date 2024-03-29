export interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col min-h-screen">
      {children}
    </div>
  );
}
