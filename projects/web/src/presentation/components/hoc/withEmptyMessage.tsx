export interface withEmptyMessageProps<DataType> {
  data: Array<DataType>;
}

export default function withEmptyMessage<ComponentProps, DataType>(
  WrappedComponent: React.ComponentType<
    ComponentProps & withEmptyMessageProps<DataType>
  >,
  MessageComponent: React.ComponentType,
) {
  const ComponentWithEmptyMessage = ({
    data,
    ...props
  }: ComponentProps & withEmptyMessageProps<DataType>): React.ReactNode => {
    if (data.length === 0) return <MessageComponent />;
    return <WrappedComponent data={data} {...(props as ComponentProps)} />;
  };
  return ComponentWithEmptyMessage;
}
