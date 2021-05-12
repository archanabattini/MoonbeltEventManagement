import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Drink } from '../models/drink';
import { DrinkService } from '../services/drink.service';

@Component({
  selector: 'app-manage-drink',
  templateUrl: './manage-drink.component.html',
  styleUrls: ['./manage-drink.component.scss']
})
export class ManageDrinkComponent implements OnInit {

  drinkForm: FormGroup;
  drink: Drink;
  constructor(
    private drinkService: DrinkService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
    ) { 
    this.drink = new Drink();
    this.drinkForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.drink = new Drink();
    this.drinkForm = this.fb.group({
      "id": new FormControl(null, []),
      "name": new FormControl(null, [Validators.required])
    });
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id && id > 0) {
        this.drinkService.getDrink(id).subscribe((data) => {
          this.drink = data;
          this.drinkForm.patchValue(this.drink);
        });
      }
    });
  }

  onAddOrUpdateDrink() {
    if (this.drinkForm.valid) {
      const drink = this.drinkForm.value;
      if (drink.id) {
        this.drinkService.updateDrink(new Drink(drink)).subscribe((data) => {
          console.log('Drink ' + data + ' updated');
          this.router.navigateByUrl('/drinks');
        });
      } else {
        this.drinkService.addNewDrink(new Drink(drink)).subscribe((data) => {
          console.log('Drink ' + data + ' added');
          this.router.navigateByUrl('/drinks');
        });
      }
    }
  }

}
