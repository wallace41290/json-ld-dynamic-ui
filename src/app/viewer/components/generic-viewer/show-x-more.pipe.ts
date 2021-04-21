import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showXMore',
})
export class ShowXMorePipe implements PipeTransform {
  transform(totalItems: number, visibleItems: number, maxMore: number): number {
    return Math.min(totalItems - visibleItems, maxMore);
  }
}
