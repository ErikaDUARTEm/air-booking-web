import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IPaymentData } from "../../../domain/model/payment.model";
import { Observable } from "rxjs";
import { environment } from "shared";

@Injectable({
  providedIn: 'root',
})
export class CreateReservationService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/reservation';

  execute(payment: IPaymentData): Observable<IPaymentData> {
    return this.http.post<IPaymentData>(this.apiUrl, payment);
  }
}
