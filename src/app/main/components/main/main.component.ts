import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ContentService } from 'src/app/shared/services/content.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {



  constructor(
    private router: Router,
    private auth: AuthService,
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.checkCurrentUser();
    this.auth.getRefreshToken();
  }

  checkCurrentUser():void{
    const token = JSON.parse(localStorage.getItem("currentUser_NA")!).accessToken;
    
    if(token || token !== null){
      this.auth.setToken(token);
      
    }else{
      this.router.navigate(['/login']);
    }
  }

}
