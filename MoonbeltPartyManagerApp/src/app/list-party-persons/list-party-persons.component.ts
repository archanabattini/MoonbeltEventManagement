import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Party } from '../models/party';
import { Person } from '../models/person';
import { PartyPersonRelService } from '../services/party-person-rel.service';
import { PartyService } from '../services/party.service';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-list-party-persons',
  templateUrl: './list-party-persons.component.html',
  styleUrls: ['./list-party-persons.component.scss']
})
export class ListPartyPersonsComponent implements OnInit {

  partyPersonsView: boolean = false;
  persons: Person[] = [];
  partyId: number = -1;
  party!: Party;

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
        this.partyId = id;
        this.partyService.getParty(id).subscribe((data) => {
          this.party = data;
          this.partyPersonsView = true;
          this.partyPersonRelService.getPartyPersons(id).subscribe((data) => {
            this.personService.getPersonsList(data).subscribe((data2) => {
              this.persons = data2;
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
      this.partyPersonRelService.getPartyPersons(partyId).subscribe((data) => {
        this.personService.getPersonsList(data).subscribe((data2) => {
          this.persons = data2;
        });
      });
    });
  }

  goToManageDrink(person: Person) {
    this.router.navigate([person.id, 'manage-drink'], {relativeTo: this.route});
  }
}
