import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDrinkComponent } from './list-drink/list-drink.component';
import { ListPartyPersonsComponent } from './list-party-persons/list-party-persons.component';
import { ListPartyComponent } from './list-party/list-party.component';
import { ListPersonPartiesComponent } from './list-person-parties/list-person-parties.component';
import { ListPersonComponent } from './list-person/list-person.component';
import { ManageDrinkComponent } from './manage-drink/manage-drink.component';
import { ManagePartyComponent } from './manage-party/manage-party.component';
import { ManagePersonComponent } from './manage-person/manage-person.component';
import { PersonPartyRelComponent } from './person-party-rel/person-party-rel.component';

const routes: Routes = [
  { path: 'parties', component: ListPartyComponent },
  { path: 'parties/add-new', component: ManagePartyComponent },
  { path: 'parties/:id/edit', component: ManagePartyComponent },
  { path: 'parties/:id/add-person', component: PersonPartyRelComponent },
  { path: 'parties/:id/persons', component: ListPartyPersonsComponent },
  { path: 'parties/:id/persons/:id2/manage-drink', component: PersonPartyRelComponent },

  { path: 'persons', component: ListPersonComponent },
  { path: 'persons/add-new', component: ManagePersonComponent },
  { path: 'persons/:id/edit', component: ManagePersonComponent },
  { path: 'persons/:id/add-party', component: PersonPartyRelComponent },
  { path: 'persons/:id/parties', component: ListPersonPartiesComponent },
  { path: 'persons/:id2/parties/:id/manage-drink', component: PersonPartyRelComponent },

  { path: 'drinks', component: ListDrinkComponent },
  { path: 'drinks/add-new', component: ManageDrinkComponent },
  { path: 'drinks/:id/edit', component: ManageDrinkComponent },

  { path: '',   redirectTo: '/parties', pathMatch: 'full' },
  { path: '**', redirectTo: '/parties' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
