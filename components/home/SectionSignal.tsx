
export function SectionSignal({ label, delay = "0s" }: { label?: string; delay?: string }) {
  return (
    <div className={"home-connector"}>
      <div className={"home-rail"} aria-hidden="true">
        <span className={"home-node"} />
        <span className={"home-track"}>
          <span className={"home-pulse"} style={{ animationDelay: delay }} />
        </span>
        <span className={"home-node-mid"} />
        <span className={"home-track"}>
          <span className={"home-pulse"} style={{ animationDelay: `calc(${delay} - 1.35s)` }} />
        </span>
        <span className={"home-node"} />
      </div>
      {label ? <p className={"home-step"}>{label}</p> : null}
    </div>
  );
}
