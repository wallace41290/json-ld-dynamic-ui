/**
 * Terms are case sensitive and most valid strings that
 * are not reserved JSON-LD keywords can be used as a term.
 * Exceptions are the empty string "" and strings that have
 * the form of a keyword (i.e., starting with "@" followed
 * exclusively by one or more ALPHA characters (see [RFC5234])),
 * which must not be used as terms. Strings that have the form
 * of an IRI (e.g., containing a ":") should not be used as terms.
 */
export type Term = string;