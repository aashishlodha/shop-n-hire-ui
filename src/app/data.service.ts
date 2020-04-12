import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './models/category.model';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private appData;

  constructor(private http: HttpClient) {
    this.http.get('./assets/data/data.json').subscribe(
      (data) => {
        this.appData = data;
        console.log('DATA', this.appData);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getCategories() {
    return this.http.get<Category[]>('./assets/data/categories.json');
  }

  getProducts() {
    return this.http.get<Product[]>('./assets/data/products.json');
  }

}
