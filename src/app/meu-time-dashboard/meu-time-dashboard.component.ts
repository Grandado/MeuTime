import { FormControl } from '@angular/forms';
import { FootballService } from './../services/football.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, map, startWith } from 'rxjs';

import { CountriesDB } from '../../assets/dev/countriesDB';
import { SeasonsDB } from 'src/assets/dev/seasonsDB';

import { League } from '../interfaces/leagues.interface';
import { Country } from '../interfaces/countries.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Team, Statistic } from '../interfaces/teams.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Player } from '../interfaces/players.interface';
import { PlayersDB } from 'src/assets/dev/playersDB';
import { StatisticsDB } from 'src/assets/dev/statisticsDB';

@Component({
  selector: 'app-meu-time-dashboard',
  templateUrl: './meu-time-dashboard.component.html',
  styleUrls: ['./meu-time-dashboard.component.scss'],
})
export class MeuTimeDashboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'country', 'logo'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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

  teamsControl: { teams: Team[]; selectedTeam: number | null } = {
    teams: [],
    selectedTeam: null,
  };

  playerControl: { players: Player[]; selectedPlayer: number | null } = {
    players: PlayersDB,
    selectedPlayer: null,
  };

  statisticsControl: Statistic = StatisticsDB;

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

    this.seasonControl.seasons = SeasonsDB;

    /* this.dataSource = new MatTableDataSource(TeamsDB); */

    /* this.footBallService.getCountries().subscribe((data) => {
      this.countriesControl.countries = data;
      this.filteredCountry = this.countryControl.valueChanges.pipe(
        map((country) => {
          const name = typeof country === 'string' ? country : country?.name;
          return name
            ? this._filterCountries(name as string)
            : this.countriesControl.countries.slice();
        })
      );
      this.progress = false;
    });

    this.footBallService.getSeasons().subscribe((data) => {
      this.seasonControl.seasons = data.response;
    }); */
  }

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Itens por Pagina:';
    this.paginator._intl.getRangeLabel = (
      page: any,
      pageSize: any,
      length: any
    ): string => {
      if (length === 0 || pageSize === 0) {
        return '0 de ' + length;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;
      return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
    };
  }

  getLeaguesFromCountry(season: number) {
    if (season != undefined) {
      this.resetControl(2);
      this.progress = true;
      this.footBallService
        .getLeagues(this.countriesControl.selectedCountry, season)
        .subscribe((data) => {
          this.leagueControl.leagues = data.flatMap((e) => e.league);
          this.progress = false;
        });
    }
  }

  getTeamsFromLeague(league: number) {
    if (league != undefined) {
      this.resetControl(3);
      this.progress = true;
      this.footBallService
        .getTeams(league, this.seasonControl.selectedSeason)
        .subscribe((data) => {
          this.teamsControl.teams = data.flatMap((e) => e.team);
          this.fillDataSet();
          this.progress = false;
        });
    }
  }

  getPlayersAndStatisticsFromTeam(team: any) {
    this.teamsControl.selectedTeam = team.id;
    let _dataToSend = {
      league: this.leagueControl.selectedLeague,
      season: this.seasonControl.selectedSeason,
      team: this.teamsControl.selectedTeam,
    };
    this.footBallService.getPlayersByTeams(_dataToSend).subscribe((data) => {
      console.log(data.flatMap((e) => e.player));

      /* this.playerControl.players = data.flatMap((e) => e.player); */

      this.footBallService.getTeamStatistics(_dataToSend).subscribe((_data) => {
        this.statisticsControl = {
          fixtures: _data.response.fixtures,
          goals: _data.response.goals.for,
          lineups: _data.response.lineups,
        };
        console.log(this.statisticsControl);
      });

      this.progress = false;
    });
  }

  fillDataSet() {
    this.dataSource = new MatTableDataSource(this.teamsControl.teams);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  resetControl(id: number) {
    switch (id) {
      case 1:
        this.countryControl.reset();
        this.seasonControl.selectedSeason = null;
        this.leagueControl = { leagues: [], selectedLeague: null };
        this.resetTeams();
        break;
      case 2:
        this.leagueControl = { leagues: [], selectedLeague: null };
        this.resetTeams();
        break;
      case 3:
        this.resetTeams();
        break;
    }
  }

  resetTeams() {
    this.teamsControl = { teams: [], selectedTeam: null };
    this.dataSource = new MatTableDataSource();
  }

  displayFn(country: Country): string {
    return country && country.name ? country.name : '';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private _filterCountries(value: string): Country[] {
    const filterValue = value.toLowerCase();
    return this.countriesControl.countries.filter((country) =>
      country.name.toLowerCase().includes(filterValue)
    );
  }
}

/* export class DialogOverviewTeamDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewTeamDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
} */
