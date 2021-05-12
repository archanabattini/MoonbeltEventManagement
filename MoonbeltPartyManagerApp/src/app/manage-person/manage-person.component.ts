import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../models/person';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-manage-person',
  templateUrl: './manage-person.component.html',
  styleUrls: ['./manage-person.component.scss']
})
export class ManagePersonComponent implements OnInit {

  personForm: FormGroup;
  person: Person;
  constructor(
    private personService: PersonService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
    ) { 
    this.person = new Person();
    this.personForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.person = new Person();
    this.personForm = this.fb.group({
      "id": new FormControl(null, []),
      "firstName": new FormControl(null, [Validators.required]),
      "lastName": new FormControl(null, [Validators.required]),
      "email": new FormControl(null, [Validators.required]),
      "phoneNumber": new FormControl(null, [Validators.required])
    });
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id && id > 0) {
        this.personService.getPerson(id).subscribe((data) => {
          this.person = data;
          this.personForm.patchValue(this.person);
        });
      }
    });
  }

  onAddOrUpdatePerson() {
    if (this.personForm.valid) {
      const person = this.personForm.value;
      if (person.id) {
        this.personService.updatePerson(new Person(person)).subscribe((data) => {
          this.router.navigateByUrl('/persons');
        });
      } else {
        this.personService.addNewPerson(new Person(person)).subscribe((data) => {
          this.router.navigateByUrl('/persons');
        });
      }
    }
  }

}
