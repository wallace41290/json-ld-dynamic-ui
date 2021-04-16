import { HasContext, HasId } from '../json-ld';
import { CodeMap } from './code-map.model';

export interface Concordance extends HasContext, HasId {
  name: string;
  audience: string;
  status: string;
  versionName: string;
  source: string;
  target: string;
  versionConcordance: boolean;
  codeMaps: CodeMap[];
}
