import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// Services
import { ProjectsService } from "../../services/projects.service";

// Models
import {Project} from "../../models/Project";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  currentRouteId: string;
  currentProject: Project;

  constructor(
    public projectsServices: ProjectsService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.currentRouteId = this.route.snapshot.params.id;

    this.projectsServices.getProject(this.currentRouteId).subscribe( project => {
      this.currentProject = project;
    }, error => {
      console.log(error);
    });

  }

}
