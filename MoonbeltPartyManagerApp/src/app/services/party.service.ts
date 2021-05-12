import { Injectable } from '@angular/core';
import { Party } from '../models/party';
import { Observable } from '../../../node_modules/rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { map } from '../../../node_modules/rxjs/operators';
import { TypedJSON } from '../../../node_modules/typedjson';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  baseContext: string = "Parties";
  parties: Party[] = [];
  constructor(private http: HttpClient) { }

  addNewParty(party: Party): Observable<number> {
    party.id = 0;
    party.startDateTime = party.startDateTime.replace(' ', 'T') + ':00';
    party.endDateTime = party.endDateTime.replace(' ', 'T') + ':00';
    const serializer = new TypedJSON(Party);
    return this.http.post(`${environment.baseUrl}/${this.baseContext}`, serializer.toPlainJson(party)).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getParties(): Observable<Party[]> {
    return this.http.get(`${environment.baseUrl}/${this.baseContext}`).pipe(
      map((data: any) => {
        const temp: any[] = [];
        const serializer = new TypedJSON(Party);
        data.forEach((element: any) => {
          temp.push(serializer.parse(JSON.stringify(element)));
        });
        return temp;
      })
    );
  }

  getParty(id: number): Observable<Party> {
    return this.http.get(`${environment.baseUrl}/${this.baseContext}/${id}`).pipe(
      map((data: any) => {
        const serializer = new TypedJSON(Party);
        var party: any;
        party = serializer.parse(JSON.stringify(data));
        party.startDateTime = party.startDateTime.replace('T', ' ');
        party.startDateTime = party.startDateTime.substring(0, party.startDateTime.lastIndexOf(":00"))
        party.endDateTime = party.endDateTime.replace('T', ' ');
        party.endDateTime = party.endDateTime.substring(0, party.endDateTime.lastIndexOf(":00"))
        return party;
      }));
  }

  getPartiesList(ids: number[]): Observable<Party[]> {
    return this.http.post(`${environment.baseUrl}/${this.baseContext}/Search`, ids).pipe(
      map((data: any) => {

        const temp: any[] = [];
        const serializer = new TypedJSON(Party);
        data.forEach((element: any) => {
          var party: any;
          party = serializer.parse(JSON.stringify(element));
          party.startDateTime = party.startDateTime.replace('T', ' ');
          party.startDateTime = party.startDateTime.substring(0, party.startDateTime.lastIndexOf(":00"))
          party.endDateTime = party.endDateTime.replace('T', ' ');
          party.endDateTime = party.endDateTime.substring(0, party.endDateTime.lastIndexOf(":00"));
          temp.push(party);
        });
        return temp;
      }));
  }

  updateParty(party: Party): Observable<number> {
    party.startDateTime = party.startDateTime.replace(' ', 'T') + ':00';
    party.endDateTime = party.endDateTime.replace(' ', 'T') + ':00';
    const serializer = new TypedJSON(Party);
    return this.http.put(`${environment.baseUrl}/${this.baseContext}/${party.id}`, serializer.toPlainJson(party)).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  deleteParty(id: number): Observable<void> {
    return this.http.delete(`${environment.baseUrl}/${this.baseContext}/${id}`).pipe(
      map((data: any) => {
        
      }));
  }
}
