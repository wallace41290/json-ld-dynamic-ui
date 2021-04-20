import { NgModule, Pipe, PipeTransform } from '@angular/core';

/**
 * Determines whether an object has the given property
 */
@Pipe({
  name: 'hasProperty',
})
export class HasPropertyPipe implements PipeTransform {
  transform<X extends {}, Y extends PropertyKey>(obj: X | null | undefined, prop: Y): obj is X & Record<Y, unknown> {
    if (obj === null || obj === undefined) {
      return false;
    }
    return obj.hasOwnProperty(prop);
  }
}

@NgModule({
  exports: [HasPropertyPipe],
  declarations: [HasPropertyPipe],
})
export class HasPropertyPipeModule {}
