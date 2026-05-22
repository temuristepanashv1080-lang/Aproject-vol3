import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Api } from '../services/api';
import { Product } from '../models/product';
import { LucideStar } from '@lucide/angular';
import { FormsModule } from '@angular/forms';
import { Currency } from '../services/currency';

@Component({
  selector: 'app-home',
  imports: [RouterLink, LucideStar, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    public currency: Currency
  ) {}

  products: Product[] = [];
  categories: any[] = [];
  brands: string[] = [];

  currentPage = 1;
  pageSize = 12;
  totalProducts = 0;

  keywords = '';
  selectedCategory = '';
  selectedBrand = '';
  selectedRating = '';
  priceMin = '';
  priceMax = '';
  sortBy = '';
  sortDirection = 'asc';

  isFiltering = false;
  loading = false;

  get totalPages(): number {
    return Math.ceil(this.totalProducts / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  ngOnInit() {
    this.api.getCategories().subscribe({
      next: (resp: any) => {
        this.categories = resp;
        this.cdr.detectChanges();
      },
    });

    this.api.getBrands().subscribe({
      next: (resp: any) => {
        this.brands = resp;
        this.cdr.detectChanges();
      },
    });

    this.route.queryParams.subscribe((params) => {
      if (params['keywords']) {
        this.keywords = params['keywords'];
        this.isFiltering = true;
        this.currentPage = 1;
        this.search();
      } else {
        this.loadProducts();
      }
    });
  }

  loadProducts() {
    this.loading = true;
    if (this.isFiltering) {
      this.search();
      return;
    }
    this.api
      .getProducts(`products/all?page_index=${this.currentPage}&page_size=${this.pageSize}`)
      .subscribe({
        next: (resp: any) => {
          this.products = resp.products;
          this.totalProducts = resp.total;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (er) => {
          alert(er.message);
          this.loading = false;
        },
      });
  }

  applyFilters() {
    this.isFiltering = true;
    this.currentPage = 1;
    this.search();
  }

  search() {
    this.loading = true;
    const params: any = {
      page_index: this.currentPage,
      page_size: this.pageSize,
    };
    if (this.keywords) params.keywords = this.keywords;
    if (this.selectedCategory) params.category_id = this.selectedCategory;
    if (this.selectedBrand) params.brand = this.selectedBrand;
    if (this.selectedRating) params.rating = this.selectedRating;
    if (this.priceMin) params.price_min = this.priceMin;
    if (this.priceMax) params.price_max = this.priceMax;
    if (this.sortBy) params.sort_by = this.sortBy;
    if (this.sortDirection) params.sort_direction = this.sortDirection;

    this.api.searchProducts(params).subscribe({
      next: (resp: any) => {
        this.products = resp.products;
        this.totalProducts = resp.total;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (er) => {
        alert(er.message);
        this.loading = false;
      },
    });
  }

  clearFilters() {
    this.keywords = '';
    this.selectedCategory = '';
    this.selectedBrand = '';
    this.selectedRating = '';
    this.priceMin = '';
    this.priceMax = '';
    this.sortBy = '';
    this.sortDirection = 'asc';
    this.isFiltering = false;
    this.currentPage = 1;
    this.loadProducts();
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadProducts();
  }

  roundCeil(num: number) {
    return Math.round(num);
  }
}