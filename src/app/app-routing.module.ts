import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {   path: '',
        children: [
            { path: 'movies/page/:id', component: HomePageComponent },
            { path: '', component: HomePageComponent },] 
  },
  {
    path: 'movies/page/:id/movie/:id',
    component: MoviePageComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
