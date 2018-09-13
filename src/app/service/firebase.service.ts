import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getAvatars(){
      return this.db.collection('/avatar').valueChanges()
  }

  getPerson(personKey){
    return this.db.collection('people').doc(personKey).snapshotChanges();
  }

  updatePerson(personKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('people').doc(personKey).set(value);
  }

  deletePerson(personKey){
    return this.db.collection('/people').doc(personKey).delete();
  }

  getPeople(){
    return this.db.collection('people').snapshotChanges();
  }

  searchPeople(searchValue){
    return this.db.collection('people',ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchPeopleByAge(value){
    return this.db.collection('people',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createPerson(value, avatar){
    return this.db.collection('people').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      age: parseInt(value.age),
      avatar: avatar
    });
  }
}
