import { Component, inject } from '@angular/core';
import { PizzaComponent } from "../pizza/pizza.component";
import { PizzaService } from './../pizza.service';

@Component({
  selector: 'app-pizzas',
  standalone: true,
  imports: [PizzaComponent],
  templateUrl: './pizzas.component.html',
  styleUrl: './pizzas.component.scss'
})
export class PizzasComponent {
  private readonly PizzaService = inject(PizzaService);
  // readonly pizzas = signal<PizzaModel[]>(this.PizzaService.pizzasList());

  pizzas$ = this.PizzaService.pizzasList();
  constructor(){
    // this.pizzas$.subscribe(pizzas => {
    //   console.log(pizzas);
    // });
    this.pizzas$.subscribe({
      next: (toto) => console.log("TOut va bien"),
      error: () => console.log("Tout va bien"),
      complete: () => console.log("c'est fini") // ici on peut l'utiliser pour un loader, par exemple quand l'observable est terminée, on enlève le loader
    })
  }
}
