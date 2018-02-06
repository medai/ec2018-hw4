import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

// App components
import { AppComponent }         from './app.component';
import { HomeComponent }        from './components/home/home.component';
import { ProjectComponent }     from './components/project/project.component';
import { AboutComponent }       from './components/about/about.component';
import { NotFoundComponent }    from './components/not-found/not-found.component';
import { NavbarComponent }      from './components/navbar/navbar.component';
import { ProjectFormComponent } from './components/home/project-form/project-form.component';
import { ProjectListComponent } from './components/home/project-list/project-list.component';
import { LogsListComponent }    from './components/project/logs-list/logs-list.component';
import { LogFormComponent }     from './components/project/log-form/log-form.component';
import { AlertInformComponent } from './components/alert-inform/alert-inform.component';

// App routing
import { AppRoutingModule } from './app-routing/app-routing.module';

// Services
import { ProjectsService }  from "./services/projects.service";
import { UuidService }      from "./services/uuid.service";
import { AlertInformService } from "./services/alert-inform.service";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectComponent,
    AboutComponent,
    NotFoundComponent,
    NavbarComponent,
    ProjectFormComponent,
    ProjectListComponent,
    LogsListComponent,
    LogFormComponent,
    AlertInformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ProjectsService, UuidService, AlertInformService],
  bootstrap: [AppComponent]
})
export class AppModule { }
