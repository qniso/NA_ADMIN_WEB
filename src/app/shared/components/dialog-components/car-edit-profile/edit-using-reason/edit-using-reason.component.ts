import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrentCarProfile } from 'src/app/shared/models/transport.model';
import { TransportService } from 'src/app/shared/services/transport.service';

@Component({
  selector: 'edit-using-reason',
  templateUrl: './edit-using-reason.component.html',
  styleUrls: ['./edit-using-reason.component.scss'],
})
export class EditUsingReasonComponent implements OnInit {
  data: CurrentCarProfile = this.transportService.data;

  usingReason!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private transportService: TransportService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
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
    const _dateStart = this.usingReason.controls['dateStart'].value;
    const _dateEnd = this.usingReason.controls['dateEnd'].value;
    const _dateNextStart = this.usingReason.controls['dateNextStart'].value;

    let dateStart = this.formatDate(_dateStart);
    let dateEnd = this.formatDate(_dateEnd);
    let dateNextSrart = this.formatDate(_dateNextStart);

    const body = {
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
    console.log(body);

    this.transportService.editUsingReasonInfo(body).subscribe();
  }
}
