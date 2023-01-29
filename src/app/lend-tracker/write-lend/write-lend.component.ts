import { Component, OnInit } from '@angular/core';
import { BorrowerInformation, LendList } from 'src/app/class/lend-tracker/lend-list';
import { LendListService } from 'src/app/services/lend-tracker/lend-list.service';
import { LendListComponent } from '../lend-list/lend-list.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-write-lend',
  templateUrl: './write-lend.component.html',
  styleUrls: ['./write-lend.component.css'],
  providers: [NgbModalConfig, NgbModal]

})
export class WriteLendComponent implements OnInit {

  borrowerList: BorrowerInformation[];
  lendList: LendList = new LendList();
  borrowerInformation: BorrowerInformation = new BorrowerInformation();
  showBorrowerForm: boolean;
  borrowerEditMode: boolean;

  constructor(
    private lendListService : LendListService,
    private lendListComponent: LendListComponent,
    modalConfig: NgbModalConfig,
    private modalService: NgbModal,
  ) {
      modalConfig.backdrop = 'static';
      modalConfig.keyboard = false;
    }

  ngOnInit(): void {
    this.lendListComponent.ngOnInit();
    this.getBorrowerList();
  }
  
  onAddLendSubmit(){
    this.addLendList();
  }

  onAddBorrowerSubmit(){
    this.addBorrower();
  }

  addLendList(){
    this.lendListService.addLendList(this.lendList).subscribe((data: any) => {
      this.lendList = new LendList();
      this.modalService.dismissAll();
      this.ngOnInit();
    })
  }

  private getBorrowerList(){
    this.lendListService.getBorrowerInformationList().subscribe((data: BorrowerInformation[]) =>{
      this.borrowerList = data;
    })
  }

  openAddLendModal(addLendModal: any) {
    this.modalService.open(addLendModal);
  }

  onAddBorrowerClick(){
    this.showBorrowerForm = true;
    this.borrowerEditMode = false;
    this.borrowerInformation = new BorrowerInformation();
    this.ngOnInit();
  }
  
  onEditBorrowerClick(borrower: any){
    this.showBorrowerForm = true;
    this.borrowerEditMode = true;
    this.borrowerInformation = borrower;
    this.ngOnInit();
  }

  addBorrower(){
    this.lendListService.addBorrowerInformation(this.borrowerInformation).subscribe((data: any) => {
      this.onAddBorrowerCancelOrDone();
    })
  }
  
  deleteBorrower(borrowerId: any){
    this.lendListService.deleteBorrower(borrowerId).subscribe((data: any) => {
      this.onAddBorrowerCancelOrDone();
    })
  }

  onAddBorrowerCancelOrDone(){
    this.borrowerInformation = new BorrowerInformation();
    this.showBorrowerForm = false;
    this.ngOnInit();
  }

}
