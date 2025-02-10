import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartShoppingComponent } from "../cart-shopping/cart-shopping.component";
import { PizzaComponent } from "../pizza/pizza.component";
import { PizzaService } from './../pizza.service';

@Component({
  selector: 'app-pizzas',
  standalone: true,
  imports: [PizzaComponent, CartShoppingComponent],
  templateUrl: './pizzas.component.html',
  styleUrl: './pizzas.component.scss'
})
export class PizzasComponent {
  private readonly PizzaService = inject(PizzaService);
  // readonly pizzas = signal<PizzaModel[]>(this.PizzaService.pizzasList());

  readonly pizzas = toSignal(this.PizzaService.pizzasList());

  // pour savoir quand la pizza sera disponible
  constructor(){
    effect(() => console.log(this.pizzas()))
  }

}
