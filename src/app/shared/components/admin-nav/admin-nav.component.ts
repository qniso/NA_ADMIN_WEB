import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {

  @Output() test: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
