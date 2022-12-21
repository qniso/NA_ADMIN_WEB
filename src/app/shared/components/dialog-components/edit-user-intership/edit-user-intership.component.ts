import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInternship } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'edit-user-intership',
  templateUrl: './edit-user-intership.component.html',
  styleUrls: ['./edit-user-intership.component.scss'],
})
export class EditUserIntershipComponent implements OnInit {
  constructor(private fb: FormBuilder, private userService: UsersService) {}

  ngOnInit(): void {}
}
