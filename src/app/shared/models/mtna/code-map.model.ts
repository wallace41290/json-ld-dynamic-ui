import { HasContext, HasId } from '../json-ld';

export interface CodeMap extends HasContext, HasId {
  maptype: string;
  sourceCode: string[];
  sourceDescriptor: string[];
  sourceSinceVersion: string[];
  targetCode: string[];
  targetDescriptor: string[];
  targetSinceVersion: string[];
}
