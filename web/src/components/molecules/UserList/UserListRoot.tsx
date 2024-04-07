interface UserListRootProps {
  children: React.ReactNode;
}

export default function UserListRoot({ children }: UserListRootProps) {
  return (
    <div className="mt-2 w-full max-h-128 border-2 border-zinc-900 rounded overflow-y-auto">
      {children}
    </div>
  );
}
