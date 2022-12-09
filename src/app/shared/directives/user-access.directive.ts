import { 
  Directive,
  OnInit,
  Input,
  TemplateRef,
  ViewContainerRef,
  ElementRef
} from '@angular/core';
import { Roles } from '../models/roles.model';

@Directive({
  selector: '[canAccess]'
})
export class UserAccessDirective {

  constructor (
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private elementRef: ElementRef
) {}


  @Input('canAccess') canAccess!: string[];

    ngOnInit(): void {
        let renderView:boolean = false;
        let userPermissions = [`${localStorage.getItem('role')}`];
        if (!userPermissions) console.log('User has no permissions!');
        let intersection = userPermissions.filter(permission => this.canAccess.includes(permission));
        if (intersection.length > 0) {
            renderView =  true;
        }

        if (renderView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else {
            this.elementRef.nativeElement.display = 'none';
            this.viewContainer.clear();
        }
    }

  
}
