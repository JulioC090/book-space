import Card from '@/presentation/components/atoms/Card';

interface ActionCardProps {
  children: React.ReactNode;
  actionBar: React.ReactNode;
}

export default function ActionCard({ children, actionBar }: ActionCardProps) {
  return (
    <Card>
      <div className="absolute top-2 right-2">{actionBar}</div>
      {children}
    </Card>
  );
}
