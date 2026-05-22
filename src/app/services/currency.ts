import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Currency {
  private readonly GEL_RATE = 2.73;

  current = signal<'USD' | 'GEL'>('USD');

  setCurrency(cur: 'USD' | 'GEL') {
    this.current.set(cur);
  }

  convert(usdPrice: number): number {
    if (this.current() === 'GEL') {
      return Math.round(usdPrice * this.GEL_RATE * 100) / 100;
    }
    return usdPrice;
  }

  symbol(): string {
    return this.current() === 'GEL' ? '₾' : '$';
  }
}