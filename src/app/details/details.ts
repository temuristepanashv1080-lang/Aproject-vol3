import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../models/product';
import { Api } from '../services/api';
import { ApiCart } from '../services/api-cart';
import { Currency } from '../services/currency';

@Component({
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private api: Api,
    private apiCart: ApiCart,
    public currency: Currency
  ) {
    this.route.queryParams.subscribe((data) => {
      this.selectedId = data['id'];
    });
  }

  selectedId: string = '';
  product: Product = new Product();
  selectedImage = 0;
  addingToCart = false;

  ngOnInit() {
    this.api.getProducts(`products/id/${this.selectedId}`).subscribe({
      next: (resp: any) => {
        this.product = resp;
        this.cdr.detectChanges();
      },
    });
  }

  roundCeil(num: number) {
    return Math.round(num);
  }

  addToCart() {
    if (!this.product._id) {
      alert('Product not loaded yet, please wait.');
      return;
    }

    this.addingToCart = true;

    this.apiCart.getCart().subscribe({
      next: () => {
        this.apiCart.updateCart(this.product._id, 1).subscribe({
          next: () => {
            this.addingToCart = false;
            alert('Added to cart!');
            this.cdr.detectChanges();
          },
          error: (er) => {
            this.addingToCart = false;
            alert(er.error?.error || er.message);
            this.cdr.detectChanges();
          },
        });
      },
      error: () => {
        this.apiCart.createCart(this.product._id, 1).subscribe({
          next: () => {
            this.addingToCart = false;
            alert('Added to cart!');
            this.cdr.detectChanges();
          },
          error: (er) => {
            this.addingToCart = false;
            alert(er.error?.error || er.message);
            this.cdr.detectChanges();
          },
        });
      },
    });
  }
}