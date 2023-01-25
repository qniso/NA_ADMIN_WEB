export interface Company {
  ukrName: UACompanyName;
  engName: EngCompanyName;
  address: string;
  postalAddress: string;
  communication: CompanyCommunication;
  bankingDetails: CompanyBanking;
  identificationDetails: CompanyIndentifikationDetails;
}

export interface UACompanyName {
  full_name: string;
  short_name: string;
}
export interface EngCompanyName {
  full_name: string;
  short_name: string;
}

export interface CompanyCommunication {
  phone_number: [string];
  email: string;
}

export interface CompanyBanking {
  remittance_bank: string;
  iban: string;
}

export interface CompanyIndentifikationDetails {
  edrpou: string;
  registration_certificate: string;
  ipn: string;
  accounting_tax_info: string;
  tax_form: string;
  licence_info: string;
}

export interface CompanyList {
  companies: [];
}
export interface UserId {
  userId: number;
}
