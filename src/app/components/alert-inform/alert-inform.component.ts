import { Component, OnInit } from '@angular/core';


// Services
import { AlertInformService } from "../../services/alert-inform.service";

// Models
import {Alert} from "../../models/Alert";


@Component({
  selector: 'app-alert-inform',
  templateUrl: './alert-inform.component.html',
  styleUrls: ['./alert-inform.component.css']
})
export class AlertInformComponent implements OnInit {

  alert: Alert;
  show: boolean = false;

  constructor(
    // подключаем СЕРВИСЫ к компоненте
    public alertService: AlertInformService
  ) { }

  ngOnInit() {

    this.alertService.alertData.subscribe( data => {
      this.alert = data;
      // console.log("this.alert = ", this.alert);

      if(this.alert.type != null && this.alert.text != null) {
        this.show = true;

        setTimeout(() => {
          this.show = false;
        }, 2000);
      }


    }, error => {
      console.log(error);
    });


  }




}
