import { Injectable } from '@angular/core';
import { Result } from './result';
import { AngularFireList, AngularFireDatabase, AngularFireObject, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ResultService {

  results$: AngularFireList<Result>;
  constructor(private db: AngularFireDatabase) {
    this.results$ = db.list('results');
  }
  save(result: Result) {
    return this.results$.push(result)
      .then(_ => console.log('result Success'));
  }
  update(result: Result, key: string) {
    const ob: Observable<any> = Observable.fromPromise(this.results$.update(result.key, result));
    ob.subscribe(
      next => console.log('success'),
      error => console.log(error),
      () => console.log()
    );
    return ob;
  }

  removeResult(result: Result) {
    return this.results$.remove(result.key).then(_ => console.log('Success')).catch(error => console.log(error));
  }

  getResultById(key: string): AngularFireObject<Result> {
    return this.db.object(`results/${key}`);
  }

  getResultByPollKey(pollTitle: string) {
    // this.x = this.db.list('results', ref => ref.orderByChild('pollKey').equalTo('-L3LPIZCq1bloQkYKEHB'));
    // this.x.snapshotChanges().subscribe(ref => {
    //   ref.forEach((res: Result) => {
    //     console.log(console.log('length of ' + res.question);
    //   });

    // });

    // tslint:disable-next-line:max-line-length
    return this.db.list('results', ref => ref.orderByChild('pollTitle').equalTo(pollTitle));
  }

}
