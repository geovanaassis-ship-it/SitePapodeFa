import Link from "next/link";
import Image from "next/image";

export function Logo({
  logoUrl,
  siteName,
  variant = "dark",
  className,
}: {
  logoUrl?: string | null;
  siteName: string;
  variant?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${siteName} — página inicial`}
      className={`inline-flex items-center gap-2 shrink-0 ${className ?? ""}`}
    >
      {logoUrl ? (
        <span className="relative block h-10 w-auto sm:h-12">
          <Image
            src={logoUrl}
            alt={siteName}
            height={48}
            width={160}
            className="h-full w-auto object-contain"
            priority
          />
        </span>
      ) : (
        <span
          className={`font-display text-xl sm:text-2xl font-bold leading-none ${
            variant === "light" ? "text-paper" : "text-ink"
          }`}
        >
          {siteName}
        </span>
      )}
    </Link>
  );
}
