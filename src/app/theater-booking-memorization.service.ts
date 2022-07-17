import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ShowBookings } from './show-bookings';

@Injectable({
  providedIn: 'root',
})
export class TheaterBookingMemorizationService {
  private static readonly baseURL: string =
    'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint/';

  private static readonly getURL: string =
    TheaterBookingMemorizationService.baseURL + 'get?key=';

  private static readonly setURL: string =
    TheaterBookingMemorizationService.baseURL + 'set?key=';

  constructor(private http: HttpClient) {}

  private getData(key: string): Observable<string> {
    return this.http.get<string>(
      TheaterBookingMemorizationService.getURL + key
    );
  }

  private setData(key: string, value: string): Observable<string> {
    return this.http.post<string>(
      TheaterBookingMemorizationService.setURL + key,
      value
    );
  }

  public resetData(key: string): Observable<string> {
    return this.http.post<string>(
      TheaterBookingMemorizationService.setURL + 'set?key=' + key,
      ''
    );
  }

  public newKey(): Observable<string> {
    return this.http.get<string>(
      TheaterBookingMemorizationService.baseURL + 'new?secret=ssw2022'
    );
  }

  //Da usare
  //Fare anche il macth con RegExp .test()
  private isValidKey(show_key: string): boolean {
    if (show_key != undefined && show_key.length === 8) {
      return true;
    } else {
      return false;
    }
  }

  public getDataFromDatabase(key: string): Promise<string> {
    //Utilizzo una promise perchè ho la necessità di attendere la risposta prima di analizzarla per capire se il codice per il database è valido
    return new Promise((resolve, reject) => {
      this.getData(key).subscribe({
        next: (res: string) => {
          console.log('Accessing database[...]');
          resolve(res);
        },
        error: (err) => {
          console.error('Observer got an error: ' + JSON.stringify(err));
          reject(err);
        },
        complete: () => {
          console.log('Database accessed');
        },
      });
    });
  }

  public newKeyFromDatabase(): Promise<string> {
    //Utilizzo una promise perchè ho la necessità di attendere la risposta prima di analizzarla per capire se il codice per il database è valido
    return new Promise((resolve, reject) => {
      this.newKey().subscribe({
        next: (res: string) => {
          console.log('Accessing database[...]');
          resolve(res);
        },
        error: (err) => {
          console.error('Observer got an error: ' + JSON.stringify(err));
          reject(err);
        },
        complete: () => {
          console.log('Database accessed');
        },
      });
    });
  }

  public sendDataToDatabase(key: string, value: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.setData(key, value).subscribe({
        next: (res: string) => {
          console.log('Accessing database[...]');
          resolve(res);
        },
        error: (err) => {
          console.error('Observer got an error: ' + JSON.stringify(err));
          reject(err);
        },
        complete: () => {
          console.log('Database accessed');
        },
      });
    });
  }
}
