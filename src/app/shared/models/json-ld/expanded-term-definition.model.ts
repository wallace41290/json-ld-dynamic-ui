/**
 * When an entry with a term key has a map value, the map is called an expanded term definition.
 */
export type ExpandedTermDefinition = Map<string, string>;

export function isExpandedTermDefinition(
  something: unknown
): something is ExpandedTermDefinition {
  if (something instanceof Map) {
    // Make sure all keys and values are strings
    for (const [key, value] of something.entries()) {
      if (typeof key !== 'string' || typeof value !== 'string') {
        return false;
      }
    }

    // If it is a map, all keys are strings,
    // and all values are strings,
    // then we know it is an expanded term definition.
    return true;
  }
  return false;
}
