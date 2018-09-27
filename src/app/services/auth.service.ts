import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { StorageService } from './storage.service';
import { User } from '../models/user-model';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private storageSrv: StorageService) { }

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  public signUp(payload: any): Observable<any> {

    return this.http.post('https://idearer.herokuapp.com/' + 'users', JSON.stringify(payload), this.httpOptions)
      .pipe(
        map((data: any) => {
          data;
          console.log(data);
        }, catchError((err: HttpErrorResponse) => {
          console.log(err);
          throw(err);
        })
      )
    );
  }
}
