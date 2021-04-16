import { PropertyType } from '../property-type.model';

export class GenericProperty {
  constructor(public iri: string, public value: PropertyType) {}
}
