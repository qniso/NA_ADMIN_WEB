import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { CurrentUserProfileRoutingModule } from './current-user-profile-routing.module';
import { CompanyComponent } from './components/company/company.component';

@NgModule({
  declarations: [ProfileComponent, CompanyComponent],
  imports: [CommonModule, SharedModule, CurrentUserProfileRoutingModule],
})
export class CurrentUserProfileModule {}
