import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../models/person';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.scss']
})
export class ListPersonComponent implements OnInit {

  persons: Person[] = [];

  constructor(
    private personService: PersonService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.personService.getPersons().subscribe((data) => {
      this.persons = data;
    });
  }

  deletePerson(person: Person) {
    this.personService.deletePerson(person.id).subscribe(() => {
      this.personService.getPersons().subscribe((data) => {
        this.persons = data;
      });
    });
  }

  goToAddParty(person: Person) {
    this.router.navigate([person.id, 'add-party'], { relativeTo: this.route });
  }
  goToUpdatePerson(person: Person) {
    this.router.navigate([person.id, 'edit'], {relativeTo: this.route });
  }
  goToParties(person: Person) {
    this.router.navigate([person.id, 'parties'], { relativeTo: this.route });
  }
}
