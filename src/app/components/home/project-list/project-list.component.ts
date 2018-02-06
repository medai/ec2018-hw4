import { Component, OnInit, Input } from '@angular/core';


// Services
import { ProjectsService } from "../../../services/projects.service";


// Models
import { Log } from "../../../models/Log";
import { Project } from "../../../models/Project";


@Component({
  selector:     'app-project-list',
  templateUrl:  './project-list.component.html',
  styleUrls:    ['./project-list.component.css']
})


export class ProjectListComponent implements OnInit {

  // блок инициализации переменных
  selectedProject: Project;
  @Input() projects: Project[];


  constructor(
    // подключаем СЕРВИСЫ к компоненте
    public projectsService: ProjectsService
  ) { }


  ngOnInit() {

    // подписываемся на очистку данных в ПРОЕКТ-листе (СЛУШАЛКА, ТИПА "on" в angularJS)
    this.projectsService.stateClear.subscribe( clearState => {
      if ( clearState ) {
        this.selectedProject = { projectId: null, name: null, logs: null };
      }
    });
  }



  onSelect(project: Project){
    this.projectsService.setFormProject(project);
    this.selectedProject = project;
  }


  // удаление ПРООЕКТА, передаем в сервис ID ПРОЕКТА
  delProject(projectId: string){
    this.projectsService.deleteProject(projectId);
  }


  // при переходе к конкретнному ПРОЕКТУ - запускаем очистку Project-Form
  goToProject(){
    this.projectsService.clearProjectForm();
  }


}
