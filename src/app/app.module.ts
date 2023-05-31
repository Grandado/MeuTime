import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialModule } from './angular-material/angular-material.module';
import { MeuTimeAuthComponent } from './meu-time-auth/meu-time-auth.component';
import { AuthServiceService } from './services/auth-service.service';
import { KeyStorageService } from './services/key-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MeuTimeDashboardComponent } from './meu-time-dashboard/meu-time-dashboard.component';
import { FootballService } from './services/football.service';

import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [AppComponent, MeuTimeAuthComponent, MeuTimeDashboardComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HighchartsChartModule,
  ],
  providers: [AuthServiceService, KeyStorageService, FootballService],
  bootstrap: [AppComponent],
})
export class AppModule {}
