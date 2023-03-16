import { Component, OnInit } from '@angular/core';
import { BorrowerInformation, LendList } from 'src/app/class/lend-tracker/lend-list';
import { LendListService } from 'src/app/services/lend-tracker/lend-list.service';
import { LendListComponent } from '../lend-list/lend-list.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


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
    private toastService: HotToastService
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
    this.toastService.loading('Adding, Please wait', {
      id: 'adding'
    })
    this.lendListService.addLendList(this.lendList).pipe(
      tap({
        error: (error:HttpErrorResponse|Error) => {
          this.toastService.close('adding');
          this.toastService.error('Error occurred : ' + error.name);
        }
      })
    ).subscribe((data: any) => {
      this.toastService.close('adding');
      this.lendList = new LendList();
      this.modalService.dismissAll();
      this.ngOnInit();
      this.toastService.success('Added');
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
