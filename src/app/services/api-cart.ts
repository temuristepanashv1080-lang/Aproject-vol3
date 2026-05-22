import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiCart {
  private baseUrl = 'https://api.everrest.educata.dev/shop/cart';

  constructor(private http: HttpClient) {}

  private get headers() {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    };
  }

  getCart() {
    return this.http.get(this.baseUrl, this.headers);
  }

  createCart(id: string, quantity: number) {
    return this.http.post(
      `${this.baseUrl}/product`,
      { id, quantity },
      this.headers
    );
  }

  updateCart(id: string, quantity: number) {
    return this.http.patch(
      `${this.baseUrl}/product`,
      { id, quantity },
      this.headers
    );
  }

  deleteItem(id: string) {
    return this.http.delete(`${this.baseUrl}/product`, {
      ...this.headers,
      body: { id },
    });
  }

  clearCart() {
    return this.http.delete(this.baseUrl, this.headers);
  }

  checkout() {
    return this.http.post(`${this.baseUrl}/checkout`, {}, this.headers);
  }
}