import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddressBook } from '../../class/address-book/address-book';

@Injectable({
  providedIn: 'root'
})
export class AddressBookService {
  private apiURL = environment.apiURL;
  private baseURL = this.apiURL + "/address-book";
  constructor(private httpClient: HttpClient) { }

  getAddressBookList() : Observable<AddressBook[]>{
    return this.httpClient.get<AddressBook[]>(`${this.baseURL}`+'/find-all');
  }

  addAddressBook(addressBook: AddressBook): Observable<any>{
    return this.httpClient.post(`${this.baseURL}`+'/save', addressBook);
  }
}
