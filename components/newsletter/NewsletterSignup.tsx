import { KitForm } from "./KitForm";

const benefits = [
  "The week's biggest agent news, minus the hype",
  "First look at our free tools and benchmark reports",
  "Hand-picked tools from our directory",
];

function GoldCheck() {
  return (
    <span className="newsletter-check" aria-hidden>
      <svg viewBox="0 0 16 16">
        <path
          d="M3.2 8.2 6.4 11.4 12.8 4.7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function NewsletterSignup({
  id,
  placement = "inline",
}: {
  id: string;
  placement?: "inline" | "footer" | "popup";
}) {
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;
  const className = [
    "newsletter-card",
    placement === "footer" ? "newsletter-card-footer" : "",
    placement === "popup" ? "newsletter-card-popup" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={className} aria-labelledby={titleId}>
      <div className="newsletter-copy">
        <p className="kicker kicker-lead">Newsletter</p>
        <h2 id={titleId} className="display newsletter-title">
          Get smarter about AI agents in 5 minutes a week
        </h2>
        <p id={descId} className="newsletter-subhead">
          Every Thursday: the agent news that actually matters, new tools worth trying, and our original reports and
          benchmarks, explained in plain English. Free. Unsubscribe anytime.
        </p>
        <ul className="newsletter-benefits">
          {benefits.map((benefit) => (
            <li key={benefit}>
              <GoldCheck />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="newsletter-form-wrap">
        <KitForm instanceId={id} />
        <p className="newsletter-trust">No spam. One email a week.</p>
      </div>
    </section>
  );
}
