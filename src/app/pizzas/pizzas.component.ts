import { Component, signal } from '@angular/core';
import { PizzaModel } from '../models/pizza.model';

@Component({
  selector: 'app-pizzas',
  standalone: true,
  imports: [],
  templateUrl: './pizzas.component.html',
  styleUrl: './pizzas.component.scss'
})
export class PizzasComponent {
 
  readonly pizzas = signal<PizzaModel[]>([
    {
      id: 1,
      name: "Fromage",
      description: "Sauce tomate (tomates 100% Italiennes), Mozzarella, Emmental fondu",
      price: 5,
      category: "Kiosquitos",
      vegetarian: true
    },
    {
      id: 2,
      name: "Jambon",
      description: "Sauce tomate (tomates 100% Italiennes), Jambon supérieur",
      price: 5,
      category: "Kiosquitos",
      vegetarian: false
    }
  ]);
  
}
