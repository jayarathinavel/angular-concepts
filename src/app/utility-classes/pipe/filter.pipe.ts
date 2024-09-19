import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    return items.filter(item =>
      Object.values(item).some(value => {
        const stringValue = (value as string | number).toString();
        return stringValue.toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }
}
