import ErrorLabel from '@/components/atoms/ErrorLabel';
import { TextInput } from '@/components/atoms/TextInput';
import { InputHTMLAttributes, forwardRef } from 'react';

interface TextInputControllerProps
  extends InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  error?: { message?: string };
}

const TextInputController = forwardRef<
  HTMLInputElement,
  TextInputControllerProps
>(({ icon, error, ...rest }: TextInputControllerProps, ref) => {
  return (
    <div className="w-full">
      <TextInput.Root error={!!error}>
        <TextInput.Icon>{icon}</TextInput.Icon>
        <TextInput.Input ref={ref} {...rest} />
      </TextInput.Root>
      <ErrorLabel error={error?.message} />
    </div>
  );
});

TextInputController.displayName = 'TextInputController';

export default TextInputController;
