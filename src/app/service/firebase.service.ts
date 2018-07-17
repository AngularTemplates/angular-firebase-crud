import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    public afs: AngularFirestore
  ){

  }

  getAvatars(){
      return new Promise<any>((resolve, reject) => {
        this.afs.collection('/avatar').valueChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
        })
      });
    }

    getPerson(personKey){
      return new Promise<any>((resolve, reject) => {
        this.afs.collection('people').doc(personKey)
        .valueChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
        })
      })
    }

    updatePerson(personKey, value){
      return new Promise<any>((resolve, reject) => {
        value.nameToSearch = value.name.toLowerCase();
        this.afs.collection('/people').doc(personKey).set(value)
        .then(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          })
      })
    }

    deletePerson(personKey){
      return new Promise<any>((resolve, reject) => {
        this.afs.collection('/people').doc(personKey).delete()
        .then(
          res => {
            resolve(res);
          },
          err => {
            reject(err)
          })
      })
    }

    getPeople(){
      return new Promise<any>((resolve, reject) => {
        this.afs.collection('/people').snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots)
        })
      })
    }

    searchPeople(searchValue){
      return new Promise<any>((resolve, reject) => {
        this.afs.collection('people',ref => ref.where('nameToSearch', '>=', searchValue)
        .where('nameToSearch', '<=', searchValue + '\uf8ff'))
        .snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
        })
      })
    }

    searchPeopleByAge(value){
      return new Promise<any>((resolve, reject) => {
        this.afs.collection('people',ref => ref.orderBy('age').startAt(value))
        .snapshotChanges()
        .subscribe(snapshots => {
          resolve (snapshots);
        })
      })
    }


    createPerson(value, avatar){
      return new Promise<any>((resolve, reject) => {
        this.afs.collection('/people').add({
          name: value.name,
          nameToSearch: value.name.toLowerCase(),
          surname: value.surname,
          age: parseInt(value.age),
          avatar: avatar
        })
        .then(
          (res) => {
            resolve(res)
          },
          err => reject(err)
        )
      })
    }
}
