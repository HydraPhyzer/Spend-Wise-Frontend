/**
 * Money parsing and formatting.
 *
 * The backend returns amounts as loosely-formatted strings ("PKR 5,000",
 * "Rs 5000", "5000"). Intl.NumberFormat throws a RangeError on anything that
 * isn't a valid ISO 4217 code, so every value is normalised before it gets
 * near the formatter, and the formatter itself can never throw.
 */

export const FALLBACK_CURRENCY = "PKR";

const ISO_4217 = /^[A-Z]{3}$/;

// Symbols and abbreviations we may receive instead of an ISO code.
const CURRENCY_ALIASES = {
  RS: "PKR",
  "RS.": "PKR",
  "₨": "PKR",
  $: "USD",
  "US$": "USD",
  "€": "EUR",
  "£": "GBP",
  "₹": "INR",
  "﷼": "SAR",
  "د.إ": "AED",
};

/** Always returns something Intl.NumberFormat will accept. */
export function normalizeCurrency(raw) {
  if (!raw) return FALLBACK_CURRENCY;

  const trimmed = String(raw).trim();
  if (!trimmed) return FALLBACK_CURRENCY;

  const upper = trimmed.toUpperCase();
  if (ISO_4217.test(upper)) return upper;

  return CURRENCY_ALIASES[upper] || CURRENCY_ALIASES[trimmed] || FALLBACK_CURRENCY;
}

/** Pulls a numeric amount and a currency out of a mixed string. */
export function parseAmount(value) {
  if (value === null || value === undefined || value === "") {
    return { amount: 0, currency: FALLBACK_CURRENCY };
  }

  const raw = String(value);
  const symbol = raw.replace(/[\d\s,.\-+]/g, "").trim();
  const numeric = Number(raw.replace(/[^\d.\-]/g, ""));

  return {
    amount: Number.isFinite(numeric) ? numeric : 0,
    currency: normalizeCurrency(symbol),
  };
}

function activeLocale() {
  if (typeof navigator !== "undefined" && navigator.language) {
    return navigator.language;
  }
  return undefined; // let Intl pick the runtime default
}

/**
 * Formats an amount as currency. Never throws — an unusable currency code or
 * a non-numeric amount degrades to a readable plain string instead of taking
 * the component down with it.
 */
export function formatMoney(amount, currency = FALLBACK_CURRENCY, options = {}) {
  const code = normalizeCurrency(currency);
  const value = Number(amount);
  const safeValue = Number.isFinite(value) ? value : 0;

  const { compact = false, ...rest } = options;

  try {
    return new Intl.NumberFormat(activeLocale(), {
      style: "currency",
      currency: code,
      minimumFractionDigits: 0,
      maximumFractionDigits: compact ? 0 : 2,
      ...rest,
    }).format(safeValue);
  } catch (error) {
    // Unknown code, unsupported locale, or an exotic runtime.
    return `${code} ${safeValue.toLocaleString(undefined, {
      maximumFractionDigits: compact ? 0 : 2,
    })}`;
  }
}
