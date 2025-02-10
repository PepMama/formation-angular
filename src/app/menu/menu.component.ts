import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  readonly navbarCollapsed = signal(true);
  toggleNavbar(){
    this.navbarCollapsed.update(isCollapsed  => !isCollapsed);
  }
}
