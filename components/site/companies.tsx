import Image from "next/image";
import { companyLogos } from "@/lib/content";
import { BenefitTrack } from "./benefit-track";
import "./companies.css";

export function Companies() {
  return <section id="companhias" className="content-section companies section-boundary" aria-labelledby="companies-title" tabIndex={-1}>
    <div className="section-light companies-light" aria-hidden="true" />
    <div className="container">
      <div className="section-heading" data-reveal><h2 id="companies-title">COMPANHIAS</h2></div>
    </div>
      {companyLogos.length > 0 && <BenefitTrack count={companyLogos.length} logos>
        {companyLogos.map(logo => <div className="card-reveal company-logo glass glass-card flow-glass" key={logo.id}>
          <Image src={logo.src} alt={logo.name} width={logo.width} height={logo.height} sizes="200px" style={{ width: logo.displayWidth }} />
        </div>)}
      </BenefitTrack>}
  </section>;
}
