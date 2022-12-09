import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  loader$ = this.load.loading$;


  constructor(
    private load: LoadingService,

  ) { }

  ngOnInit(): void {
  }

}
