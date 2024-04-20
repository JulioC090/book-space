export default function SpaceListEmpty() {
  return (
    <div className="w-full max-h-128 border-2 border-zinc-900 rounded overflow-y-auto">
      <div className="flex flex-col justify-center text-center text-zinc-500 w-full p-4 ">
        <p>Nenhum espaço encontrado.</p>
        <p>Adicione um novo espaço usando o botão acima.</p>
      </div>
    </div>
  );
}
