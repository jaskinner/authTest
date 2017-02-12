import {Injectable} from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';

declare var Auth0Lock: any;

@Injectable()
export class Auth {
  //config auth0
  lock = new Auth0Lock('50RS5gAli1rAhsF95eWKe7ZLBb9UA537', 'jon-ssi.auth0.com', {});

  constructor() {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      this.lock.getProfile(authResult.idToken, function (error, profile) {
        if(error){
          throw new Error(error);
        }
        //set profile
        localStorage.setItem('profile', JSON.stringify(profile));
        //set token
        localStorage.setItem('id_token', authResult.idToken);
      });
    });
  }

  public login() {
  // Call the show method to display the widget.
  this.lock.show();
}

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  }
}
