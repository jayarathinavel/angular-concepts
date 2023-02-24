import { Component, OnInit } from '@angular/core';
import { AddressBook, AddressDetails, ContactDetails } from '../class/address-book/address-book';
import { AddressBookService } from '../services/address-book/address-book.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class AddressBookComponent implements OnInit {

  addressBookList: AddressBook[];
  addressBookById: AddressBook;
  addressBook: AddressBook = new AddressBook();
  homeAddress: AddressDetails = new AddressDetails();
  workAddress: AddressDetails = new AddressDetails();
  mobileNumber: ContactDetails = new ContactDetails();
  alternateMobileNumber: ContactDetails = new ContactDetails();
  email: ContactDetails = new ContactDetails();
  formType: string;

  constructor(
    private addressBookService: AddressBookService,
    modalConfig: NgbModalConfig,
    private modalService: NgbModal,
    private toastService: HotToastService
    ) {
      modalConfig.backdrop = 'static';
      modalConfig.keyboard = false;
    }

  ngOnInit(): void {
    this.getAddressBookList();
  }

  private getAddressBookList(){
    this.toastService.loading('Loading, Please wait', {
      id: 'loading'
    })
    this.addressBookService.getAddressBookList().pipe(
      tap({
        error: (error: HttpErrorResponse|Error) => {
          this.toastService.error('Error occurred : ' + error.name);
          this.toastService.close('loading');
        } 
      })
    ).subscribe(data => {
      this.addressBookList = data;
      this.toastService.close('loading');
    });
  }

  onSubmit(){
    if(this.formType == 'add'){
      this.addressBook.addressDetails.push(this.homeAddress);
      this.addressBook.addressDetails.push(this.workAddress);
      this.addressBook.contactDetails.push(this.mobileNumber);
      this.addressBook.contactDetails.push(this.alternateMobileNumber);
      this.addressBook.contactDetails.push(this.email);
      {
        this.homeAddress.label = "Home Address";
        this.workAddress.label = "Work Address";
      }
      {
        this.mobileNumber.type = "Mobile Number";
        this.mobileNumber.isMainContact = true;
        this.mobileNumber.label = "Personal";
        this.alternateMobileNumber.type = "Mobile Number";
        this.alternateMobileNumber.label = "Alternate";
        this.alternateMobileNumber.isMainContact = false;
        this.email.type = "E-mail";
        this.email.isMainContact = false;
      }
      this.addAddressBook();
    }
    else if(this.formType == 'update'){
      this.updateAddressBook();
    }    
  }

  addAddressBook(){
    this.toastService.loading('Adding, Please wait', {
      id: 'adding'
    })
    this.addressBookService.addAddressBook(this.addressBook).pipe(
      tap({
        error: (error:HttpErrorResponse|Error) => {
          this.toastService.close('adding');
          this.toastService.error('Error occurred : ' + error.name);
        }
      })
    ).subscribe(data =>{
      this.toastService.close('adding');
      this.modalService.dismissAll();
      this.ngOnInit();
      this.toastService.success('Added');
    })
  }

  openAddAddressModal(addressBook: AddressBook, content: any, type: string) {
    if(type == 'update'){
      this.formType = 'update';
      this.addressBook = addressBook;
      this.homeAddress = addressBook.addressDetails[0];
      this.workAddress = addressBook.addressDetails[1];
      this.mobileNumber = addressBook.contactDetails[0];
      this.alternateMobileNumber = addressBook.contactDetails[1];
      this.email = addressBook.contactDetails[2];
    }
    else if(type == 'add'){
      this.formType = 'add';
      this.addressBook = new AddressBook();
      this.homeAddress = new AddressDetails();
      this.workAddress = new AddressDetails();
      this.mobileNumber = new ContactDetails();
      this.alternateMobileNumber = new ContactDetails();
      this.email = new ContactDetails();
    }
    this.modalService.open(content);
  }

  deleteAddressBookConfirmation(addressBook: any, deleteModal: any){
    this.modalService.open(deleteModal).result.then((result) =>{
      this.deleteAddressBook(addressBook);
    })
  }

  deleteAddressBook(addressBookToDelete:any){
    this.toastService.loading('Deleting, Please wait', {
      id: 'deleting'
    })
    this.addressBookService.deleteAddressBook(addressBookToDelete).pipe(
      tap({
        error: (error:HttpErrorResponse|Error) => {
          this.toastService.close('deleting');
          this.toastService.error('Error occurred : ' + error.name);
        }
      })
    ).subscribe((data: any) =>{
      this.toastService.close('deleting');
      this.ngOnInit();
      this.toastService.success('Deleted');
    })
  }

  openAddressBookByIdModal(addressBook: AddressBook, openAddressBookByIdModal: any){
    this.addressBookService.getAddressBookById(addressBook.addressBookId).subscribe(data=>{
      this.addressBookById = data;
      this.modalService.open(openAddressBookByIdModal);
    })
  }

  updateAddressBook(){
    this.toastService.loading('Updating, Please wait', {
      id: 'updating'
    })
    this.addressBookService.updateAddressBook(this.addressBook).pipe(
      tap({
        error: (error:HttpErrorResponse|Error) => {
          this.toastService.close('updating');
          this.toastService.error('Error occurred : ' + error.name);
        }
      })
    ).subscribe(data =>{
      this.toastService.close('updating');
      this.modalService.dismissAll();
      this.ngOnInit();
      this.toastService.success('Updated');
    })
  }

  onAddEditModelCrossClick(d:any){
    d('Cross click');
    this.ngOnInit();
  }
}
