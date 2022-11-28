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
    this.checkCurrentUser();
  }

  checkCurrentUser():void{
    const token = JSON.parse(localStorage.getItem("currentUser_NA")!).accessToken;
    if(!token || token == null){
      this.router.navigate(['/login']);
    }else{
      this.auth.setToken(token);
    }
  }

}
