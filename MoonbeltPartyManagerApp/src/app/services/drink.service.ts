import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Drink } from '../models/drink';
import { map } from "rxjs/operators";
import { JsonTypes, TypedJSON } from "typedjson";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  baseContext: string = "Drinks";
  drinks: Drink[] = [];
  constructor(private http: HttpClient) { }

  addNewDrink(drink: Drink): Observable<number> {
    drink.id = 0;
    return this.http.post(`${environment.baseUrl}/${this.baseContext}`, drink).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getDrinks(): Observable<Drink[]> {
    return this.http.get(`${environment.baseUrl}/${this.baseContext}`).pipe(
      map((data: any) => {
        const temp: any[] = [];
        const serializer = new TypedJSON(Drink);
        data.forEach((element: any) => {
          temp.push(serializer.parse(JSON.stringify(element)));
        });
        return temp;
      })
    );
  }

  getDrinksList(ids: number[]): Observable<Drink[]> {
    return this.http.post(`${environment.baseUrl}/${this.baseContext}/Search`, ids).pipe(
      map((data: any) => {
        const temp: any[] = [];
        const serializer = new TypedJSON(Drink);
        data.forEach((element: any) => {
          temp.push(serializer.parse(JSON.stringify(element)));
        });
        return temp;
      })
    );
  }

  getDrink(id: number): Observable<Drink> {
    return this.http.get(`${environment.baseUrl}/${this.baseContext}/${id}`).pipe(
      map((data: any) => {
        const serializer = new TypedJSON(Drink);
        var drink: any;
        drink = serializer.parse(JSON.stringify(data));
        return drink;
      }));
  }

  updateDrink(drink: Drink): Observable<number> {
    return this.http.put(`${environment.baseUrl}/${this.baseContext}/${drink.id}`, drink).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  deleteDrink(id: number): Observable<void> {
    return this.http.delete(`${environment.baseUrl}/${this.baseContext}/${id}`).pipe(
      map((data: any) => {
        
      }));
  }
}
