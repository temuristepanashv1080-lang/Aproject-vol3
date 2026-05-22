import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fogort } from './fogort';

describe('Fogort', () => {
  let component: Fogort;
  let fixture: ComponentFixture<Fogort>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fogort],
    }).compileComponents();

    fixture = TestBed.createComponent(Fogort);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
