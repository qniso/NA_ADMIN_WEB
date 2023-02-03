import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CurrentCarProfile,
  EnvironmentStandart,
  Fuels,
  TechnicalCertificateDopInfo,
} from 'src/app/shared/models/transport.model';
import { TransportService } from 'src/app/shared/services/transport.service';

@Component({
  selector: 'app-car-profile-edit',
  templateUrl: './car-profile-edit.component.html',
  styleUrls: ['./car-profile-edit.component.scss'],
})
export class CarProfileEditComponent implements OnInit {
  editModalKey!: string | undefined;
  cardName!: string;
  data: CurrentCarProfile = this.transportService.data;

  generalInfo!: FormGroup;
  usingReason!: FormGroup;
  techicalCertificateDopInfo!: FormGroup;
  technicalCertificate!: FormGroup;

  fuels!: Fuels[];
  envStandarts!: EnvironmentStandart[];

  constructor(
    private fb: FormBuilder,
    private transportService: TransportService
  ) {}

  ngOnInit(): void {
    this.transportService.editKey$.subscribe(
      (res) => (this.editModalKey = res)
    );
    this.checkCardName();
    this.initializeForm();
    if(this.editModalKey == 'technicalCertificateDopInfo')
      this.getCarSettingsData()
    
  }

  initializeForm(): void {
    switch (this.editModalKey) {
      case 'usingReasonInfo':
        if (this.data.using_reason_info) {
          this.usingReason = this.fb.group({
            numAndNameContract: [
              this.data.using_reason_info.num_and_name_contract,
              [Validators.required],
            ],
            dateStart: [
              this.convertToDate(this.data.using_reason_info.date_start),
              [Validators.required],
            ],
            isContractFixedTerm: [
              this.data.using_reason_info.is_contract_fixed_term,
              [Validators.required],
            ],
            dateEnd: [
              this.convertToDate(this.data.using_reason_info.date_end),
              [Validators.required],
            ],
            dateNextStart: [
              this.convertToDate(this.data.using_reason_info.date_next_start),
              [Validators.required],
            ],
          });
        } else {
          this.usingReason = this.fb.group({
            numAndNameContract: ['', [Validators.required]],
            dateStart: ['', [Validators.required]],
            isContractFixedTerm: ['', [Validators.required]],
            dateEnd: ['', [Validators.required]],
            dateNextStart: ['', [Validators.required]],
          });
        }

        break;
      case 'generalInfo':
        if (this.data.general_info) {
          this.generalInfo = this.fb.group({
            fuelTankVolume: [
              this.data.general_info.fuel_tank_volume,
              [Validators.required],
            ],
            height: [this.data.general_info.height, [Validators.required]],
            mileage: [this.data.general_info.mileage, [Validators.required]],
            length: [this.data.general_info.length, [Validators.required]],
            width: [this.data.general_info.width, [Validators.required]],
          });
        } else {
          this.generalInfo = this.fb.group({
            fuelTankVolume: ['', [Validators.required]],
            height: ['', [Validators.required]],
            mileage: ['', [Validators.required]],
            length: ['', [Validators.required]],
            width: ['', [Validators.required]],
          });
        }

        break;
      case 'technicalCertificateDopInfo':
        if (
          this.data.technical_certificate.technical_certificate_dop_info !==
          null
        ) {
          this.techicalCertificateDopInfo = this.fb.group({
            brand: [
              this.data.technical_certificate.technical_certificate_dop_info
                .brand,
              Validators.required,
            ],
            stateNumber: [
              this.data.technical_certificate.technical_certificate_dop_info
                .state_number,
              Validators.required,
            ],
            VINCode: [
              this.data.technical_certificate.technical_certificate_dop_info
                .VIN_code,
              Validators.required,
            ],
            colour: [
              this.data.technical_certificate.technical_certificate_dop_info
                .colour,
              Validators.required,
            ],
            dateIssue: [
              this.data.technical_certificate.technical_certificate_dop_info
                .date_issue,
              Validators.required,
            ],
            seats: [
              this.data.technical_certificate.technical_certificate_dop_info
                .seats,
              Validators.required,
            ],
            fullWeight: [
              this.data.technical_certificate.technical_certificate_dop_info
                .full_weight,
              Validators.required,
            ],
            emptyWeight: [
              this.data.technical_certificate.technical_certificate_dop_info
                .empty_weight,
              Validators.required,
            ],
            category: [
              this.data.technical_certificate.technical_certificate_dop_info
                .category,
              Validators.required,
            ],
            fuel: [
              this.data.technical_certificate.technical_certificate_dop_info
                .fuel,
              Validators.required,
            ],
            bodyType: [
              this.data.technical_certificate.technical_certificate_dop_info
                .body_type,
              Validators.required,
            ],
            engineVolume: [
              this.data.technical_certificate.technical_certificate_dop_info
                .engine_volume,
              Validators.required,
            ],
            enginePower: [
              this.data.technical_certificate.technical_certificate_dop_info
                .engine_power,
              Validators.required,
            ],
            environmentalStandard: [
              this.data.technical_certificate.technical_certificate_dop_info
                .environmental_standard,
              Validators.required,
            ],
          });
        } else {
          this.techicalCertificateDopInfo = this.fb.group({
            brand: ['', Validators.required],
            stateNumber: ['', Validators.required],
            VINCode: ['', Validators.required],
            colour: ['', Validators.required],
            dateIssue: ['', Validators.required],
            seats: ['', Validators.required],
            fullWeight: ['', Validators.required],
            emptyWeight: ['', Validators.required],
            category: ['', Validators.required],
            fuel: ['', Validators.required],
            bodyType: ['', Validators.required],
            engineVolume: ['', Validators.required],
            enginePower: ['', Validators.required],
            environmentalStandard: ['', Validators.required],
          });
        }

        break;
      case 'technicalCertificate':
        if (this.data.technical_certificate) {
          this.technicalCertificate = this.fb.group({
            nomenclatureName: [
              this.data.nomenclature_name,
              Validators.required,
            ],
            numAndSeries: [
              this.data.technical_certificate.num_and_series,
              Validators.required,
            ],
            issuedBy: [
              this.data.technical_certificate.issued_by,
              Validators.required,
            ],
            dateEnd: [
              this.data.technical_certificate.date_end,
              Validators.required,
            ],
            dateIssue: [
              this.data.technical_certificate.date_issue,
              Validators.required,
            ],
          });
        } else {
          this.technicalCertificate = this.fb.group({
            nomenclatureName: ['', Validators.required],
            numAndSeries: ['', Validators.required],
            issuedBy: ['', Validators.required],
            dateEnd: ['', Validators.required],
            dateIssue: ['', Validators.required],
          });
        }
        break;
      default:
        break;
    }
  }

