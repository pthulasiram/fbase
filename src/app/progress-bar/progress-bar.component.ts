import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartService } from '../chart.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  sm: any[] = [330];
  lg: any[] = [800, 450];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  @Input() public data: any = [];
  constructor(private cs: ChartService) {
  }

  ngOnInit() {
    this.cs.observable.subscribe(x => {
      this.data = x;
       // this.cs.subject.complete();
    }
    );

  }
  onSelect(event) {
    console.log(event);
  }
}
