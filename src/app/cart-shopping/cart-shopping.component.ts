import { Component, ElementRef, inject, Renderer2, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-cart-shopping',
  standalone: true,
  imports: [],
  templateUrl: './cart-shopping.component.html',
  styleUrl: './cart-shopping.component.scss'
})
export class CartShoppingComponent {
  private readonly renderer = inject(Renderer2);
  readonly cartModal = viewChild.required<ElementRef>('cartModal');
  readonly modalBackdrop = viewChild.required<ElementRef>('modalBackdrop');
  readonly isModalOpen = signal(false);

  openModal(): void {
    this.renderer.setStyle(document.body, "overflow", "hidden");
    this.cartModal().nativeElement.style.display = "block";
    this.modalBackdrop().nativeElement.style.display = "block";
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    setTimeout(() => {
      this.renderer.removeStyle(document.body, "overflow");
      this.cartModal().nativeElement.style.display = "none";
      this.modalBackdrop().nativeElement.style.display = "none";
    }, 150);
  }
}
