import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Brand} from 'src/app/Shared/Interfaces/product';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { EcomdataService } from 'src/app/Shared/Services/ecomdata.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {
  brands: Brand[] = [];
  brandsSubscribe: Subscription = new Subscription();

  constructor(
    private _ecomdataService: EcomdataService,
  ) {}

  ngOnInit(): void {
    this.brandsSubscribe = this._ecomdataService.getBrands().subscribe({
      next: ({ data }) => {
        this.brands = data;
        // console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.brandsSubscribe.unsubscribe();
  }

}
