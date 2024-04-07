export interface withEmptyMessageProps<T> {
  data: Array<T>;
}

export default function withEmptyMessage<T>(
  WrappedComponent: React.ComponentType<withEmptyMessageProps<T>>,
  MessageComponent: React.ComponentType,
) {
  const ComponentWithEmptyMessage = ({
    data,
  }: withEmptyMessageProps<T>): React.ReactNode => {
    if (data.length === 0) return <MessageComponent />;
    return <WrappedComponent data={data} />;
  };
  return ComponentWithEmptyMessage;
}
