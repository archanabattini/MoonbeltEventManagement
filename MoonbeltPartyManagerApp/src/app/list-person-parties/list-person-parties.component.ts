import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Party } from '../models/party';
import { Person } from '../models/person';
import { PartyPersonRelService } from '../services/party-person-rel.service';
import { PartyService } from '../services/party.service';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-list-person-parties',
  templateUrl: './list-person-parties.component.html',
  styleUrls: ['./list-person-parties.component.scss']
})
export class ListPersonPartiesComponent implements OnInit {

  personPartiesView: boolean = false;
  parties: Party[] = [];
  personId: number = -1;
  person!: Person;
  
  constructor(
    private partyService: PartyService,
    private personService: PersonService,
    private partyPersonRelService: PartyPersonRelService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id && id > 0) {
        this.personId = id;
        this.personService.getPerson(id).subscribe((data) => {
          this.person = data;
          this.personPartiesView = true;
          this.partyPersonRelService.getPersonParties(id).subscribe((data) => {
            this.partyService.getPartiesList(data).subscribe((data2) => {
              this.parties = data2;
            });
          });
        });
      }
    });
  }

  ngOnInit(): void {
  }

  deletePersonPartyRel(partyId: number, personId: number) {
    this.partyPersonRelService.deletePartyPersonRel(personId, partyId).subscribe(() => {
      this.partyPersonRelService.getPersonParties(personId).subscribe((data) => {
        this.partyService.getPartiesList(data).subscribe((data2) => {
          this.parties = data2;
        });
      });
    });
  }

  goToManageDrink(party: Party) {
    this.router.navigate([party.id, 'manage-drink'], {relativeTo: this.route});
  }
}
