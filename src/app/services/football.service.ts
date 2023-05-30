import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { KeyStorageService } from './key-storage.service';
import { Countries } from '../interfaces/countries.interface';
import { Seasons } from '../interfaces/seasons.interface';
import { Leagues, League } from '../interfaces/leagues.interface';
import { map } from 'rxjs';
import { Statistics, Teams } from '../interfaces/teams.interface';
import { Players } from '../interfaces/players.interface';

@Injectable({
  providedIn: 'root',
})
export class FootballService {
  constructor(
    private http: HttpClient,
    private keyStorage: KeyStorageService
  ) {}

  getCountries() {
    return this.http
      .get<Countries>(environment.API + 'countries', {
        headers: {
          'x-rapidapi-key': this.keyStorage.getKey(),
        },
      })
      .pipe(map((e) => e.response));
  }

  getSeasons() {
    return this.http.get<Seasons>(environment.API + 'leagues/seasons', {
      headers: {
        'x-rapidapi-key': this.keyStorage.getKey(),
      },
    });
  }

  getLeagues(country: string, season: number) {
    return this.http
      .get<Leagues>(environment.API + 'leagues', {
        params: { code: country, season: season },
        headers: {
          'x-rapidapi-key': this.keyStorage.getKey(),
        },
      })
      .pipe(map((e) => e.response));
  }

  getTeams(league: any, season: any) {
    return this.http
      .get<Teams>(environment.API + 'teams', {
        params: { league: league, season: season },
        headers: {
          'x-rapidapi-key': this.keyStorage.getKey(),
        },
      })
      .pipe(map((e) => e.response));
  }

  getPlayersByTeams(data: { league: any; season: any; team: any }) {
    return this.http
      .get<Players>(environment.API + 'players', {
        params: { league: data.league, season: data.season, team: data.team },
        headers: {
          'x-rapidapi-key': this.keyStorage.getKey(),
        },
      })
      .pipe(map((e) => e.response));
  }

  getTeamStatistics(data: { league: any; season: any; team: any }) {
    console.log('getTeamStatistics:', data);

    return this.http.get<Statistics>(environment.API + 'teams/statistics', {
      params: { league: data.league, season: data.season, team: data.team },
      headers: {
        'x-rapidapi-key': this.keyStorage.getKey(),
      },
    });
  }
}
