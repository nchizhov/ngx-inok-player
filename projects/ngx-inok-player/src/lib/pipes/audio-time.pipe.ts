import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'audioTime'
})
export class AudioTimePipe implements PipeTransform {
  transform(time: any): any {
    if (time === null) {
      return '';
    }
    time = strToNumber(time);
    if (isNaN(parseFloat(String(time))) || !isFinite(time)) {
      return '';
    }
    const minutes: number = Math.floor(time / 60);
    const seconds: string = ('0' + Math.round(time % 60)).slice(-2);
    return `${minutes}:${seconds}`;
  }
}

function strToNumber(value: number | string): number {
  // Convert strings to numbers
  if (typeof value === 'string' && !isNaN(Number(value) - parseFloat(value))) {
    return Number(value);
  }
  if (typeof value !== 'number') {
    throw new Error(`${value} is not a number`);
  }
  return value;
}
