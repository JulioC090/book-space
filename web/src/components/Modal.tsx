'use client';

import { IconButton } from '@/components/IconButton';
import { X } from '@phosphor-icons/react/dist/ssr';
import * as Dialog from '@radix-ui/react-dialog';
import { Slot } from '@radix-ui/react-slot';
import { useState } from 'react';

export interface ModalProps {
  title: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  hasForm?: boolean;
}

export default function Modal({
  title,
  trigger,
  hasForm,
  children,
}: ModalProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0 z-40" />
        <Dialog.Content className="fixed p-10 bg-zinc-900 rounded w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow z-50">
          <Dialog.Close asChild>
            <IconButton className="absolute right-2 top-2">
              <X aria-label="Fechar" />
            </IconButton>
          </Dialog.Close>
          <Dialog.Title className="text-2xl font-bold text-center mb-4">
            {title}
          </Dialog.Title>

          {hasForm ? (
            <Slot onSubmit={() => setOpen(false)}>{children}</Slot>
          ) : (
            <>{children}</>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
