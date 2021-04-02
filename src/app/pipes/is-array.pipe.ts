import { NgModule, Pipe, PipeTransform } from '@angular/core';

/**
 * Determines whether something is an array
 */
@Pipe({
  name: 'isArray',
})
export class IsArrayPipe implements PipeTransform {
  transform<T>(something: T[] | unknown | null | undefined): something is T[] {
    if (
      something !== null &&
      something !== undefined &&
      Array.isArray(something)
    ) {
      return true;
    }
    return false;
  }
}

@NgModule({
  exports: [IsArrayPipe],
  declarations: [IsArrayPipe],
})
export class IsArrayPipeModule {}
