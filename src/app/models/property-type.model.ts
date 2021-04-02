import { GraphObject, IdMap, IncludedBlock, IndexMap, LanguageMap, ListObject, NodeObject, SetObject, TypeMap, ValueObject } from 'jsonld';

import { OrArray } from './or-array.model';

export type PropertyType =
  | OrArray<
      | null
      | boolean
      | number
      | string
      | NodeObject
      | GraphObject
      | ValueObject
      | ListObject
      | SetObject
    >
  | LanguageMap
  | IndexMap
  | IncludedBlock
  | IdMap
  | TypeMap
  | NodeObject[keyof NodeObject];
