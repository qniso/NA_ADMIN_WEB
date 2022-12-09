import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from '../../models/roles.model';
import { AuthService } from '../../services/auth.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit { 

  roles = Roles;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout():void{
    localStorage.removeItem('currentUser_NA');
    localStorage.removeItem('role');
    this.router.navigate(['login']);
  }

  
}
