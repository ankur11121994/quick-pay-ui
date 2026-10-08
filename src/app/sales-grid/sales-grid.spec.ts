import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesGrid } from './sales-grid';

describe('SalesGrid', () => {
  let component: SalesGrid;
  let fixture: ComponentFixture<SalesGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
