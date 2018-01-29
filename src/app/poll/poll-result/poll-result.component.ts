import { Component, OnInit } from '@angular/core';
import { ResultService } from '../result.service';
import { Result } from '../result';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { ChartService } from '../../chart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Poll } from '../poll';
import { PollService } from '../poll.service';
import { Config } from '../../config';
import { SeoService } from '../../seo.service';
@Component({
  selector: 'app-poll-result',
  templateUrl: './poll-result.component.html',
  styleUrls: ['./poll-result.component.css']
})
export class PollResultComponent implements OnInit {
  pollKey: string;
  result$: Observable<Result[]>;
  polls: Poll[];
  polls$: Observable<Poll[]>;
  result: Result;
  public data: any;
  public pieChartLabels: Array<string>;
  // = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData: Array<number>;
  // = [300, 500, 100];

  sm: any[] = [280];
  lg: any[] = [800, 250];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  constructor(private rs: ResultService,
    private cs: ChartService,
    private router: Router,
    private pollService: PollService,
    private activateRoute: ActivatedRoute,
    private seo: SeoService) {
    this.result = new Result();
    this.pieChartData = new Array<number>();
    this.pieChartLabels = new Array<string>();
    this.pollKey = this.activateRoute.snapshot.params['id'];
    this.getResultByPollId(this.pollKey);
  }
  ngOnInit() {
    this.listPolls();
  }
  onSelect(event) {
    console.log(event);
  }
  getResultByPollId(pollKey: string) {
    this.result$ = this.rs.getResultByPollKey(pollKey).snapshotChanges().map(actions => {
      return actions.map(action => (
        { key: action.key, ...action.payload.val() }
      ));
    });

    this.result$.subscribe(x => {
      x.forEach(
        temp => {
          this.result = temp;
          if (this.result.key != null) {
            const data: string = JSON.stringify(this.result.result);
            // this.updateChartData(data);
            this.updatePieChartData(data);
          }
        }
      );
    });

  }
  updateChartData(data: any) {
    JSON.parse(data, (key: string, value: number) => {
      console.log(key + ' --------- ' + value); // log the current property name, the last is "".
      if (!(key === '0' || key === '')) {
        this.pieChartData.push(value);
        this.pieChartLabels.push(key);
      }
    }
    );
    const chartData: any = [];
    chartData.data = this.pieChartData;
    chartData.labels = this.pieChartLabels;
    this.cs.subject.next(chartData);

  }

  updatePieChartData(data: any) {
    this.data = [];
    const mKeys: any = [];
    JSON.parse(data, (key: string, value: number) => {
      console.log(key + ' --------- ' + value); // log the current property name, the last is "".

      if (!(key === '0' || key === '')) {
        const chartData: any = {};
        chartData['name'] = key;
        mKeys.push(key);
        chartData['value'] = value;
        this.data.push(chartData);
      }
    }
    );

    const config: Config = new Config();
    config.description = this.result.question;
    config.keywords = mKeys;
    config.title = 'poll result: ' + this.result.question;
    config.content = 'online poll results';
    this.seo.generateTags(config);
    // this.cs.subject.next(this.chartData);
  }
  listPolls() {
    this.polls$ = this.pollService.polls$.snapshotChanges().map(actions => {
      return actions.map(action => (
        { key: action.key, ...action.payload.val() }
      ));
    });

  }

}
