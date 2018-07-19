import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../service/firebase.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ageValue: number;
  searchValue: string = "";
  items: Array<any>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.ageValue = 18;
    this.getData();
  }

  getData(){
    this.firebaseService.getPeople()
    .then(res => {
      this.items = res;
      this.age_filtered_items = res;
      this.name_filtered_items = res;
    })
  }

  viewDetails(item){
    this.router.navigate(['/details/'+ item.payload.doc.id])
  }

  goToCreatePerson(){
    this.router.navigate(['/newPerson']);
  }

  capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName(){
    let value = this.searchValue.toLowerCase();
    this.firebaseService.searchPeople(value)
    .then(res => {
      this.name_filtered_items = res;
      this.items = this.combineLists(res, this.age_filtered_items);
    })
  }

  rangeChange(event){
    console.log(event)
    this.firebaseService.searchPeopleByAge(event.value)
    .then(res =>{
      this.age_filtered_items = res;
      this.items = this.combineLists(res, this.name_filtered_items);
    })
  }

  combineLists(a, b){
    let result = [];

    a.filter(x => {
      return b.filter(x2 =>{
        if(x2.payload.doc.id == x.payload.doc.id){
          result.push(x2);
        }
      });
    });
    return result;
  }

}
