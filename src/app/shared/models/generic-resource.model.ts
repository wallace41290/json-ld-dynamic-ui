import { HasContext, HasId } from './json-ld';

export type GenericResource = HasContext & HasId & Map<string, unknown>;
