import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { Observable } from '../../../node_modules/rxjs';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from '../../../node_modules/rxjs/operators';
import { TypedJSON } from '../../../node_modules/typedjson';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  baseContext: string = "Persons";
  persons: Person[] = [];
  constructor(
    private http: HttpClient
  ) { }

  addNewPerson(person: Person): Observable<number> {
    person.id = 0;
    return this.http.post(`${environment.baseUrl}/${this.baseContext}`, person).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getPersons(): Observable<Person[]> {
    return this.http.get(`${environment.baseUrl}/${this.baseContext}`).pipe(
      map((data: any) => {
        const temp: any[] = [];
        const serializer = new TypedJSON(Person);
        data.forEach((element: any) => {
          temp.push(serializer.parse(JSON.stringify(element)));
        });
        return temp;
      })
    );
  }

  getPerson(id: number): Observable<Person> {
    return this.http.get(`${environment.baseUrl}/${this.baseContext}/${id}`).pipe(
      map((data: any) => {
        const serializer = new TypedJSON(Person);
        var person: any;
        person = serializer.parse(JSON.stringify(data));
        return person;
      }));
  }

  getPersonsList(ids: number[]): Observable<Person[]> {
    return this.http.post(`${environment.baseUrl}/${this.baseContext}/Search`, ids).pipe(
      map((data: any) => {
        const temp: any[] = [];
        const serializer = new TypedJSON(Person);
        data.forEach((element: any) => {
          var person: any;
          person = serializer.parse(JSON.stringify(element));
          temp.push(person);
        });
        return temp;
      }));
    }

  updatePerson(person: Person): Observable<number> {
    const serializer = new TypedJSON(Person);
    return this.http.put(`${environment.baseUrl}/${this.baseContext}/${person.id}`, serializer.toPlainJson(person)).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  deletePerson(id: number): Observable<void> {
    return this.http.delete(`${environment.baseUrl}/${this.baseContext}/${id}`).pipe(
      map((data: any) => {
        
      }));
  }
}
