import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HeroesComponent } from './pages/heroes/heroes.component';

const routes: Routes = [
  {path: 'horoes', component: HeroesComponent},
  {path: 'heroe/:id', component: HeroeComponent},
  {path: '**',pathMatch: 'full' , redirectTo: 'horoes'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
