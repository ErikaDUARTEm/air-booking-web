import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'durationFormat'
})
export class DurationFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value.includes(':')) return value; 
    
    const [hours, minutes] = value.split(':');
    return `${hours}h ${minutes}m`;
  }
}