import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  path = this.router.url;
  data:string =''
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  
}
