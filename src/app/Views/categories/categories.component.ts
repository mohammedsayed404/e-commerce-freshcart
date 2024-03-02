import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/Shared/Interfaces/product';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { EcomdataService } from 'src/app/Shared/Services/ecomdata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  categorysubscribe: Subscription = new Subscription();

  constructor(
    private _ecomdataService: EcomdataService,

  ) {}

  ngOnInit(): void {
    this.categorysubscribe = this._ecomdataService.getCategories().subscribe({
      next: ({ data }) => {
        this.categories = data;
        // console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.categorysubscribe.unsubscribe();
  }
}
