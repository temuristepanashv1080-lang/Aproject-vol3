import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiCart } from '../services/api-cart';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit {
  constructor(
    private apiCart: ApiCart,
    private api: Api,
    private cdr: ChangeDetectorRef
  ) {}

  cart: any = null;
  loading = true;
  checkedOut = false;
  orderHistory: any[] = [];
  productDetails: { [id: string]: any } = {};

  ngOnInit() {
    this.loadCart();
    this.loadOrderHistory();
  }

  loadCart() {
    this.loading = true;
    this.apiCart.getCart().subscribe({
      next: (resp: any) => {
        this.cart = resp;
        this.loading = false;
        this.fetchProductDetails();
        this.cdr.detectChanges();
      },
      error: () => {
        this.cart = null;
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  fetchProductDetails() {
    if (!this.cart?.products) return;
    for (const item of this.cart.products) {
      this.api.getProducts(`products/id/${item.productId}`).subscribe({
        next: (resp: any) => {
          this.productDetails[item.productId] = resp;
          this.cdr.detectChanges();
        },
      });
    }
  }

  loadOrderHistory() {
    const saved = localStorage.getItem('order_history');
    this.orderHistory = saved ? JSON.parse(saved) : [];
  }

  saveOrderToHistory() {
    const order = {
      date: new Date().toLocaleString(),
      products: this.cart.products,
      total: this.cart.total,
    };
    this.orderHistory.push(order);
    localStorage.setItem('order_history', JSON.stringify(this.orderHistory));
  }

  changeQuantity(productId: string, quantity: number) {
    if (quantity < 1) return;
    this.apiCart.updateCart(productId, quantity).subscribe({
      next: (resp: any) => {
        this.cart = resp;
        this.cdr.detectChanges();
      },
      error: (er) => alert(er.message),
    });
  }

  removeItem(productId: string) {
    this.apiCart.deleteItem(productId).subscribe({
      next: (resp: any) => {
        this.cart = resp;
        this.cdr.detectChanges();
      },
      error: (er) => alert(er.message),
    });
  }

  clearCart() {
    this.apiCart.clearCart().subscribe({
      next: () => {
        this.cart = null;
        this.cdr.detectChanges();
      },
      error: (er) => alert(er.message),
    });
  }

  checkout() {
    this.saveOrderToHistory();
    this.apiCart.checkout().subscribe({
      next: (resp: any) => {
        this.api.n8nCheckout(this.cart).subscribe(resp => console.log(resp))
        alert(resp.message);
        this.cart = null;
        this.checkedOut = true;
        this.cdr.detectChanges();
      },
      error: (er) => alert(er.message),
    });
  }
}