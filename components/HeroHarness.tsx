import { HeroNetwork } from "@/components/HeroNetwork";
import { HeroStage } from "@/components/HeroStage";

export function HeroHarness() {
  return (
    <HeroStage>
      <div className="hero-glow hero-glow-cyan" />
      <div className="hero-glow hero-glow-blue" />
      <div className="hero-glow hero-glow-gold" />
      <HeroNetwork />
      <p className="hero-caption">
        <span>Orchestrator</span>
        <span className="hero-caption-live">Tools in orbit</span>
      </p>
    </HeroStage>
  );
}
