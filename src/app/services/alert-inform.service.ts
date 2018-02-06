import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import {of} from "rxjs/observable/of";

// Models
import { Alert } from '../models/Alert';
import {Project} from "../models/Project";
import {Log} from "../models/Log";

@Injectable()
export class AlertInformService {


  // создаем переменные для сервиса
  alertObject: Alert;



  private alertSource = new BehaviorSubject<Alert>({ type: null, text: null });     // этим вызываем создание нового обьекта, за которым следят
  alertData = this.alertSource.asObservable();                                                   // а это сам обьект за которым следят в разных компонентах





  constructor() { }


  setAlertObject(alert: Alert) {
    // console.log("setAlertObject-alert = ", alert);
    this.alertSource.next(alert);
  }

}
