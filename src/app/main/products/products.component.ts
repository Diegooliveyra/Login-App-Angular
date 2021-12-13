import { MainService } from './../../services/main.service';
import { Product } from './../../models/product';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$!: Observable<Product[]>

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.products$ = this.mainService.getProducts()
  }

}
