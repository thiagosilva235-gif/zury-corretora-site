import Image from "next/image";
import { benefitPartners, benefitsContent } from "@/lib/content";
import { BenefitTrack } from "./benefit-track";

export function ExclusiveBenefits() {
  return <section id="beneficios" className="content-section benefits section-boundary" tabIndex={-1} aria-labelledby="benefits-title">
    <div className="section-light benefits-light" aria-hidden="true" />
    <div className="container">
      <div className="section-heading benefits-heading" data-reveal>
        <h2 id="benefits-title">{benefitsContent.title}</h2>
        <p className="benefits-headline">{benefitsContent.headline}</p>
      </div>
      <BenefitTrack count={benefitPartners.length}>
        {benefitPartners.map((partner) => <div className="card-reveal" key={partner.id}>
          <article className="glass glass-card flow-glass benefit-card" aria-label={partner.name}>
            {partner.logo && <div className="benefit-logo-well"><Image src={partner.logo} alt="" width={partner.width} height={partner.height} sizes="150px" className={`partner-logo partner-logo-${partner.id}`} /></div>}
            <h3>{partner.name}</h3>
            <p className="benefit-offer">{partner.offer}</p>
          </article>
        </div>)}
      </BenefitTrack>
    </div>
  </section>;
}
