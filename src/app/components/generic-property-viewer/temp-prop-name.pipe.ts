import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempPropName',
})
export class TempPropNamePipe implements PipeTransform {
  transform(value: string): string {
    const slashParts = value.split('/');
    const last = slashParts[slashParts.length - 1];
    const eqParts = last.split('=');
    return eqParts[eqParts.length - 1];
  }
}
