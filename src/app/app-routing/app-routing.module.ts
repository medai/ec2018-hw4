import { NgModule } from '@angular/core';

import { RouterModule, Routes } from "@angular/router";

// Component
import { HomeComponent } from "../components/home/home.component";
import { ProjectComponent } from "../components/project/project.component";
import { AboutComponent } from "../components/about/about.component";
import { NotFoundComponent } from "../components/not-found/not-found.component";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'project/:id', component: ProjectComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  exports: [ RouterModule ],
  imports: [
    RouterModule.forRoot(routes)
  ],
})
export class AppRoutingModule { }
