import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PizzaModel } from './models/pizza.model';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private readonly http = inject(HttpClient);

  pizzasList(): Observable<PizzaModel[]> {
    return this.http.get<PizzaModel[]>("http://localhost:8080/api/products");
  }
  
}
