import UserListRoot from '@/components/molecules/UserList/UserListRoot';

export default function UserListEmpty() {
  return (
    <UserListRoot>
      <div className="flex flex-col justify-center text-center text-zinc-500 w-full p-4 ">
        <p>Nenhum usuário encontrado.</p>
        <p>Adicione um novo usuário usando o botão acima.</p>
      </div>
    </UserListRoot>
  );
}
