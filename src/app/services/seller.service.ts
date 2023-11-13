import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { FormSeller } from '../interfaces/form-seller';
import { Observable } from 'rxjs';
import { SellerValues } from '../interfaces/seller-values';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private apiUrl = `${environment.baseApiUrl}/api`;

  constructor(private http:HttpClient) { }

  createSeller(formSeller:FormSeller): Observable<FormSeller>{
    return this.http.post<FormSeller>(`${this.apiUrl}/seller`, formSeller);
  }

  getAllSeller(filter:string = ""):Observable<SellerValues[]>{

    if(filter !== ""){
      return this.http.get<SellerValues[]>(`${this.apiUrl}/seller?filter=name:like:%${filter}%`);
    }
    return this.http.get<SellerValues[]>(`${this.apiUrl}/seller`);
  }

  getSeller(id: number): Observable<SellerValues[]> {

    return this.http.get<SellerValues[]>(`${this.apiUrl}/seller/${id}`);
  }

  updateSeller(formSeller: FormSeller): Observable<FormSeller> {
    return this.http.put<FormSeller>(`${this.apiUrl}/seller/${formSeller.id}`, formSeller);
  }

  removeSeller(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/seller/${id}`);
  }
}
