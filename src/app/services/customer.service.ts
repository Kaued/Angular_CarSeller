import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { FormCustomer } from '../interfaces/form-customer';
import { Observable } from 'rxjs';
import { CustomerValues } from '../interfaces/customer-values';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = `${environment.baseApiUrl}/api`;

  constructor(private http: HttpClient) { }

  createCustomer(formCustomer: FormCustomer): Observable<FormCustomer> {
    return this.http.post<FormCustomer>(`${this.apiUrl}/customer`, formCustomer);
  }

  getAllCustomer(filter: string = ""): Observable<CustomerValues[]> {

    if (filter !== "") {
      return this.http.get<CustomerValues[]>(`${this.apiUrl}/customer?filter=name:like:%${filter}%`);
    }
    return this.http.get<CustomerValues[]>(`${this.apiUrl}/customer`);
  }

  getCustomer(id: number): Observable<CustomerValues[]> {

    return this.http.get<CustomerValues[]>(`${this.apiUrl}/customer/${id}`);
  }

  updateCustomer(formCustomer: FormCustomer): Observable<FormCustomer> {
    return this.http.put<FormCustomer>(`${this.apiUrl}/customer/${formCustomer.id}`, formCustomer);
  }

  removeCustomer(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/customer/${id}`);
  }
}
