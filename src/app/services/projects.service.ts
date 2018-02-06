import { Injectable } from '@angular/core';
import { of } from "rxjs/observable/of";
import { BehaviorSubject } from "rxjs/BehaviorSubject";


// Services
import { AlertInformService } from "./alert-inform.service";


// Models
import { Log } from "../models/Log";
import { Project } from "../models/Project";
import {Observable} from "rxjs/Observable";
import {current} from "codelyzer/util/syntaxKind";

@Injectable()
export class ProjectsService {

  // создаем переменные для сервиса
  projects:         Project[];
  selectedProject:  Project;
  // временные обьекты для хранения проекта и лога
  tempLog:          Log = { id: null, text: null, date: null };
  tempProject:      Project = { projectId: null, name: null, logs: null };


  // ПРИВАТНЫЕ МЕТОДЫ СЕРВИСА

  private logSource = new BehaviorSubject<Log>({ id: null, text: null, date: null });     // этим вызываем создание нового обьекта, за которым следят
  selectedLog = this.logSource.asObservable();                                                   // а это сам обьект за которым следят в разных компонентах


  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();


  private projectSource = new BehaviorSubject<Project>({ projectId: null, name: null, logs: null });
  selectProject = this.projectSource.asObservable();




  constructor(
    // подключаем СЕРВИСЫ к сервису
    public AlertService: AlertInformService
  ) {
    this.projects = JSON.parse(localStorage.getItem('projects')) || [];

  }



  getAllProjects(): Observable<Project[]> {
    return of(this.projects);
  }



  getProject(id) {

    this.projects.forEach( (current, i) => {
      if ( current.projectId === id ) {
        this.selectedProject = current;
      }
    });

    return of(this.selectedProject);

  }



  addProject(project) {
    this.projects.unshift(project);
    this.AlertService.setAlertObject({type: "add", text: "New project \""+project.name+"\" created successfully."});

    // Add to localstorage
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }



  addLog(log: Log, projectId) {

    this.projects.forEach( project => {
      if ( project.projectId === projectId ) {
        project.logs.unshift(log);
      }
    });

    this.AlertService.setAlertObject({type: "add", text: "New log \""+log.text+"\" created successfully."});

    // Add to localstorage
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }



  updateLog(log: Log, projectId) {

    this.projects.forEach( project => {
      // search project by projectId
      if ( project.projectId === projectId ) {
        project.logs.forEach( (value, i) => {
          // search log by log.id
          if ( value.id === log.id ) {
            // delete old log
            project.logs.splice(i, 1);
          }
        } );

        // add updated log
        project.logs.unshift(log);

      }

    } );

    this.AlertService.setAlertObject({type: "update", text: "Log \""+log.text+"\" changed successfully."});

    // Add to localstorage
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }



  updateProject(editProject) {
    console.log("editProject = ", editProject);
    console.log("this.projects = ", this.projects);

    this.projects.forEach( (project, j) => {
      // search project by projectId
      if ( project.projectId === editProject.projectId ) {
        this.projects.splice(j, 1);

        console.log("project = ", project);


        // add updated project
        this.projects.unshift(editProject);

      }

    } );

    this.AlertService.setAlertObject({type: "update", text: "Project  \""+editProject.name+"\"  changed successfully."});

    // Add to localstorage
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }




  clearState() {
    this.stateSource.next(true);
    this.logSource.next({ id: null, text: null, date: null });
  }


  // прокидываем выделенный ЛОГ в ЛОГ-ФОРМУ
  setFormLog(log: Log) {
    this.tempLog = log; // сохраняем выделенный ЛОГ во временном обьекте
    this.logSource.next(log);
  }

  // удаление ЛОГА с массива и с ЛОКАЛСТОРАДЖ
  deleteLog(logForDel: Log, projectId) {
    // ищем ЛОГ в массиве проектов и удаляем его
    this.projects.forEach( project => {
      if ( project.projectId === projectId ) {
        project.logs.forEach( (value, i) => {
          if ( value.id === logForDel.id ) {
            project.logs.splice(i, 1);
          }
        } );
      }
    });
    // если ЛОГ для удаления совпадаем с выделенным ЛОГОМ - делаем новый logSource пустым дабы его поймали в ЛОГ-ФОРМЕ для очистки
    (logForDel.id === this.tempLog.id)? this.logSource.next({ id: null, text: null, date: null }) : '';

    this.AlertService.setAlertObject({type: "delete", text: "Log \""+logForDel.text+"\"  was successfully deleted."});

    // обновляем массив проектов в ЛОКАЛСТОРАДЖ
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }



  // прокидываем выделенный ПРОЕКТ в Project-Form
  setFormProject(project: Project) {
    this.tempProject = project; // сохраняем выделенный ПРОЕКТ во временном обьекте
    this.projectSource.next(project);
  }


  // удаление ПРОЕКТА с массива и с ЛОКАЛСТОРАДЖ
  deleteProject(projectId) {
    // ищем ПРОЕКТ в массиве проектов и удаляем его
    this.projects.forEach( (project, j) => {
      if ( project.projectId === projectId ) {
        this.projects.splice(j, 1);
      }
    });
    // если ПРОЕКТ для удаления совпадаем с выделенным ПРОЕКТОМ - делаем новый projectSource пустым дабы его поймали в Project-Form для очистки
    (projectId === this.tempProject.projectId)? this.projectSource.next({ projectId: null, name: null, logs: null }) : '';

    this.AlertService.setAlertObject({type: "delete", text: "Project id = \""+projectId+"\"   was successfully deleted."});

    // обновляем массив проектов в ЛОКАЛСТОРАДЖ
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }


  // функция для прокидывания пустого обьекта в компонент Project-Form, для обнуления обьекта для показа
  clearProjectForm() {
    this.projectSource.next({ projectId: null, name: null, logs: null });
  }


}









