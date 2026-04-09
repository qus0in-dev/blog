type Props = {
  className?: string;
  label?: string;
};

export function KakaoAd({
  className = "",
  label = "Sponsored",
}: Props) {
  return (
    <aside
      className={`kakao-ad-slot border border-border bg-card/80 p-4 ${className}`.trim()}
      aria-label="Advertisement"
    >
      <div className="mb-3 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div className="kakao-ad-frame mx-auto">
        <ins
          className="kakao_ad_area"
          style={{ display: "none" }}
          data-ad-unit="DAN-u0bnTqAZx4rBeDMk"
          data-ad-width="300"
          data-ad-height="250"
        />
      </div>
      <script
        async
        type="text/javascript"
        src="//t1.daumcdn.net/kas/static/ba.min.js"
      />
    </aside>
  );
}
