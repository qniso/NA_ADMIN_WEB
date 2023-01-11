import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrentCarProfile } from 'src/app/shared/models/transport.model';
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
  }

  initializeForm(): void {
    switch (this.editModalKey) {
      case 'usingReasonInfo':
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
        break;
      case 'generalInfo':
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
    }
  }
}
