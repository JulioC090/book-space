import { FloatingMenu } from '@/components/FloatingMenu';
import {
  BookmarkSimple,
  LinkSimple,
  SignOut,
} from '@phosphor-icons/react/dist/ssr';

export default function DefaultMenu() {
  return (
    <>
      <FloatingMenu.Item icon={<LinkSimple />} label="Obter Link" />
      <FloatingMenu.Item icon={<BookmarkSimple />} label="Adicionar Anotação" />

      <FloatingMenu.Separator />

      <FloatingMenu.Item icon={<SignOut />} label="Sair da Workspace" />
    </>
  );
}
