import { Component, OnInit } from '@angular/core';
import { AngularFireObject } from 'angularfire2/database';
import { PollService } from '../poll.service';
import { Poll } from '../poll';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ResultService } from '../result.service';
import { Result } from '../result';
import { Subject } from 'rxjs/Subject';
import { SeoService } from '../../seo.service';
import { Config } from '../../config';

@Component({
  selector: 'app-poll-detail',
  templateUrl: './poll-detail.component.html',
  styleUrls: ['./poll-detail.component.css']
})
export class PollDetailComponent implements OnInit {
  sb: Subject<Result>;
  public observable: Observable<any>;
  result$: Observable<Result[]>;
  pollKey: any = '-L2yeCgxW8R4nI41_PPf';
  poll: Poll;
  poll$: Observable<any>;
  colors: Array<String> = ['primary', 'accent', 'warn', 'basic', 'link'];

  constructor(private ps: PollService,
    private router: Router,
    private rs: ResultService,
    private seo: SeoService
  ) {
  }

  ngOnInit() {
    this.getLatestPoll();
  }

  getPollById() {

    const poll: AngularFireObject<Poll> = this.ps.getPollById(this.pollKey);
    if (poll) {
      this.poll$ = poll.snapshotChanges().map(x => (
        { key: x.key, ...x.payload.val() }
      ));
      this.poll$.subscribe(x => {
        this.poll = x;

      });
    }
  }

  castVote(poll: Poll, opt: string) {
    this.getResultByPollKey(poll.title);
    let vote = 0;
    // console.log(opt);
    // console.log(JSON.stringify(poll));
    this.observable.subscribe(
      (x: Result) => {
        const data: any = x.result;
        vote = data[opt];
        vote = vote + 1;
        x.result[opt] = vote;
        this.rs.update(x, x.key);
        console.log(JSON.stringify(x));
        this.sb.complete();
        this.router.navigate(['/result', x.pollTitle]);
      }
    );

  }

  getLatestPoll() {
    this.poll$ = this.ps.getLatestPoll();
    this.poll$.subscribe((x) => {
      x.forEach(pollTmp => {
        this.poll = pollTmp;
      });
      const config: Config = new Config();
      config.description = this.poll.question;
      config.updateKeyWords(this.poll.snugs);
      console.log('-------------------------' + config.keywords);
      config.title = this.poll.question;
      config.content = 'online poll';
      this.seo.generateTags(config);
    });
  }
  // get result by pollKey
  getResultByPollKey(pollKey: string) {
    this.result$ = this.rs.getResultByPollKey(pollKey).snapshotChanges().map(actions => {
      return actions.map(action => (
        { key: action.key, ...action.payload.val() }
      ));
    });
    let result: Result = new Result();
    this.sb = new Subject<Result>();
    this.observable = this.sb.asObservable();
    this.result$.subscribe(x => {
      x.forEach(
        (temp: Result) => {
          result = temp;
          this.sb.next(result);
        }
      );
    });
    //
  }
}
