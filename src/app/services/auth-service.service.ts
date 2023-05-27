import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Status } from '../interfaces/status.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}

  getAuth(key: string) {
    return this.http.get<Status>(environment.API + 'status', {
      headers: {
        'x-rapidapi-key': key,
        'x-rapidapi-host': 'v3.football.api-sports.io',
      },
    });
  }
}
