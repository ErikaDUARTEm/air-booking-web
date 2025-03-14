import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class RemoveFlightService {
 private http = inject(HttpClient);
 removeFlight(flightId: string){
  return this.http.delete<any>((environment.apiUrl+'/flight'), {
    body: { aggregateId: flightId }
  });

 }

}
