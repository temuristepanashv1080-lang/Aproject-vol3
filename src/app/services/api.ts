import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(private http: HttpClient) {}

  private baseUrl = 'https://api.everrest.educata.dev/shop/';

  getProducts(url: string) {
    return this.http.get(this.baseUrl + url);
  }

  getCategories() {
    return this.http.get(this.baseUrl + 'products/categories');
  }

  getBrands() {
    return this.http.get(this.baseUrl + 'products/brands');
  }

  searchProducts(params: any) {
    const query = new URLSearchParams();
    query.set('page_index', params.page_index || 1);
    query.set('page_size', params.page_size || 12);
    if (params.keywords) query.set('keywords', params.keywords);
    if (params.category_id) query.set('category_id', params.category_id);
    if (params.brand) query.set('brand', params.brand);
    if (params.rating) query.set('rating', params.rating);
    if (params.price_min) query.set('price_min', params.price_min);
    if (params.price_max) query.set('price_max', params.price_max);
    if (params.sort_by) query.set('sort_by', params.sort_by);
    if (params.sort_direction) query.set('sort_direction', params.sort_direction);
    return this.http.get(`${this.baseUrl}products/search?${query.toString()}`);
  }

  n8nCheckout(data: any){
    return this.http.post(`https://temuristepanashvili19.app.n8n.cloud/webhook-test/Checkout`, data)
  
  }

}