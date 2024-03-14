import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  private readonly backendHost: string = 'http://localhost:5106/api';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any> {
    return this.http.get(`${this.backendHost}/Customers`);
  }

  getCustomer(customerId: number): Observable<any> {
    return this.http.get(`${this.backendHost}/Customers/${customerId}`);
  }

  signUp(requestBody: any): Observable<any> {
    return this.http.post(`${this.backendHost}/Customers`, requestBody);
  }

  editCustomer(requestBody: any, customerId: number): Observable<any> {
    return this.http.put(
      `${this.backendHost}/Customers/${customerId}`,
      requestBody
    );
  }

  deleteCustomer(customerId: number): Observable<any> {
    return this.http.delete(`${this.backendHost}/Customers/${customerId}`);
  }

  getAccunts(): Observable<any> {
    return this.http.get(`${this.backendHost}/Accounts`);
  }

  getAccounts(accountId: number): Observable<any> {
    return this.http.get(`${this.backendHost}/Accounts/${accountId}`);
  }

  addAccounts(requestBody: any): Observable<any> {
    return this.http.post(`${this.backendHost}/Accounts`, requestBody);
  }

  getBeneficiaries(): Observable<any> {
    return this.http.get(`${this.backendHost}/Beneficiaries`);
  }

  deleteBeneficiaries(beneficiaryID: number): Observable<any> {
    return this.http.delete(
      `${this.backendHost}/Beneficiaries/${beneficiaryID}`
    );
  }

  addNewBeneficiary(requestBody: any): Observable<any> {
    return this.http.post(`${this.backendHost}/Beneficiaries`, requestBody);
  }
}
