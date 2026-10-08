import { Component, OnInit } from '@angular/core';
import { SalesPerson } from '../sales-person';

@Component({
  selector: 'app-sales-grid',
  standalone: false,
  styleUrl: './sales-grid.css',
  templateUrl: './sales-grid.html',
})
export class SalesGrid implements OnInit{
ngOnInit(): void {
  
}
salesPersonList :SalesPerson[]= [
 
  new SalesPerson('Ankur', 'Chaudhary', 'ankur.ch@gmail.com', 1000),
  new SalesPerson('Pooja', 'Singh', 'puja.singh@gmail.com', 900),
  new SalesPerson('Dodo', 'Singh', 'dodo.singh@gmail.com', 800),
  new SalesPerson('Sumedh', 'Singh', 'Sumedh.singh@gmail.com', 700)
];
}