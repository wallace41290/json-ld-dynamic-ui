import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { JsonLdArray, JsonLdObj } from 'jsonld/jsonld-spec';


/**
 * Extract the underlying `JsonLdObject` from a `JsonLdArray`
 */
@Pipe({
  name: 'extractJsonLdObject',
})
export class ExtractJsonLdObjectPipe implements PipeTransform {
  transform(array: JsonLdArray | null | undefined): JsonLdObj {
    if (array?.length === 1 && typeof array[0] === 'object') {
      return array[0];
    }
    return {};
  }
}


@NgModule({
  exports: [ExtractJsonLdObjectPipe],
  declarations: [ExtractJsonLdObjectPipe],
})
export class ExtractJsonLdObjectPipeModule {}
