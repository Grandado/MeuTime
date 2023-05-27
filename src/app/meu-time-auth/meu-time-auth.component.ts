import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { FormControl, Validators } from '@angular/forms';
import { Status } from '../interfaces/status.interface';
import { KeyStorageService } from '../services/key-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meu-time-auth',
  templateUrl: './meu-time-auth.component.html',
  styleUrls: ['./meu-time-auth.component.scss'],
})
export class MeuTimeAuthComponent implements OnInit {
  @ViewChild('keyControl') keyControl!: ElementRef<HTMLInputElement>;

  hide = true;
  progress = false;
  focus = true;

  keyFormControl!: FormControl;

  constructor(
    private authService: AuthServiceService,
    private storageService: KeyStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.keyFormControl = new FormControl('', [Validators.required]);
  }

  callAuthOnKey(): void {
    this.disableForm();
    this.authService
      .getAuth(this.keyFormControl.value)
      .subscribe((data: Status) => {
        if (data.results == 0) {
          this.enableForm();
        } else {
          this.storageService.setKey(this.keyFormControl.value);
          this.router.navigate(['home']);
        }
      });
  }

  disableForm() {
    this.keyFormControl.disable();
    this.progress = true;
  }

  enableForm() {
    this.keyFormControl.reset('');
    this.keyFormControl.enable();
    this.progress = false;
    this.keyControl.nativeElement.focus();
  }

  onFocus() {
    return true;
  }
}
