import { Component, inject, signal } from '@angular/core';
import { PizzaComponent } from "../pizza/pizza.component";
import { PizzaService } from './../pizza.service';
import { PizzaModel } from '../models/pizza.model';

@Component({
  selector: 'app-pizzas',
  standalone: true,
  imports: [PizzaComponent],
  templateUrl: './pizzas.component.html',
  styleUrl: './pizzas.component.scss'
})
export class PizzasComponent {
  private readonly PizzaService = inject(PizzaService);
  readonly pizzas = signal<PizzaModel[]>(this.PizzaService.pizzasList());
}
