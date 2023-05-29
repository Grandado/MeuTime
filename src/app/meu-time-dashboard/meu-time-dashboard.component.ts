import { FormControl } from '@angular/forms';
import { FootballService } from './../services/football.service';
import { Component, OnInit } from '@angular/core';
import { Observable, map, startWith } from 'rxjs';

import { CountriesDB } from '../../assets/dev/countries';
import { Seasons } from 'src/assets/dev/seasons';
import { League } from '../interfaces/leagues.interface';

export interface Country {
  name: string;
  code: string;
  flag: string;
}

@Component({
  selector: 'app-meu-time-dashboard',
  templateUrl: './meu-time-dashboard.component.html',
  styleUrls: ['./meu-time-dashboard.component.scss'],
})
export class MeuTimeDashboardComponent implements OnInit {
  countriesControl: {
    countries: Country[];
    selectedCountry: string;
  } = { countries: CountriesDB, selectedCountry: '' };

  seasonControl: { seasons: number[]; selectedSeason: number | null } = {
    seasons: [],
    selectedSeason: null,
  };

  leagueControl: { leagues: League[]; selectedLeague: number | null } = {
    leagues: [],
    selectedLeague: null,
  };

  countryControl = new FormControl();
  filteredCountry!: Observable<Country[]>;
  progress = false;

  constructor(private footBallService: FootballService) {}

  ngOnInit(): void {
    this.progress = true;
    this.countryControl.disabled;

    this.filteredCountry = this.countryControl.valueChanges.pipe(
      startWith(''),
      map((country) => {
        const name = typeof country === 'string' ? country : country?.name;
        return name
          ? this._filterCountries(name as string)
          : this.countriesControl.countries.slice();
      })
    );
    this.progress = false;
    this.countryControl.enabled;

    this.seasonControl.seasons = Seasons;

    /* this.footBallService.getCountries().subscribe((data) => {
      console.log(data.response);
      
      this.countries = data.response;
      this.filteredCountry = this.countryControl.valueChanges.pipe(
        startWith(''),
        map((country) =>
          country ? this._filterCountries(country) : this.countries.slice()
        )
      );
      this.progress = false;
    }); */

    /* this.footBallService.getSeasons().subscribe((data) => {
      this.seasons = data.response;
    }); */
  }

  getLeaguesFromCountry(season: number) {
    if (season != undefined) {
      this.footBallService
        .getLeagues(this.countriesControl.selectedCountry, season)
        .subscribe((data) => {
          this.leagueControl.leagues = data.flatMap((e) => e.league);
        });
    }
  }

  resetControl() {
    this.countryControl.reset();
    this.seasonControl.selectedSeason = null;
  }

  teste(e: any) {
    console.log(e);
  }

  displayFn(country: Country): string {
    return country && country.name ? country.name : '';
  }

  private _filterCountries(value: string): Country[] {
    const filterValue = value.toLowerCase();
    return this.countriesControl.countries.filter((country) =>
      country.name.toLowerCase().includes(filterValue)
    );
  }
}
