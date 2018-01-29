import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { PollListComponent } from './poll-list/poll-list.component';
import { Poll } from './poll';

@Injectable()
export class PollService {
  // polls$: Observable<Poll[]>;
  polls$: AngularFireList<Poll>;
  constructor(private db: AngularFireDatabase) {

    //    this.polls$ = db.list('polls');

    this.polls$ = db.list('polls');
  }

  getPollById(pollKey: string): AngularFireObject<Poll> {
    return this.db.object(`polls/${pollKey}`);
  }
  savePoll(poll: Poll) {
    return this.polls$.push(poll)
      .then(_ => console.log('Success'));
  }
  updatePoll(poll: Poll, key: string) {
    poll.key = key;
    const ob: Observable<any> = Observable.fromPromise(this.polls$.update(poll.key, poll));
    ob.subscribe(
      next => console.log('success'),
      error => console.log(error),
      () => console.log()
    );
    return ob;
  }
  removePoll(poll: Poll) {
    return this.polls$.remove(poll.key).then(_ => console.log('Success')).catch(error => console.log(error));
  }
  getLatestPoll() {
    // return this.db.list('polls', ref => ref.limitToLast(1));
    const polls: Observable<Poll[]> = this.db.list('polls', ref => ref.limitToLast(1)).snapshotChanges().map(actions => {
      return actions.map(action => (
        { key: action.key, ...action.payload.val() }
      ));
    });
   return polls;
  }
}
