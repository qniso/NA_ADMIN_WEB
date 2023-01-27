import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/shared/models/company.model';
import { CompanyService } from 'src/app/shared/services/company.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss'],
})
export class CompanyEditComponent implements OnInit {
  companyInfo!: Company;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.getCompanyInfo();
  }

  getCompanyInfo(): void {
    this.companyService.getCompanyInfo().subscribe((res) => {
      this.companyInfo = res;
      console.log('Company info', this.companyInfo);
    });
  }
}
