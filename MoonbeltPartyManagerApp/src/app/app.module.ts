import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPartyComponent } from './list-party/list-party.component';
import { ListPersonComponent } from './list-person/list-person.component';
import { ListDrinkComponent } from './list-drink/list-drink.component';
import { ManagePersonComponent } from './manage-person/manage-person.component';
import { ManagePartyComponent } from './manage-party/manage-party.component';
import { ManageDrinkComponent } from './manage-drink/manage-drink.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonPartyRelComponent } from './person-party-rel/person-party-rel.component';
import { ListPartyPersonsComponent } from './list-party-persons/list-party-persons.component';
import { ListPersonPartiesComponent } from './list-person-parties/list-person-parties.component';

@NgModule({
  declarations: [
    AppComponent,
    ListPartyComponent,
    ListPersonComponent,
    ListDrinkComponent,
    ManagePersonComponent,
    ManagePartyComponent,
    ManageDrinkComponent,
    NavbarComponent,
    PersonPartyRelComponent,
    ListPartyPersonsComponent,
    ListPersonPartiesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
