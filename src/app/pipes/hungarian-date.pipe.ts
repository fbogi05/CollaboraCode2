import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'hungarianDate',
})
export class HungarianDatePipe implements PipeTransform {
  transform(value: any): any {
    if (value) {
      return moment(value).locale('hu').format('YYYY. MM. DD - HH:mm');
    }
    return value;
  }
}
