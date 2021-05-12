import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Drink } from '../models/drink';
import { DrinkService } from '../services/drink.service';

@Component({
  selector: 'app-list-drink',
  templateUrl: './list-drink.component.html',
  styleUrls: ['./list-drink.component.scss']
})
export class ListDrinkComponent implements OnInit {

  drinks: Drink[] = [];

  constructor(
    private drinkService: DrinkService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.drinkService.getDrinks().subscribe((data: Drink[]) => {
      this.drinks = data;
    });
  }

  deleteDrink(drink: Drink) {
    this.drinkService.deleteDrink(drink.id).subscribe(() => {
      this.drinkService.getDrinks().subscribe((data: Drink[]) => {
        this.drinks = data;
      });
    });

  }

  goToUpdateDrink(drink: Drink) {
    this.router.navigate([drink.id, 'edit'], {relativeTo: this.route });
  }

}
