import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { OnChanges, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ChartService } from '../chart.service';
import { BaseChartDirective, Color } from 'ng2-charts';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType = 'pie';
  showChart: Observable<boolean>;
  colorsEmptyObject: Array<Color> = [{}];
  constructor(private cs: ChartService) {
    // BaseChartDirective.prototype.ngOnChanges = function (changes) {
    //   if (this.initFlag) {
    //     // Check if the changes are in the data or datasets
    //     if (changes.hasOwnProperty('data') || changes.hasOwnProperty('datasets')) {
    //       if (changes['data']) {
    //         this.updateChartData(changes['data'].currentValue);
    //       } else {
    //         this.updateChartData(changes['datasets'].currentValue);
    //       }
    //       // add label change detection every time
    //       if (changes['labels']) {
    //         if (this.chart && this.chart.data && this.chart.data.labels) {
    //           this.chart.data.labels = changes['labels'].currentValue;
    //         }
    //       }
    //       this.chart.update();
    //     } else {
    //       // otherwise rebuild the chart
    //       this.refresh();
    //     }
    //   }
    // };
    this.updateChartData();
  }
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit() {

  }
  ngOnDestroy() {
    this.pieChartLabels = null;
    this.pieChartData = null;
    this.showChart = Observable.of(false);
  }

  updateChartData() {
    this.cs.observable.subscribe((x) => {
      // this.changeDetector.markForCheck();
      this.pieChartLabels = x.labels;
      this.pieChartData = x.data;
      this.showChart = Observable.of(true);
      // this.changeDetector.detectChanges();
      this.cs.subject.complete();
    });

  }

}

