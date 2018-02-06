import { Component, OnInit } from '@angular/core';


// Service
import { ProjectsService } from "../../../services/projects.service";
import { UuidService } from "../../../services/uuid.service";


// Models
import { Log } from "../../../models/Log";


@Component({
  selector:     'app-project-form',
  templateUrl:  './project-form.component.html',
  styleUrls:    ['./project-form.component.css']
})


export class ProjectFormComponent implements OnInit {

  // блок инициализации переменных
  projectName:  string;
  id:           string;
  logs:         Log[];
  isNew:        boolean = true;


  constructor(
    // подключаем СЕРВИСЫ к компоненте
    public projectsService: ProjectsService,
    public uuid:            UuidService
  ) { }


  ngOnInit() {

    // подписываемся на выбор ПРОЕКТА в ПРОЕКТ-листе (СЛУШАЛКА, ТИПА "on" в angularJS)
    this.projectsService.selectProject.subscribe( project => {
      if ( project.projectId !== null ){   // выделили конкретный ПРОЕКТ
        this.isNew        = false;
        this.projectName  = project.name;
        this.id           = project.projectId;
        this.logs         = project.logs;
      } else {                            // выделенный ПРОЕКТ был удален
        this.isNew        = true;
        this.projectName  = '';
        this.id           = '';
        this.logs         = null;
      }
    });
  }

  // создание или редактирование ПРОЕКТА
  onSubmit() {
    if ( this.isNew ) {                           // создаем новый ПРОЕКТ
      this.projectsService.addProject({
        projectId:  this.uuid.generate(),
        name:       this.projectName,
        logs:       []
      });
    } else {                                        // редактируем ПРОЕКТ
      this.projectsService.updateProject({
        projectId:  this.id,
        name:       this.projectName,
        logs:       this.logs
      });

    }

    this.clearState();

  }


  // функция очистки ФОРМЫ
  clearState() {
    this.isNew        = true;
    this.projectName  = '';

    this.projectsService.clearState();
  }



}
