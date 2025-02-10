import { Injectable } from '@angular/core';
import { PizzaModel } from './models/pizza.model';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  pizzasList(): PizzaModel[] {
    return [
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
    ]
  }
  
}
