import { Handshake, UserRoundPlus } from "lucide-react";
import { referralInquiryHref, referralProgram } from "@/lib/content";

export function ReferralProgram() {
  return <section id="indicacoes" className="content-section referrals section-boundary" tabIndex={-1} aria-labelledby="referrals-title">
    <div className="section-light referrals-light" aria-hidden="true" />
    <div className="container">
      <div className="referral-heading" data-reveal>
        <h2 id="referrals-title">{referralProgram.title}</h2>
      </div>
      <div className="referral-grid" data-reveal>
        {referralProgram.options.map((option) => {
          const Icon = option.id === "affiliate" ? UserRoundPlus : Handshake;
          return <div className="card-reveal" data-reveal-part key={option.id}>
            <article className="glass glass-card flow-glass referral-card" aria-labelledby={`${option.id}-title`}>
              <div className="referral-card-title"><Icon size={18} strokeWidth={1.4} aria-hidden="true" /><h3 id={`${option.id}-title`}>{option.title}</h3></div>
              <p className="referral-reward">{option.reward}</p>
              <div className="referral-description">{option.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
              {option.benefits.length > 0 && <div className="referral-benefits">{option.benefits.map((benefit) => <p key={benefit}>{benefit}</p>)}</div>}
              <a className="referral-cta glass flow-glass flow-capsule" href={referralInquiryHref(option.id)} target="_blank" rel="noopener noreferrer">{option.cta}</a>
            </article>
          </div>;
        })}
      </div>
      <div className="referral-commercial" data-reveal>
        <h3>{referralProgram.commercialTitle}</h3>
        <p>{referralProgram.commercialDescription}</p>
      </div>
    </div>
  </section>;
}
