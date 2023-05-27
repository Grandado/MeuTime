import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class KeyStorageService {
  /* logado: Observable<boolean>; */

  constructor() {
    if (!this.verifyKey()) {
      this.setDefault();
    }
  }

  verifyKey() {
    let _response = this.getKey();
    if (_response == null || _response == '') {
      return false;
    }
    return true;
  }

  setDefault() {
    localStorage.setItem('teamKey', '');
  }

  setKey(key: string) {
    localStorage.setItem('teamKey', this.encrypt(key));
  }

  getKey() {
    let _data = localStorage.getItem('teamKey') || '';
    if (_data == '') {
      return '';
    }
    return this.decrypt(_data);
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, environment.SECRET_KEY).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, environment.SECRET_KEY).toString(
      CryptoJS.enc.Utf8
    );
  }
}
