import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  readonly navbarCollapsed = signal(true);
  toggleNavbar(){
    this.navbarCollapsed.update(isCollapsed  => !isCollapsed);
  }
}
