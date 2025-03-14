import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'routeIdFormat'
})
export class RouteIdFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value || value.length <= 6) return value; // Si es muy corto, se muestra completo
    return `${value.substring(0, 3)}-${value.substring(value.length - 3)}`;
  }
}
