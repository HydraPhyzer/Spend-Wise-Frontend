import React from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * Wordmark: the original Spend-Wise logo + serif name, with an optional
 * mono sub-label underneath.
 */
const Brand = ({ href = "/home", subtitle = "Funds Management", size = "md" }) => {
  const logoSize = size === "sm" ? 28 : 36;
  const name = size === "sm" ? "text-[17px]" : "text-[20px]";

  const inner = (
    <span className="flex items-center gap-[9px]">
      <Image
        src="/Logo/spend-wise-logo.png"
        alt="Spend-Wise logo"
        width={logoSize}
        height={logoSize}
        className="shrink-0"
        priority
      />
      <span className={`display ${name}`}>Spend-Wise</span>
    </span>
  );

  return (
    <div className="min-w-0">
      {href ? (
        <Link href={href} className="text-text">
          {inner}
        </Link>
      ) : (
        inner
      )}
      {subtitle && <div className="eyebrow mt-[6px]">{subtitle}</div>}
    </div>
  );
};

export default Brand;
