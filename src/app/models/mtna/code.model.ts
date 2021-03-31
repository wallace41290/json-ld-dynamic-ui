import { HasContext, HasId } from '../json-ld';

export interface Code extends HasContext, HasId {
  code: string;
  descriptor: string;
}
