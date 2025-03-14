import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixDate'
})
export class FixDatePipe implements PipeTransform {
  transform(value: string): Date | string {
    if (!value) return 'Fecha no disponible';

    // Intentar convertir directamente
    let date = new Date(value);
    
    // Si la conversión falló, eliminar "COT" y volver a intentar
    if (isNaN(date.getTime())) {
      const cleanedValue = value.replace('COT', '').trim();
      date = new Date(cleanedValue);
    }

    return isNaN(date.getTime()) ? 'Fecha inválida' : date;
  }
}