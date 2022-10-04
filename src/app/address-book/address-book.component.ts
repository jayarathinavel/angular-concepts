import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressBook, AddressDetails, ContactDetails } from '../class/addresss-book/address-book';
import { AddressBookService } from '../services/address-book/address-book.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class AddressBookComponent implements OnInit {

  addressBookList: AddressBook[];
  addressBook: AddressBook = new AddressBook();
  homeAddress: AddressDetails = new AddressDetails();
  workAddress: AddressDetails = new AddressDetails();
  mobileNumber: ContactDetails = new ContactDetails();
  alternateMobileNumber: ContactDetails = new ContactDetails();
  email: ContactDetails = new ContactDetails();

  constructor(private addressBookService: AddressBookService,
    private router: Router,
    modalConfig: NgbModalConfig,
    private modalService: NgbModal) {
      modalConfig.backdrop = 'static';
      modalConfig.keyboard = false;
    }

  ngOnInit(): void {
    this.getAddressBookList();
  }

  private getAddressBookList(){
    this.addressBookService.getAddressBookList().subscribe(data => {
      this.addressBookList = data;
    });
  }

  onSubmit(){
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
    
    console.log(this.addressBook);
    this.addAddressBook();
  }

  addAddressBook(){
    this.addressBookService.addAddressBook(this.addressBook).subscribe(data =>{
      this.goToAddressBookList();
    })
  }

  goToAddressBookList(){
    this.router.navigate(['/address-book']);
    window.location.reload(); //The above routing is not working within the same component, so have to refresh.
  }

  openAddAddressModal(content: any) {
    this.modalService.open(content);
  }

}
