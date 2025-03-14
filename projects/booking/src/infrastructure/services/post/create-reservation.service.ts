import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IPaymentData } from "../../../domain/model/payment.model";
import { Observable } from "rxjs";
import { environment } from "shared";
import { IReservationData } from "../../../../../admin/src/domain/model/reservation.model";

@Injectable({
  providedIn: 'root',
})
export class CreateReservationService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/reservation';

  execute(payment: IReservationData): Observable<IReservationData> {
    return this.http.post<IReservationData>(this.apiUrl, payment);
  }
}
