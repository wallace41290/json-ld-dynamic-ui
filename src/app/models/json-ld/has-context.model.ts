import { Context } from './context.model';

/**
 * A context is introduced using an entry with the key
 * @context and may appear within a node object or a value object.
 */
export interface HasContext {
  '@context': string | Context | Array<string | Context>;
}
