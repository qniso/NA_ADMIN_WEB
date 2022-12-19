import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewCompany } from 'src/app/shared/models/company.model';
import { EditCompanyService } from 'src/app/shared/services/edit-company.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  editCompany!:FormGroup

  constructor(
    private editNewCompany: EditCompanyService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  private initializeForm(): void{
    this.editCompany = this.fb.group({
      companyFullNameUa: ["", [Validators.required]],
      companyNameUa: ["", [Validators.required]],
      companyFullNameEng: ["", [Validators.required]],
      companyNameEng: ["", [Validators.required]],
      phoneNum: ["", [Validators.required]],
      email:["", [Validators.required]],
      generalAddress: ["", [Validators.required]],
      postAddress: ["", [Validators.required]],
      edrpou: ["", [Validators.required]],
      registrationCertificate: ["", [Validators.required]],
      ipn: ["", [Validators.required]],
      accountingTaxInfo:["", [Validators.required]],
      taxForm:["", [Validators.required]],
      licenceInfo: ["", [Validators.required]],
    })
  }

  submit(){
    let companyFullNameUa = this.editCompany.controls['companyFullNameUa'].value;
    let companyNameUa = this.editCompany.controls['companyNameUa'].value;
    let companyFullNameEng = this.editCompany.controls['companyFullNameEng'].value;
    let companyNameEng = this.editCompany.controls['companyNameEng'].value;
    let phoneNum = this.editCompany.controls['phoneNum'].value;
    let email = this.editCompany.controls['email'].value;
    let generalAddress = this.editCompany.controls['generalAddress'].value;
    let postAddress = this.editCompany.controls['postAddress'].value;
    let edrpou = this.editCompany.controls['edrpou'].value;
    let registrationCertificate = this.editCompany.controls['registrationCertificate'].value;
    let ipn = this.editCompany.controls['ipn'].value;
    let accountingTaxInfo = this.editCompany.controls['accountingTaxInfo'].value;
    let taxForm = this.editCompany.controls['taxForm'].value;
    let licenceInfo = this.editCompany.controls['licenceInfo'].value;

    let header: NewCompany = {
      "ukr_name":{
        "full_name": companyFullNameUa,
        "short_name": companyNameUa
      },
      "eng_name":{
        "full_name": companyFullNameEng,
        "short_name": companyNameEng
      },
      "address": generalAddress,
      "postal_address": postAddress,
      "communication":{
      "phone_number": [phoneNum],
      "email": email
      },
      "banking_details":{
        "remittance_bank": "PrivatBank",
        "iban": "121312312331"
      },
      "identification_details":{
        "edrpou":edrpou,
        "registration_certificate": registrationCertificate,
        "ipn": ipn,
        "accounting_tax_info": accountingTaxInfo,
        "tax_form": taxForm,
        "licence_info" : licenceInfo
      }
    }
    this.editNewCompany.test(header).subscribe(res => {
      console.log(res);
      
    })
    // this.editCompany.value
  }

}
