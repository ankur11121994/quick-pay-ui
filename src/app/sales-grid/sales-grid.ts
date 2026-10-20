import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { HttpService } from '../shared/http-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Component({
  selector: 'app-sales-grid',
  standalone: false,
  styleUrl: './sales-grid.css',
  templateUrl: './sales-grid.html',
})
export class SalesGrid implements OnInit {
  constructor(private httpService: HttpService) { }
  products: Observable<Product[]> = new Observable<Product[]>();
  loadError = false;
  saveError = false;
  editingProductId: number | string | null = null;
  editProduct: Product | null = null;
  savingProductId: number | string | null = null;

  ngOnInit(): void {
    this.httpService.get<Product[]>('/api/v1/products').pipe(data => {
      return this.products = data;
    }, () => {
      this.loadError = true;
      return this.products;
    })
  }

  startEditing(product: Product): void {
    if (product.id === undefined) {
      return;
    }

    this.editingProductId = product.id;
    this.editProduct = { ...product };
    this.saveError = false;
  }

  cancelEditing(): void {
    this.editingProductId = null;
    this.editProduct = null;
    this.saveError = false;
  }

  saveProduct(): void {
    const draft = this.editProduct;
    if (draft?.id === undefined) {
      return;
    }

    const id = draft.id;
    const changes = {
      productName: draft.productName,
      productDescription: draft.productDescription,
      email: draft.email,
      productPrice: draft.productPrice,
    };

    this.savingProductId = id;
    this.saveError = false;
    this.httpService.patch<unknown>(`/api/v1/products/${encodeURIComponent(String(id))}`, changes).subscribe({
      next: () => {
        this.products = this.products.pipe(map(products => products.map(product => product.id === id ? { ...product, ...changes } : product)));
        this.cancelEditing();
        this.savingProductId = null;
      },
      error: () => {
        this.saveError = true;
        this.savingProductId = null;
      },
    });
  }

}