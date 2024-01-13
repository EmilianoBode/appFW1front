import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByNum'
})
export class SortByNumPipe implements PipeTransform {

  transform(array: any[],campo:any): any[] {

    if (!array || array.length === 0) return array;

    return array.sort((n1 , n2)=>{

      let val1 = n1[campo];
      let val2 = n2[campo];
      return val1 - val2;

    });

  }

}
