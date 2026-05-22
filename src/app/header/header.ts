import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { Currency } from '../services/currency';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(public auth: Auth, public currency: Currency, private router: Router) {}

  searchQuery = '';
  currencyMenuOpen = false;

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/home'], {
        queryParams: { keywords: this.searchQuery.trim() }
      });
      this.searchQuery = '';
    }
  }

  toggleTheme() {
    document.body.classList.toggle('light-theme');
  }

  toggleCurrencyMenu() {
    this.currencyMenuOpen = !this.currencyMenuOpen;
  }

  setCurrency(cur: 'USD' | 'GEL') {
    this.currency.setCurrency(cur);
    this.currencyMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: Event) {
    const target = e.target as HTMLElement;
    if (!target.closest('.currency-wrap')) {
      this.currencyMenuOpen = false;
    }
  }
}