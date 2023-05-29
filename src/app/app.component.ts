import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeyStorageService } from './services/key-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private storageService: KeyStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let _res = this.isLogged();
    if (_res) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['auth']);
    }
  }

  isLogged() {
    if (this.storageService.verifyKey()) {
      return true;
    }
    return false;
  }

  logingOut() {
    this.storageService.removeKey();
    this.router.navigate(['auth']);
  }
}
