import { Slot } from '@radix-ui/react-slot';

interface ListTemplateProps {
  title: React.ReactNode;
  list: React.ReactNode;
}

export default function ListTemplate({ title, list }: ListTemplateProps) {
  return (
    <>
      <Slot className="pt-8">{title}</Slot>
      <div className="mt-6 flex-grow">{list}</div>
    </>
  );
}
