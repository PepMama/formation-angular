import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { PizzaModel } from './models/pizza.model';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  pizzasList(): Observable<PizzaModel[]> {
    return of([
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
    ]).pipe(delay(2000));
  }
}
