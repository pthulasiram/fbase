import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
@Injectable()
export class AuthService {

  public user$: Observable<firebase.User>;

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth
  ) {
    this.user$ = this.afAuth.authState;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(_ => this.router.navigate([`/poll-list`]))
      .catch(error => console.log('auth error', error));
  }

  emailLogin(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('login successful ');
        this.router.navigateByUrl('/poll-list');
      }
      )
      .catch((error) => {
        this.handleError(error);
        this.router.navigateByUrl('/login');
      }
      );
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);

  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate([`/`]);
  }

}
