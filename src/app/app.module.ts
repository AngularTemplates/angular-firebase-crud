import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';

import { AppComponent } from './app.component';
import { AvatarDialogComponent } from './avatar-dialog/avatar-dialog.component';
import { EditPersonComponent } from './edit-person/edit-person.component';
import { EditPersonResolver } from './edit-person/edit-person.resolver';
import { NewPersonComponent } from './new-person/new-person.component';
import { HomeComponent } from './home/home.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { FirebaseService } from './service/firebase.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatInputModule, MatListModule, MatIconModule, MatSliderModule, MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    AvatarDialogComponent,
    EditPersonComponent,
    NewPersonComponent,
    HomeComponent
  ],
  entryComponents: [AvatarDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatSliderModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [FirebaseService, EditPersonResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
