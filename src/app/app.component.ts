import { Component, OnChanges } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public authService: AuthService) {
    // this.items = db.object('data').valueChanges();
    this.authService.logout();
  }
  logout() {
    this.authService.logout();
  }
}
