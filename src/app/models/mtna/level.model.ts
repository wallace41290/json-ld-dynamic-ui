import { HasContext, HasId } from '../json-ld';

export interface Level extends HasContext, HasId {
  levelDepth: number;
  name: string;
  codeCount: number;
}
