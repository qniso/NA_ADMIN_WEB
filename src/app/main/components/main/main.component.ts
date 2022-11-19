import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {



  constructor(
    private router: Router,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    // this.checkCurrentUser();

    
  }

  checkCurrentUser():void{
    if(!localStorage.getItem("currentUser_NA"))
      this.router.navigate(['login']);
  }

}
