import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bold',
  standalone: true
})
export class BoldPipe implements PipeTransform {
  transform(value: string, boldValue: string): string {
    const index = value.toLowerCase().indexOf(boldValue.toLowerCase());
    if (index >= 0) {
      return value.substring(0, index)
        + '<b>'
        + value.substring(index, boldValue.length + index)
        + '</b>'
        + value.substring(boldValue.length + index);
    }
    return value;
  }

}
