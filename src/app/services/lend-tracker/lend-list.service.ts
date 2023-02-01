import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BorrowerInformation, LendList, Status } from 'src/app/class/lend-tracker/lend-list';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LendListService {
  private apiURL = environment.apiURL;
  private baseURL = this.apiURL + "/api/lend-tracker";

  constructor(private httpClient: HttpClient) { }

  getLendList() : Observable<LendList[]>{
    return this.httpClient.get<LendList[]>(`${this.baseURL}`+'/find-all-lists');
  }

  addLendList(lendList : LendList): Observable<any>{
    return this.httpClient.post(`${this.baseURL}`+'/add-lend', lendList);
  }

  updateLendList(lendList : LendList): Observable<any>{
    return this.httpClient.put(`${this.baseURL}`+'/update-lend', lendList);
  }

  deleteLend(lendId: number): Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("lendId", lendId);
    return this.httpClient.delete(`${this.baseURL}`+'/delete-lend', {params:queryParams})
  }

  getBorrowerInformationList(): Observable<BorrowerInformation[]>{
    return this.httpClient.get<BorrowerInformation[]>(`${this.baseURL}`+'/get-borrower');
  }

  getStatusList(): Observable<Status[]>{
    return this.httpClient.get<Status[]>(`${this.baseURL}`+'/get-status');
  }

  addBorrowerInformation(borrowerInformation: BorrowerInformation): Observable<any>{
    return this.httpClient.post(`${this.baseURL}`+'/add-borrower', borrowerInformation);
  }

  deleteBorrower(borrowerId:any): Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("borrowerId", borrowerId);
    return this.httpClient.delete(`${this.baseURL}`+'/delete-borrower', {params:queryParams})
  }
}
