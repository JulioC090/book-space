export default function useMergeRefs<T>(
  ...refs: React.Ref<T>[]
): React.RefCallback<T> {
  return (element: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = element;
      }
    });
  };
}
