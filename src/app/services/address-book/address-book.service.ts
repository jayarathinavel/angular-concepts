import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressBook } from '../../class/addresss-book/address-book';

@Injectable({
  providedIn: 'root'
})
export class AddressBookService {
  private baseURL = "http://localhost:8080/address-book";
  constructor(private httpClient: HttpClient) { }

  getAddressBookList() : Observable<AddressBook[]>{
    return this.httpClient.get<AddressBook[]>(`${this.baseURL}`+'/find-all');
  }

  addAddressBook(addressBook: AddressBook): Observable<any>{
    return this.httpClient.post(`${this.baseURL}`+'/save', addressBook);
  }
}
