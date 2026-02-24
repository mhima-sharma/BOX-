import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(products: any[], category: string): any[] {
    if (!products || !category) return [];
    return products.filter(p => p.category === category);
  }

}