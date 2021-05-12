import { Injectable } from '@angular/core';
import { Drink } from '../models/drink';
import { PersonPartyRel } from '../models/person-party-rel';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { environment } from '../../environments/environment';
import { map } from '../../../node_modules/rxjs/operators';
import { TypedJSON } from '../../../node_modules/typedjson';

@Injectable({
  providedIn: 'root'
})
export class PartyPersonRelService {

  baseContext: string = "Relations";
  relations: PersonPartyRel[] = [];
  constructor(
    private http: HttpClient
  ) {
    const ppr = new PersonPartyRel();
    ppr.personId = 1;
    ppr.partyId = 1;
    ppr.drinkId = 1;

    this.relations = [ 
      ppr
    ]
  }

  getDrinkId(personId: number, partyId: number): Observable<number> {
    return this.http.get(`${environment.baseUrl}/${this.baseContext}/Parties/${partyId}/Persons/${personId}`).pipe(
      map((data: any) => {
        const serializer = new TypedJSON(PersonPartyRel);
        var ppr: any;
        ppr = serializer.parse(JSON.stringify(data));
        if (ppr != null)
          return ppr.drinkId;
        else
          return null;
      }));
  }

  getPartyPersonDrinks(personIds: number[], partyId: number): Observable<PersonPartyRel[]> {
    return this.http.post(`${environment.baseUrl}/${this.baseContext}/Parties/${partyId}/Persons`, personIds).pipe(
      map((data: any) => {
        const temp: any[] = [];
        const serializer = new TypedJSON(PersonPartyRel);
        data.forEach((element: any) => {
          temp.push(serializer.parse(JSON.stringify(element)));
        });
          return temp;
      }));
  }

  getPersonParties(personId: number): Observable<number[]> {
    return this.http.get(`${environment.baseUrl}/${this.baseContext}/Persons/${personId}`).pipe(
      map((data: any) => {
        return data;
      }));
  }

  getPartyPersons(partyId: number): Observable<number[]> {
    return this.http.get(`${environment.baseUrl}/${this.baseContext}/Parties/${partyId}`).pipe(
      map((data: any) => {
        return data;
      }));
  }

  addPartyPersonRel(ppr: PersonPartyRel): Observable<void> {
    return this.http.post(`${environment.baseUrl}/${this.baseContext}`, ppr).pipe(
      map((data: any) => {
      }));
  }

  updatePartyPersonRel(ppr: PersonPartyRel): Observable<void> {
    return this.http.put(`${environment.baseUrl}/${this.baseContext}`, ppr).pipe(
      map((data: any) => {
      }));
  }

  deletePartyPersonRel(personId: number, partyId: number): Observable<void> {
    return this.http.delete(`${environment.baseUrl}/${this.baseContext}/Parties/${partyId}/Persons/${personId}`).pipe(
      map((data: any) => {

      }));
  }
}
