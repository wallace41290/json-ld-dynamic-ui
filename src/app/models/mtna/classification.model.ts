import { HasContext, HasId } from '../json-ld';
import { Code } from './code.model';
import { Level } from './level.model';

export interface Classification extends HasContext, HasId {
  name: string;
  abbreviation: string;
  audience: string;
  status: string;
  levels: Level[];
  codes: Code[];
}
