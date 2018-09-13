import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getAvatars(){
      return new Promise<any>((resolve, reject) => {
        this.db.collection('/avatar').valueChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
        })
      });
    }

    getPerson(personKey){
      return new Promise<any>((resolve, reject) => {
        this.db.collection('people').doc(personKey)
        .valueChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
        })
      })
    }

    updatePerson(personKey, value){
      return new Promise<any>((resolve, reject) => {
        value.nameToSearch = value.name.toLowerCase();
        this.db.collection('people').doc(personKey).set(value)
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
        this.db.collection('people').doc(personKey).delete()
        .then(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          })
      })
    }

    getPeople(){
      return new Promise<any>((resolve, reject) => {
        this.db.collection('people').snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots)
        })
      })
    }

    searchPeople(searchValue){
      return new Promise<any>((resolve, reject) => {
        this.db.collection('people',ref => ref.where('nameToSearch', '>=', searchValue)
        .where('nameToSearch', '<=', searchValue + '\uf8ff'))
        .snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
        })
      })
    }

    searchPeopleByAge(value){
      return new Promise<any>((resolve, reject) => {
        this.db.collection('people',ref => ref.orderBy('age').startAt(value))
        .snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
        })
      })
    }


    createPerson(value, avatar){
      return new Promise<any>((resolve, reject) => {
        this.db.collection('peopletest').add({
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
