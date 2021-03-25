import { ExpandedTermDefinition } from './expanded-term-definition.model';
import { Term } from './term.model';

/**
 * A term definition is an entry in a context.
 * 
 * The key defines a term which may be used within a map as a key,
 * type, or elsewhere that a string is interpreted as a vocabulary item.
 * 
 * The value is either a string (simple term definition), expanding to an IRI,
 * or a map (expanded term definition).
 */
export type TermDefinition = [Term, string | ExpandedTermDefinition];