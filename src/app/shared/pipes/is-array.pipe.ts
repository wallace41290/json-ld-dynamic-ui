import { NgModule, Pipe, PipeTransform } from '@angular/core';

/**
 * Determines whether something is an array
 */
@Pipe({
  name: 'isArray',
})
export class IsArrayPipe implements PipeTransform {
  transform<T>(something: T[] | unknown | null | undefined): something is T[] {
    if (something !== null && something !== undefined) {
      return Array.isArray(something);
    }
    return false;
  }
}

@NgModule({
  exports: [IsArrayPipe],
  declarations: [IsArrayPipe],
})
export class IsArrayPipeModule {}
