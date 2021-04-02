import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { JsonLdObj } from 'jsonld/jsonld-spec';

import { GenericProperty } from '../models';

/**
 * Given a `JsonLdObj` that represents a resource, filter all it's
 * json properties down to the actual resource properties
 */
@Pipe({
  name: 'filterResourceProperties',
})
export class FilterResourcePropertiesPipe implements PipeTransform {
  transform(json: JsonLdObj): Array<GenericProperty> {
    const properties = new Array<GenericProperty>();
    for (const prop in json) {
      if (json.hasOwnProperty(prop) && !prop.startsWith('@')) {
        properties.push(new GenericProperty(prop, json[prop]));
      }
    }
    return properties;
  }
}

@NgModule({
  exports: [FilterResourcePropertiesPipe],
  declarations: [FilterResourcePropertiesPipe],
})
export class FilterResourcePropertiesPipeModule {}
