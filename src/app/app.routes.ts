import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewPersonComponent } from './new-person/new-person.component';
import { EditPersonComponent } from './edit-person/edit-person.component';
import { EditPersonResolver } from './edit-person/edit-person.resolver';

export const rootRouterConfig: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'newPerson', component: NewPersonComponent },
  { path: 'details/:id', component: EditPersonComponent, resolve:{data : EditPersonResolver} }
];
