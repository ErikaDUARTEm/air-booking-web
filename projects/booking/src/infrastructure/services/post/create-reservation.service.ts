import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "shared";
import { IReservationRequest } from "../../../domain/model/reservation-request.model";


@Injectable({
  providedIn: 'root',
})
export class CreateReservationService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/reservation';

  execute(payment:IReservationRequest): Observable<IReservationRequest> {
    return this.http.post<IReservationRequest>(this.apiUrl, payment);
  }
}
