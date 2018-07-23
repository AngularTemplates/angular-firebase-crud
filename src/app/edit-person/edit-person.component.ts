import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AvatarDialogComponent } from "../avatar-dialog/avatar-dialog.component";
import { FirebaseService } from '../service/firebase.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss']
})
export class EditPersonComponent implements OnInit {

  exampleForm: FormGroup;
  avatarLink: string = '';
  item: any;

  validation_messages = {
   'name': [
     { type: 'required', message: 'Name is required.' }
   ],
   'surname': [
     { type: 'required', message: 'Surname is required.' }
   ],
   'age': [
     { type: 'required', message: 'Age is required.' },
   ]
 };

  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.person;
        this.avatarLink = data.person.avatar;
        this.createForm();
      }
    })
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: [this.item.name, Validators.required ],
      surname: [this.item.surname, Validators.required ],
      age: [this.item.age, Validators.required ]
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.avatarLink = result.link;
    });
  }

  onSubmit(value){
    value.avatar = this.avatarLink;
    value.age = Number(value.age);
    this.firebaseService.updatePerson(this.item.id,value)
    .then(
      res => {
        console.log(res);
      }
    )
  }

  back(){
    this.location.back();
  }

}
