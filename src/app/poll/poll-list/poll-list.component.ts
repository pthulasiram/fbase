import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { Observable } from 'rxjs/Observable';
import { Poll } from '../poll';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.css']
})
export class PollListComponent implements OnInit {

  polls$: Observable<Poll[]>;
  polls: Array<Poll>;
  constructor(private pollService: PollService) { }

  ngOnInit() {
    this.listPolls();
  }

  listPolls() {
    this.polls$ = this.pollService.polls$.snapshotChanges().map(actions => {
      return actions.map(action => (
        { key: action.key, ...action.payload.val() }
      ));
    });
    // // debugger;
    // this.polls = new Array<Poll>();
    // this.polls$.subscribe(x =>
    //   x.forEach((p: Poll) => {
    //     this.polls.push[p];
    //   })
    // );
  }

}
