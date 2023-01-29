import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { BorrowerInformation, LendList, Status } from 'src/app/class/lend-tracker/lend-list';
import { LendListService } from 'src/app/services/lend-tracker/lend-list.service';

@Component({
  selector: 'app-lend-list',
  templateUrl: './lend-list.component.html',
  styleUrls: ['./lend-list.component.css']
})
export class LendListComponent implements OnInit {
  panelOpenState = false;
  lendList: LendList[];
  statusList: Status[];
  borrowerList: BorrowerInformation[];
  lend: LendList = new LendList();
  borrowerInformation: BorrowerInformation = new BorrowerInformation();
  statusId: number;
  showBorrowerForm: boolean;
  borrowerEditMode: boolean;
  deleteConfirmation: boolean;
  showDeleteConfirmation: boolean;

  constructor(private lendListService: LendListService,
    modalConfig: NgbModalConfig,
    private modalService: NgbModal,
  )
  {
    modalConfig.backdrop = 'static';
    modalConfig.keyboard = false;
  }

  ngOnInit(): void {
    this.getLendList();
    this.getStatusList();
    this.getBorrowerList();
  }

  private getLendList(){
    this.lendListService.getLendList().subscribe((data: LendList[]) => {
      this.lendList = data;
    });
  }

  private getStatusList(){
    this.lendListService.getStatusList().subscribe((data: Status[]) => {
      this.statusList = data;
    });
  }

  private getBorrowerList(){
    this.lendListService.getBorrowerInformationList().subscribe((data: BorrowerInformation[]) =>{
      this.borrowerList = data;
    })
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
  
  deleteBorrower(borrowerId: any){
    this.lendListService.deleteBorrower(borrowerId).subscribe((data: any) => {
      this.onAddBorrowerCancelOrDone();
    })
  }

  onAddBorrowerSubmit(){
    this.addBorrower();
  }

  addBorrower(){
    this.lendListService.addBorrowerInformation(this.borrowerInformation).subscribe((data: any) => {
      this.onAddBorrowerCancelOrDone();
    })
  }

  onAddBorrowerCancelOrDone(){
    this.borrowerInformation = new BorrowerInformation();
    this.showBorrowerForm = false;
    this.ngOnInit();
  }

  openUpdateLendModal(lend:any, updateModal:any){
    this.modalService.open(updateModal);
    this.lend = lend;
  }

  onUpdateLendSubmit(){
    this.updateLendList();
  }

  updateLendList(){
    this.lendListService.updateLendList(this.lend).subscribe((data: any) => {
      this.lend = new LendList();
      this.modalService.dismissAll();
      this.ngOnInit();
    })
  }

  onChangeStatusSubmit(){
    this.lend.statusId = this.statusId;
    this.updateLendList();
  }

  onDeleteButtonClick(){
    this.showDeleteConfirmation = true;
  }

  deleteLend(lend:any){
    this.lendListService.deleteLend(lend.lendListsId).subscribe((data: any) =>{
      this.ngOnInit();
      this.modalService.dismissAll();
    })
  }

  openViewLendModal(lendDetail:any, viewModal:any){
    this.modalService.open(viewModal);
    this.lend = lendDetail;
  }

  openActionsModal(lend: any, actionsModal: any){
    this.showDeleteConfirmation = false;
    this.modalService.open(actionsModal);
    this.lend = lend;
    this.statusId = this.lend.statusId;
  }

  textStyle(status: any) {
    let style;
    if (status == 0) {
      style = "";
    }
    else if (status == 1) {
      style = "fw-semibold";
    }
    else if (status == 2) {
      style = "text-decoration-line-through";
    }
    else if (status == 3) {
      style = "fw-semibold text-danger";
    }
    return style;
  }

}
