import { Observable } from "rxjs";

export class LendList {
    lendListId: number;
    userId: 0;
    borrowerId: number;
    itemName: string;
    itemDescription: string;
    lendDate: Date;
    dueDate: Date;
    returnDate: Date;
    createdDate: Date;
    statusId: number;
    category: string;
    timestamp: Observable<any>;
}

export class Status{
    statusId: number;
    status: string;
}

export class BorrowerInformation{
    borrowerId: number;
    borrowerName: string;
    phoneNumber: string;
    email: string;
}