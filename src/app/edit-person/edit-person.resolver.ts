import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { FirebaseService } from '../service/firebase.service';

@Injectable()
export class EditPersonResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let personId = route.paramMap.get('id');
      this.firebaseService.getPerson(personId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    })
  }
}
