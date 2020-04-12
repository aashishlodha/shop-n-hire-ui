import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Product } from '../models/product.model';
import { delay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  private products: Product[];
  private category = 'default';

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params);

      this.category = params.cat ? params.cat : 'default';
      console.log(this.category);

      this.getProducts();
    });
  }

  getProducts() {
    this.dataService.getProducts().pipe(delay(700)).toPromise().then(
      (data) => {
        if (this.category !== 'default') {
          data = data.filter(product => {
            return product.category === this.category;
          });
        }
        this.products = data;
      }, (err) => {
        console.error(err);
      }
    );
  }

}
