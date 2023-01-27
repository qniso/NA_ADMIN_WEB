import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/shared/models/company.model';
import { CompanyService } from 'src/app/shared/services/company.service';

@Component({
  selector: 'app-company-profile-edit',
  templateUrl: './company-profile-edit.component.html',
  styleUrls: ['./company-profile-edit.component.scss'],
})
export class CompanyProfileEditComponent implements OnInit {
  cardName!: string;
  editModalKey!: string | undefined;

  companyData: Company = this.companyService.data;

  companyNameGroup!: FormGroup;
  companyContactGroup!: FormGroup;
  companyIdentificationDetailsGruop!: FormGroup;
  companyLicenceInfoGroup!: FormGroup;

  constructor(
    private companyService: CompanyService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.companyService.editKey$.subscribe((res) => (this.editModalKey = res));
    this.initializeForm();
    this.checkCardName();
  }

  initializeForm(): void {
    switch (this.editModalKey) {
      case 'companyName':
        if (this.companyData.ukrName && this.companyData.engName) {
          this.companyNameGroup = this.fb.group({
            uaFullName: [
              this.companyData.ukrName.full_name,
              Validators.required,
            ],
            uaShortName: [
              this.companyData.ukrName.short_name,
              Validators.required,
            ],
            engFullName: [
              this.companyData.engName.full_name,
              Validators.required,
            ],
            engShortName: [
              this.companyData.engName.short_name,
              Validators.required,
            ],
          });
        } else {
          this.companyNameGroup = this.fb.group({
            uaFullName: ['', [Validators.required]],
            uaShortName: ['', [Validators.required]],
            engFullName: ['', [Validators.required]],
            engShortName: ['', [Validators.required]],
          });
        }
        break;
      case 'companyContact':
        if (
          this.companyData.address &&
          this.companyData.postalAddress &&
          this.companyData.communication &&
          this.companyData.bankingDetails
        ) {
          console.log(true);

          this.companyContactGroup = this.fb.group({
            address: [this.companyData.address, [Validators.required]],
            postalAddress: [
              this.companyData.postalAddress,
              [Validators.required],
            ],
            phoneNumber: ['', [Validators.required]],
            email: [
              this.companyData.communication.email,
              [Validators.required, Validators.email],
            ],
            iban: [this.companyData.bankingDetails.iban, [Validators.required]],
            remittanceBank: [
              this.companyData.bankingDetails.remittance_bank,
              [Validators.required],
            ],
          });
        } else {
          this.companyContactGroup = this.fb.group({
            address: ['', Validators.required],
            postalAddress: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            iban: ['', Validators.required],
            remittanceBank: ['', Validators.required],
          });
        }
        break;
      case 'companyIdentificationDetails':
        if (this.companyData.identificationDetails) {
          this.companyIdentificationDetailsGruop = this.fb.group({
            edrpou: [
              this.companyData.identificationDetails.edrpou,
              Validators.required,
            ],
            registrationCertificate: [
              this.companyData.identificationDetails.registration_certificate,
              Validators.required,
            ],
            ipn: [
              this.companyData.identificationDetails.ipn,
              Validators.required,
            ],
            accountingTaxInfo: [
              this.companyData.identificationDetails.accounting_tax_info,
              Validators.required,
            ],
            taxForm: [
              this.companyData.identificationDetails.tax_form,
              Validators.required,
            ],
          });
        } else {
          this.companyIdentificationDetailsGruop = this.fb.group({
            edrpou: ['', Validators.required],
            registrationCertificate: ['', Validators.required],
            ipn: ['', Validators.required],
            accountingTaxInfo: ['', Validators.required],
            taxForm: ['', Validators.required],
          });
        }
        break;
      case 'companyLicenceInfo':
        if (this.companyData.licenceInfo) {
          this.companyLicenceInfoGroup = this.fb.group({
            licenceInfo: [this.companyData.licenceInfo, [Validators.required]],
          });
        } else {
          this.companyLicenceInfoGroup = this.fb.group({
            licenceInfo: ['', [Validators.required]],
          });
        }
        break;
      default:
        break;
    }
  }

  checkCardName(): void {
    switch (this.editModalKey) {
      case 'companyName':
        this.cardName = 'Назва підприємства';
        break;
      case 'companyContact':
        this.cardName = 'Контактні дані';
        break;
      case 'companyIdentificationDetails':
        this.cardName = 'Ідентифікаційні реквізити підприємства';
        break;
      case 'companyLicenceInfo':
        this.cardName = 'Відомості про отриману ліцензію';
        break;
      default:
        break;
    }
  }

  submit(): void {
    switch (this.editModalKey) {
      case 'companyName':
        const companyNameBody = {
          ukr_name: {
            full_name: this.companyNameGroup.controls['uaFullName'].value,
            short_name: this.companyNameGroup.controls['uaShortName'].value,
          },
          eng_name: {
            full_name: this.companyNameGroup.controls['engFullName'].value,
            short_name: this.companyNameGroup.controls['engShortName'].value,
          },
        };
        this.companyService.editCompanyName(companyNameBody).subscribe();
        break;
      case 'companyContact':
        const companyContactBody = {
          address: this.companyContactGroup.controls['address'].value,
          postal_address:
            this.companyContactGroup.controls['postalAddress'].value,
          communication: {
            phone_number: [
              this.companyContactGroup.controls['phoneNumber'].value,
            ],
            email: this.companyContactGroup.controls['email'].value,
          },
          banking_details: {
            iban: this.companyContactGroup.controls['iban'].value,
            remittance_bank:
              this.companyContactGroup.controls['remittanceBank'].value,
          },
        };
        this.companyService.editGlobalInfo(companyContactBody).subscribe();
        break;
      case 'companyIdentificationDetails':
        const companyIdentificationDetailsBody = {
          identification_details: {
            edrpou:
              this.companyIdentificationDetailsGruop.controls['edrpou'].value,
            registration_certificate:
              this.companyIdentificationDetailsGruop.controls[
                'registrationCertificate'
              ].value,
            ipn: this.companyIdentificationDetailsGruop.controls['ipn'].value,
            accounting_tax_info:
              this.companyIdentificationDetailsGruop.controls[
                'accountingTaxInfo'
              ].value,
            tax_form:
              this.companyIdentificationDetailsGruop.controls['taxForm'].value,
          },
        };
        this.companyService
          .editIdentificationDetails(companyIdentificationDetailsBody)
          .subscribe();
        break;
      default:
        break;
    }
  }
}
