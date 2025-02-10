import { Routes } from '@angular/router';
import { PizzasComponent } from './pizzas/pizzas.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'pizzas', component: PizzasComponent }
];
