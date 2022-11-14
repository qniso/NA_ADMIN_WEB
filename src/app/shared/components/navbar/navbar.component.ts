import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

 
  constructor(
   
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  logout():void{
    localStorage.removeItem('currentUser_NA');
    this.router.navigate(['login']);
  }

  
}
