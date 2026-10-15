"use client";

export function DeleteButton({
  action,
  confirmMessage = "Tem certeza que deseja excluir? Essa ação não pode ser desfeita.",
  label = "Excluir",
}: {
  action: () => Promise<void>;
  confirmMessage?: string;
  label?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="font-label rounded-full border border-wine/30 px-4 py-2 text-[11px] text-wine hover:bg-wine/10"
      >
        {label}
      </button>
    </form>
  );
}
