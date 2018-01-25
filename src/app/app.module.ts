import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from "@angular/http";

import { NewsService } from './news.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material';

import { AppComponent } from './app.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importing components
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CreateComponent } from './create/create.component';

// Import filter
import { FilterPipe } from './filter.pipe';
import {TimeAgoPipe} from 'time-ago-pipe';

// Auto-complete
import { Ng2CompleterModule } from "ng2-completer";
import { CategoryComponent } from './category/category.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'create', component: CreateComponent },
  { path: 'about', component: AboutComponent },
  { path: 'category_management', component: CategoryComponent },
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    CreateComponent,
    FilterPipe,
    TimeAgoPipe,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    Ng2CompleterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [NewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
