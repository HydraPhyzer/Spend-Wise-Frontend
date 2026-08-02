import React from "react";
import { FAQS } from "../SEO/JsonLd";

/**
 * Rendered from the same source as the FAQPage structured data, so what
 * search engines are told always matches what a visitor can actually read.
 */
const Faq = () => {
  return (
    <section id="faq" className="page-shell">
      <div className="card overflow-hidden">
        <div className="card-head">
          <h2 className="card-title">Frequently asked questions</h2>
          <div className="eyebrow hidden sm:block">{FAQS.length} answers</div>
        </div>

        <div className="grid gap-px bg-line md:grid-cols-2">
          {FAQS.map((item, i) => (
            <details
              key={item.question}
              className="group bg-surface px-5 py-4 md:px-6 md:py-5"
              open={i === 0}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <h3 className="text-[14px] font-medium leading-[1.45]">
                  {item.question}
                </h3>
                <span className="num shrink-0 text-[13px] text-text3 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-2.5 max-w-[60ch] text-[13px] leading-[1.65] text-text2">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
