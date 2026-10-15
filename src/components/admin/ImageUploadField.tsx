import Image from "next/image";
import { FieldGroup } from "./Field";

export function ImageUploadField({
  name,
  label,
  currentUrl,
  accept = "image/*",
  hint,
}: {
  name: string;
  label: string;
  currentUrl?: string | null;
  accept?: string;
  hint?: string;
}) {
  return (
    <FieldGroup label={label} hint={hint ?? "Envie um novo arquivo para substituir o atual. Deixe em branco para manter."}>
      <div className="flex items-center gap-4">
        {currentUrl && (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-ink/10 bg-sand">
            <Image src={currentUrl} alt="Atual" fill className="object-cover" />
          </div>
        )}
        <input
          type="file"
          name={name}
          accept={accept}
          className="w-full rounded-lg border border-dashed border-ink/20 bg-paper px-3.5 py-2.5 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-ink/5 file:px-3 file:py-1.5 file:text-xs"
        />
      </div>
    </FieldGroup>
  );
}
