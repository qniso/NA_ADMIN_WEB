import {
  Directive,
  OnInit,
  Input,
  TemplateRef,
  ViewContainerRef,
  ElementRef,
} from '@angular/core';
import { map } from 'rxjs';
import { Roles } from '../models/roles.model';
import { UsersService } from '../services/users.service';

@Directive({
  selector: '[canAccess]',
})
export class UserAccessDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UsersService,
    private elementRef: ElementRef
  ) {}

  @Input('canAccess') canAccess!: string[];

  ngOnInit(): void {
    // let userRoles = [`${localStorage.getItem('role')}`];
    // if (!userAddress) console.log('User has no permissions!');
    this.userService.userRoles$
      .pipe(
        map((userRolesInfo) => {
          if (!userRolesInfo) return;
          console.log(userRolesInfo);
          const intersection = this.canAccess.filter((permision) =>
            userRolesInfo.role.includes(permision)
          );
          console.log('canAccess', this.canAccess);
          console.log('inter', intersection);

          if (intersection.length) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            return;
          }

          this.elementRef.nativeElement.display = 'none';
          this.viewContainer.clear();
        })
      )
      .subscribe();
  }
}
