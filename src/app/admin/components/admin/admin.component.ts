import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { ContentService } from 'src/app/shared/services/content.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  path = this.router.url;

  data: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
