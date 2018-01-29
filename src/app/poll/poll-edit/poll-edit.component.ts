import { Component, OnInit, NgModule } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { PollService } from '../poll.service';
import { Poll } from '../poll';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ResultService } from '../result.service';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Result } from '../result';


@Component({
  selector: 'app-poll-edit',
  templateUrl: './poll-edit.component.html',
  styleUrls: ['./poll-edit.component.css']
})
export class PollEditComponent implements OnInit {
  regExpr: any = /[^a-zA-Z0-9-. ]/g;
  visible: Boolean = true;
  selectable: Boolean = true;
  removable: Boolean = true;
  addOnBlur: Boolean = true;

  result$: Observable<any[]>;
  polls$: Observable<any[]>;
  chips: Array<string>;
  options: FormArray;
  pollForm: FormGroup;
  totalOptins: Number = 1;
  isNewPoll: boolean;

  poll: Poll;
  result: Result;
  pollKey: string;
  poll$: Observable<Poll>;
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes


  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  snugs: string[] = [

  ];


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.snugs.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    const index = this.snugs.indexOf(fruit);

    if (index >= 0) {
      this.snugs.splice(index, 1);
    }
  }

  constructor(private ps: PollService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private rs: ResultService
  ) {
    // this.poll$ = ps.poll$.valueChanges();


  }

  ngOnInit() {
    this.chips = new Array<string>();
    this.chips = ['Pawan', 'Chief Minister', 'Andra Pradesh'];
    this.options = new FormArray([]);

    this.pollForm = new FormGroup({
      question: new FormControl('', [Validators.required, Validators.maxLength(700)]),
      options: this.options,

    });
    this.pollKey = this.activateRoute.snapshot.params['id'];
    this.isNewPoll = this.pollKey === 'new';
    !this.isNewPoll ? this.getPollById() : this.newPoll();

  }
  newPoll() {
    this.addOption();
    this.poll$ = Observable.of({}) as Observable<Poll>;
    
  }
  getPollById() {

    const poll: AngularFireObject<Poll> = this.ps.getPollById(this.pollKey);
    if (poll) {
      this.poll$ = poll.snapshotChanges().map(x => (
        { key: x.key, ...x.payload.val() }
      ));
      this.poll$.subscribe(x => {
        this.poll = x;
        if (this.poll.key != null) {
          this.initializePoll();
        }
      });
    }
  }
  initializePoll() {

    this.snugs = this.poll.snugs;
    for (const x of this.poll.options) {
      // console.log(x);
      this.options.push(new FormControl(x));
    }

    this.pollForm = new FormGroup({

      question: new FormControl(this.poll.question, [Validators.required, Validators.maxLength(700)]),
      options: this.options
    });
  }
  savePoll(poll: Poll, isValid: boolean) {
    this.submitted = true; // set form submit to true
    poll.title = poll.question.replace(/ /g, '-');
    poll.title = poll.title.toLowerCase();
    poll.title = poll.title.replace(this.regExpr, '');
    poll.snugs = this.snugs;
    this.isNewPoll ? this.ps.savePoll(poll).then(_ => {
      this.initailizeResult();
      this.router.navigate([`poll-list`]);
    }
    ) :
      this.ps.updatePoll(poll, this.pollKey).subscribe(() => this.router.navigate([`poll-list`]));
  }
  removePoll(poll: Poll) {
    poll.key = this.pollKey;
    this.result$ = this.rs.getResultByPollKey(this.pollKey).snapshotChanges().map(actions => {
      return actions.map(action => (
        { key: action.key, ...action.payload.val() }
      ));
    });
    this.result$.subscribe((x) => {
      x.forEach(res => {
        this.result = res;
      });
    }
    );
    this.rs.removeResult(this.result);
    this.ps.removePoll(poll).then(_ => this.router.navigate([`poll-list`]));

  }

  addOption() {
    this.options.push(new FormControl());
  }
  deleteOption(index: number) {
    this.options.removeAt(index);
  }
  // getLatestPoll() {
  //   this.poll = this.ps.getLatestPoll();
  // }
  initailizeResult() {
    const polls$: Observable<any[]> = this.ps.getLatestPoll();
    this.result = new Result();
    let latestPoll: Poll;
    const resultPer: any = [];
    polls$.subscribe((x) => {
      x.forEach(pollTmp => {
        latestPoll = pollTmp;
      });

      if (latestPoll.key != null) {
        const res: any = {};
        latestPoll.options.forEach((x: string) => {
          // x = x.replace(' ', '_');
          res[x] = 0;
        });
        // resultPer.push(res);
        this.result.result = res;
        this.result.question = latestPoll.question;
        this.result.pollKey = latestPoll.key;
        this.result.pollTitle = latestPoll.title;
        this.rs.save(this.result);
      }
    });

  }

}



