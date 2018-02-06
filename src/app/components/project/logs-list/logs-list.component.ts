import { Component, OnInit, Input } from '@angular/core';


// Services
import { ProjectsService } from "../../../services/projects.service";

// Models
import { Log } from "../../../models/Log";

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.css']
})
export class LogsListComponent implements OnInit {

  @Input() logs: Log[];
  @Input() currentRouteId: string;
  selectedLog: Log;

  constructor(
    public projectsService: ProjectsService
  ) { }

  ngOnInit() {

    // подписываемся на выбор log
    // this.projectsService.selectedLog.subscribe( log => {
    //   console.log(log);
    //   if ( log.id === null ){
    //     this.selectedLog = {
    //       id: '',
    //       text: '',
    //       date: '',
    //     }
    //
    //   }
    // } )

    this.projectsService.stateClear.subscribe( clearState => {
      if ( clearState ) {
        this.selectedLog = {
          id: '',
          text: '',
          date: '',
        };
      }
    });

  }

  onSelect(log: Log){
    this.projectsService.setFormLog(log);
    this.selectedLog = log;
  }

  // удаление ЛОГА, передаем в сервис сам ЛОГ и ИД проекта
  delLog(logForDel: Log){
    this.projectsService.deleteLog(logForDel, this.currentRouteId);
  }

}
