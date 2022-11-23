import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressBook } from '../../class/address-book/address-book';

@Injectable({
  providedIn: 'root'
})
export class AddressBookService {
  private baseURL = "http://localhost:8080/public/api/address-book";
  constructor(private httpClient: HttpClient) { }

  getAddressBookList() : Observable<AddressBook[]>{
    return this.httpClient.get<AddressBook[]>(`${this.baseURL}`+'/find-all');
  }

  addAddressBook(addressBook: AddressBook): Observable<any>{
    return this.httpClient.post(`${this.baseURL}`+'/save', addressBook);
  }

  deleteAddressBook(addressBook: AddressBook): Observable<any>{
    return this.httpClient.delete(`${this.baseURL}/delete/${addressBook.addressBookId}`, {responseType: "text"});
  }

  getAddressBookById(addressBookId: any) : Observable<any>{
    let params = new HttpParams().set('id', addressBookId);
    return this.httpClient.get(`${this.baseURL}`+'/find-by-id', {params: params});
  }

  updateAddressBook(addressBook: AddressBook) {
    this.deleteAddressBook(addressBook);
    return this.addAddressBook(addressBook);
  }
}
