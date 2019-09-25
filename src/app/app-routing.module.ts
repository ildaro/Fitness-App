import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: 'meal', loadChildren: './meal/meal.module#MealPageModule' },
  { path: 'edit-meal/:id', loadChildren: './meal/edit-meal/edit-meal.module#EditMealPageModule' },
  { path: 'exercise', loadChildren: './exercise/exercise.module#ExercisePageModule' },
  { path: 'edit-exercise/:id', loadChildren: './exercise/edit-exercise/edit-exercise.module#EditExercisePageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'stopwatch', loadChildren: './stopwatch/stopwatch.module#StopwatchPageModule' },
  { path: 'map', loadChildren: './map/map.module#MapPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
