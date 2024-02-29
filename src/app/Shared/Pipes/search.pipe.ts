import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../Interfaces/product';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: Product[], searchKey: string): Product[] {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchKey.toLowerCase())
    );
  }
}
