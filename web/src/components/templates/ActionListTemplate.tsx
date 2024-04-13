import Button from '@/components/atoms/Button';
import Modal from '@/components/organism/Modal';

interface ActionListTemplateProps {
  title: React.ReactNode;
  action: { name: string; form: React.ReactNode };
  list: React.ReactNode;
}

export default function ActionListTemplate({
  title,
  action,
  list,
}: ActionListTemplateProps) {
  return (
    <>
      <div className="flex justify-between pt-8">
        {title}
        <Modal
          title={action.name}
          trigger={<Button>{action.name}</Button>}
          hasForm
        >
          {action.form}
        </Modal>
      </div>
      <div className="mt-6 flex-grow">{list}</div>
    </>
  );
}
