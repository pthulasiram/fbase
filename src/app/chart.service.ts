import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChartService {
  public subject: Subject<any> = new Subject<any>();
  public  observable: Observable<any> = this.subject.asObservable();
  constructor() { }

}
