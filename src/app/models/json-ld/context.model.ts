import {
  TermDefinition,
  isExpandedTermDefinition
} from "./term-definition.model";

/**
 * A context is used to map terms to IRIs.
 *
 * The value of a term definition can either be a simple string,
 * mapping the term to an IRI, or a map.
 */
export type Context = Map<TermDefinition[0], TermDefinition[1]>;

export function isContext(something: unknown): something is Context {
  if (something instanceof Map) {
    for (let [key, value] of map.entries()) {
      if (
        // Make sure all keys are terms
        typeof key !== TermDefinition[0] &&
        // Make sure all values are string | ExpandedTermDefinition
        (typeof value !== "string" || !isExpandedTermDefinition(value))
      ) {
        return false;
      }
    }
    // If it is a map, all keys are terms,
    // and all values are strings or expanded term definitions,
    // then we know it is a context.
    return true;
  }
  return false;
}
