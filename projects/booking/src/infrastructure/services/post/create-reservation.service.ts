import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IPaymentData } from "../../../domain/model/payment.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CreateReservationService {
  private http = inject(HttpClient);

  execute(payment: IPaymentData): Observable<IPaymentData> {
    return this.http.post<IPaymentData>("http://localhost:8080/api/reservation", payment);
  }
}
