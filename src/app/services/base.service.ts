import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  iconPaths = {
    password: {
      passwordVisible: 'assets/password_visible.svg',
      passwordHidden: 'assets/password_hidden.svg',
    },
  };

  constructor() {}

  getPasswordIcon(passwordVisibility: boolean) {
    return this.iconPaths.password[passwordVisibility? 'passwordVisible' : 'passwordHidden'];
  };
}
