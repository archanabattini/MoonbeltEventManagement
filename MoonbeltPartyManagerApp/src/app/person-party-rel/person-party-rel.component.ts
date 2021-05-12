import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Drink } from '../models/drink';
import { Party } from '../models/party';
import { Person } from '../models/person';
import { DrinkService } from '../services/drink.service';
import { PartyPersonRelService } from '../services/party-person-rel.service';
import { PartyService } from '../services/party.service';
import { PersonService } from '../services/person.service';
import { PersonPartyRel } from '../models/person-party-rel';

@Component({
  selector: 'app-person-party-rel',
  templateUrl: './person-party-rel.component.html',
  styleUrls: ['./person-party-rel.component.scss']
})
export class PersonPartyRelComponent implements OnInit {

  personId!: number;
  persons: Person[] = [];

  partyId!: number;
  parties: Party[] = [];

  drinkId!: number;
  drinks: Drink[] = [];

  personPartyRelForm: FormGroup;

  constructor(
    private drinkService: DrinkService,
    private personService: PersonService,
    private partyService: PartyService,
    private partyPersonRelService: PartyPersonRelService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.personPartyRelForm = this.fb.group({
      "party": new FormControl(null, [Validators.required]),
      "person": new FormControl(null, [Validators.required]),
      "drink": new FormControl(null, [Validators.required])
    });
    this.personService.getPersons().subscribe((data) => {
      this.persons = data;
      this.partyService.getParties().subscribe((data) => {
        this.parties = data;
        this.drinkService.getDrinks().subscribe((data: Drink[]) => {
          this.drinks = data;
          this.route.params.subscribe(params => {
            const id = params['id'];
            if (id && id > 0) {
              this.route.url.subscribe(uri => {
                if (uri.filter(u => u.path.indexOf('add-person') != -1).length > 0) {
                  this.partyId = id;
                  this.partyService.getParty(id).subscribe((data) => {
                    ;
                    this.personPartyRelForm.controls['party'].setValue(this.parties.filter(p => p.id == data.id)[0], {onlySelf: true});
                    this.personPartyRelForm.controls['party'].disable();
                  });
                } else if (uri.filter(u => u.path.indexOf('add-party') != -1).length > 0) {
                  this.personId = id;
                  this.personService.getPerson(id).subscribe((data) => {
                    this.personPartyRelForm.controls['person'].setValue(this.persons.filter(p => p.id == data.id)[0], {onlySelf: true});
                    this.personPartyRelForm.controls['person'].disable();
                  });
                } else if (uri.filter(u => u.path.indexOf('manage-drink') != -1).length > 0) {
                  this.partyId = id;
                  this.personId = params['id2'];
                  this.partyService.getParty(this.partyId).subscribe((data) => {
                    this.personPartyRelForm.controls['party'].setValue(this.parties.filter(p => p.id == data.id)[0], {onlySelf: true});
                    this.personPartyRelForm.controls['party'].disable();
                    this.personService.getPerson(this.personId).subscribe((data2) => {
                      this.personPartyRelForm.controls['person'].setValue(this.persons.filter(p => p.id == data2.id)[0], {onlySelf: true});
                      this.personPartyRelForm.controls['person'].disable();
                    });
                  });
                  this.partyPersonRelService.getDrinkId(this.personId, this.partyId).subscribe((data) => {
                    this.drinkId = data;
                    if (this.drinkId && this.drinkId > 0) {
                      this.drinkService.getDrink(this.drinkId).subscribe((data) => {
                        this.personPartyRelForm.controls['drink'].setValue(this.drinks.filter(d => d.id == data.id)[0], {onlySelf: true});
                      });
                    }
                  });
                }
                this.personPartyRelForm.updateValueAndValidity();
              })
            }
          });
        });
      });
    });
  }

  ngOnInit(): void {
  }

  managePersonPartyRel() {
    if (this.personPartyRelForm.valid) {
      const val = this.personPartyRelForm.getRawValue();
      console.log(val);
      this.managePartyPersonRel(val.person.id, val.party.id, val.drink.id);
    }
  }

  managePartyPersonRel(personId: number, partyId: number, drinkId: number) {
    this.partyPersonRelService.getDrinkId(personId, partyId).subscribe((data) => {
      const ppr = new PersonPartyRel();
      ppr.personId = personId;
      ppr.partyId = partyId;
      ppr.drinkId = drinkId;
      if (data != null) {
        //Update
        this.partyPersonRelService.updatePartyPersonRel(ppr).subscribe(() => {
          this.router.navigate(["parties", partyId, "persons"]);
        });
      } else {
        //Add
        this.partyPersonRelService.addPartyPersonRel(ppr).subscribe(() => {
          this.router.navigate(["parties", partyId, "persons"]);
        });
      }
    });
  }

  cancel() {
    this.router.navigateByUrl("/");
  }
}
