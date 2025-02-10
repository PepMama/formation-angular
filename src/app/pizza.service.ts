import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { PizzaModel } from './models/pizza.model';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private readonly http = inject(HttpClient);

  pizzasList(): Observable<PizzaModel[]> {
    return this.http.get<PizzaModel[]>(`${environment.apiURL}/products`);
  }
}