  convertToDate(value: any) {
    const date = value;
    let dd: any = date.split('.')[0];
    let mm: any = date.split('.')[1];
    let yy: any = date.split('.')[2];
    return new Date(yy, mm - 1, dd);
  }

  formatDate(value: any) {
    const date = new Date(value);

    let dd: any = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm: any = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy: any = date.getFullYear();

    return dd + '.' + mm + '.' + yy;
  }

  getCarSettingsData(): void {
    this.transportService
      .getFuel()
      .subscribe((res) => (this.fuels = res.fuels));
    this.transportService
      .getEnvironmentStandart()
      .subscribe((res) => (this.envStandarts = res.standards));
  }

  submit(): void {
    switch (this.editModalKey) {
      case 'usingReasonInfo':
        const _dateStart = this.usingReason.controls['dateStart'].value;
        const _dateEnd = this.usingReason.controls['dateEnd'].value;
        const _dateNextStart = this.usingReason.controls['dateNextStart'].value;

        let dateStart = this.formatDate(_dateStart);
        let dateEnd = this.formatDate(_dateEnd);
        let dateNextSrart = this.formatDate(_dateNextStart);

        const usingReasonInfoBody = {
          id: this.transportService.currentCarId,
          using_reason_info: {
            num_and_name_contract:
              this.usingReason.controls['numAndNameContract'].value,
            date_start: dateStart,
            is_contract_fixed_term: Boolean(
              this.usingReason.controls['isContractFixedTerm'].value
            ),
            date_end: dateEnd,
            date_next_start: dateNextSrart,
          },
        };
        console.log(usingReasonInfoBody);

        this.transportService
          .editUsingReasonInfo(usingReasonInfoBody)
          .subscribe();
        break;
      case 'generalInfo':
        const generalInfoBody = {
          id: this.transportService.currentCarId,
          general_info: {
            fuel_tank_volume: Number(
              this.generalInfo.controls['fuelTankVolume'].value
            ),
            height: Number(this.generalInfo.controls['height'].value),
            length: Number(this.generalInfo.controls['length'].value),
            mileage: Number(this.generalInfo.controls['mileage'].value),
            width: Number(this.generalInfo.controls['width'].value),
          },
        };
        console.log(generalInfoBody);
        this.transportService.editGeneralInfo(generalInfoBody).subscribe();
        break;
      case 'technicalCertificateDopInfo':
        const _dateIssue =
          this.techicalCertificateDopInfo.controls['dateIssue'].value;
        let dateIssue = this.formatDate(_dateIssue);
        const techicalCertificateDopInfo = {
          id: this.transportService.currentCarId,
          technical_certificate_dop_info: {
            brand: this.techicalCertificateDopInfo.controls['brand'].value,
            state_number:
              this.techicalCertificateDopInfo.controls['stateNumber'].value,
            colour: this.techicalCertificateDopInfo.controls['colour'].value,
            date_issue: dateIssue,
            seats: this.techicalCertificateDopInfo.controls['seats'].value,
            full_weight:
              this.techicalCertificateDopInfo.controls['fullWeight'].value,
            empty_weight:
              this.techicalCertificateDopInfo.controls['emptyWeight'].value,
            category:
              this.techicalCertificateDopInfo.controls['category'].value,
            fuel: this.techicalCertificateDopInfo.controls['fuel'].value,
            body_type:
              this.techicalCertificateDopInfo.controls['bodyType'].value,
            engine_volume:
              this.techicalCertificateDopInfo.controls['engineVolume'].value,
            engine_power:
              this.techicalCertificateDopInfo.controls['enginePower'].value,
            environmental_standard:
              this.techicalCertificateDopInfo.controls['environmentalStandard']
                .value,
            vin_code: this.techicalCertificateDopInfo.controls['VINCode'].value,
          },
        };
        this.transportService
          .editTechnicalCertificateDopInfo(techicalCertificateDopInfo)
          .subscribe();
        break;
      case 'technicalCertificate':
        const _dateIssuetechnicalCertificate =
          this.technicalCertificate.controls['dateIssue'].value;
        let dateIssuetechnicalCertificate = this.formatDate(
          _dateIssuetechnicalCertificate
        );

        const _dateEndtechnicalCertificate =
          this.technicalCertificate.controls['dateEnd'].value;
        let dateEndtechnicalCertificate = this.formatDate(
          _dateEndtechnicalCertificate
        );
        const nomenclatureName = {
          id: this.transportService.currentCarId,
          nomenclature_name:
            this.technicalCertificate.controls['nomenclatureName'].value,
        };
        this.transportService
          .editNomenclatureName(nomenclatureName)
          .subscribe();
        const technicalCertificate = {
          id: this.transportService.currentCarId,
          technical_certificate: {
            num_and_series:
              this.technicalCertificate.controls['numAndSeries'].value,
            issued_by: this.technicalCertificate.controls['issuedBy'].value,
            date_end: dateEndtechnicalCertificate,
            date_issue: dateIssuetechnicalCertificate,
          },
        };
        this.transportService
          .editTechnicalCertificate(technicalCertificate)
          .subscribe();
        break;
      default:
        break;
    }
  }

  checkCardName(): void {
    switch (this.editModalKey) {
      case 'usingReasonInfo':
        this.cardName = 'Відомості техпаспорту';
        break;
      case 'generalInfo':
        this.cardName = 'Загальні відомості про транспортний засіб';
        break;
      case 'technicalCertificateDopInfo':
        this.cardName =
          'Відомості про транспортний засіб згідно з техпаспортом';
        break;
      case 'technicalCertificate':
        this.cardName = 'Відомості про транспортний засіб';
        break;
      default:
        break;
    }
  }
}
