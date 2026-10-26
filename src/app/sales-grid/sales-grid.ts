import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { HttpService } from '../shared/http-service';
import { Observable } from 'rxjs';
import { catchError, map, of, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Pageable } from '../Pageable';

@Component({
  selector: 'app-sales-grid',
  standalone: false,
  styleUrl: './sales-grid.css',
  templateUrl: './sales-grid.html',
})
export class SalesGrid implements OnInit {
  constructor(private httpService: HttpService, private activeRoute: ActivatedRoute) { }
  products: Observable<Product[]> = new Observable<Product[]>();
  loadError = false;
  saveError = false;
  editingProductId: number | string | null = null;
  editProduct: Product | null = null;
  savingProductId: number | string | null = null;
  categoryId: number = 0;
  ngOnInit(): void {
    this.products = this.activeRoute.paramMap.pipe(
      switchMap(params => {
        this.categoryId = params.has('id') ? Number(params.get('id')) : 0;
        const url = this.categoryId === 0
          ? '/api/v1/products'
          : `/api/v1/products/category/${this.categoryId}?page=1&size=10`;
        this.loadError = false;
        return this.httpService.get<Pageable>(url).pipe(
          map(pageable => pageable.items),
          catchError(() => {
            this.loadError = true;
            return of([]);
          }),
        );
      }),
    );
  }

  addToCart(product: Product) : void {
    //add to cart logic here
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
      //email: draft.email,
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