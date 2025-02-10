import { Component, input } from '@angular/core';
import { PizzaModel } from '../models/pizza.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-pizza',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './pizza.component.html',
  styleUrl: './pizza.component.scss'
})
export class PizzaComponent {
  readonly pizza = input.required<PizzaModel>();
}
