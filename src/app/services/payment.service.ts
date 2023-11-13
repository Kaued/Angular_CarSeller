import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { FormPayment } from '../interfaces/form-payment';
import { PaymentValues } from '../interfaces/payment-values';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = `${environment.baseApiUrl}/api`;

  constructor(private http: HttpClient) { }

  createPayment(formPayment: FormPayment): Observable<FormPayment> {
    return this.http.post<FormPayment>(`${this.apiUrl}/paymentMethod`, formPayment);
  }

  getAllPayment(filter: string = ""): Observable<PaymentValues[]> {

    if (filter !== "") {
      return this.http.get<PaymentValues[]>(`${this.apiUrl}/paymentMethod?filter=name:like:%${filter}%`);
    }
    return this.http.get<PaymentValues[]>(`${this.apiUrl}/paymentMethod`);
  }

  getPayment(id: number): Observable<PaymentValues[]> {

    return this.http.get<PaymentValues[]>(`${this.apiUrl}/paymentMethod/${id}`);
  }

  updatePayment(formPayment: FormPayment): Observable<FormPayment> {
    return this.http.put<FormPayment>(`${this.apiUrl}/paymentMethod/${formPayment.id}`, formPayment);
  }

  removePayment(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/paymentMethod/${id}`);
  }
}
