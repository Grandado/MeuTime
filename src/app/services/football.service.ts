import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { KeyStorageService } from './key-storage.service';
import { Countries } from '../interfaces/countries.interface';
import { Seasons } from '../interfaces/seasons.interface';
import { Leagues, League } from '../interfaces/leagues.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FootballService {
  constructor(
    private http: HttpClient,
    private keyStorage: KeyStorageService
  ) {}

  getCountries() {
    return this.http.get<Countries>(environment.API + 'countries', {
      headers: {
        'x-rapidapi-key': this.keyStorage.getKey(),
      },
    });
  }

  getSeasons() {
    return this.http.get<Seasons>(environment.API + 'leagues/seasons', {
      headers: {
        'x-rapidapi-key': this.keyStorage.getKey(),
      },
    });
  }

  getLeagues(country: string, season: number) {
    console.log('getLeagues\ncode:', country, '\nseason:', season);

    return this.http
      .get<Leagues>(environment.API + 'leagues', {
        params: { code: country, season: season },
        headers: {
          'x-rapidapi-key': this.keyStorage.getKey(),
        },
      })
      .pipe(map((e) => e.response));
  }
}
