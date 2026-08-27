import nivionAsset from "@/assets/nivion.png.asset.json";

export function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        className={`grid size-9 place-items-center rounded-xl ${
          variant === "light" ? "bg-white hairline" : "bg-white/95"
        }`}
      >
        <img src={nivionAsset.url} alt="Logotipo NivionTech" className="size-6 object-contain" />
      </span>
      <span
        className={`font-display text-[1.05rem] font-semibold tracking-tight ${
          variant === "light" ? "text-ink" : "text-onnavy"
        }`}
      >
        Nivion<span className={variant === "light" ? "text-muted-foreground" : "text-onnavy-muted"}>Tech</span>
      </span>
    </span>
  );
}
