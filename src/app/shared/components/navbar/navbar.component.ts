import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  list: string[] = [];
  routs: string[] = ['/main', '/main/cars/table', '/main/admin/admin-dashboard'];
  obj:any
  
  constructor(
    private contentService: ContentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.contentService.getRoleButtons().subscribe(res => {
      this.list = res.buttons;
      if(res.role !== 'DIRECTOR'){
        this.obj = [
          {item: "MAIN", rout: '/main'},
          {item: "TRANSPORT", rout:  '/main/cars/table'},
          {item: "COMPANY", rout: '/main/company/company-list'},
          {item: "ADMINISTRATION", rout: '/main/admin/admin-dashboard'},
        ]
      }else{
        this.obj = [
          {item: "MAIN", rout: '/main'},
          {item: "TRANSPORT", rout:  '/main/cars/table'},
          {item: "ADMINISTRATION", rout: '/main/admin/admin-dashboard'},
        ]
      }
    });
    
  }

  logout():void{
    localStorage.removeItem('currentUser_NA');
    this.router.navigate(['login']);
  }

  
}
