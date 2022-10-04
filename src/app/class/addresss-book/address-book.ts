export class AddressBook {
    addressBookId : number;
    firstName: string;
    lastName: string;
    nickName: string;
    contactDetails: ContactDetails[] = new Array();
    addressDetails: AddressDetails[] = new Array();
    organization: string;
    dateOfBirth: Date;
    relationship: string;
    weblink: string;
    label: string;
    notes: string;
}

export class AddressDetails{
    addressBookId: number;
    lineOne: string;
    lineTwo: string;
    city: string;
    zipcode: string;
    label: string;
}

export class ContactDetails{
    addressBookId: number;
    value: string;
    type: string;
    isMainContact: boolean;
    label: string;
}