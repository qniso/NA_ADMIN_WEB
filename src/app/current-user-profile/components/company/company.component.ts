import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompanyProfileEditComponent } from 'src/app/shared/components/dialog-components/company-profile-edit/company-profile-edit.component';
import { Company } from 'src/app/shared/models/company.model';
import { CompanyService } from 'src/app/shared/services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  companyInfo!: Company;

  constructor(
    private companyService: CompanyService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCompanyInfo();
  }

  getCompanyInfo(): void {
    this.companyService.getCompanyInfo().subscribe((res) => {
      this.companyInfo = res;
      console.log('Company info', this.companyInfo);
    });
  }

  openEditDialog(value?: string): void {
    switch (value) {
      case 'companyName':
        this.companyService.editKey$$.next(value);
        break;
      case 'companyContact':
        this.companyService.editKey$$.next(value);
        break;
      case 'companyIdentificationDetails':
        this.companyService.editKey$$.next(value);
        break;
      case 'companyLicenceInfo':
        this.companyService.editKey$$.next(value);

        break;
      default:
        break;
    }
    const dialogRef = this.dialog.open(CompanyProfileEditComponent, {
      height: '70%',
      width: '70%',
    });
    dialogRef.afterClosed().subscribe(() => {
      location.reload();
    });
  }
}
