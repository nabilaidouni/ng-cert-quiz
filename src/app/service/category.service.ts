import { Injectable } from '@angular/core';
import {Category, SubCategory} from '../model/data.models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  toCategories(subCategories: SubCategory[]): Category[] {
    let categories: Category[] = [];

    subCategories.forEach(subCategory => {
      let index = categories.map(category => category.name).indexOf(subCategory.name.split(':')[0]);
      if (index === -1) {
        categories.push({
          name: subCategory.name.split(':')[0],
          subCategories: [
            {
              id: subCategory.id,
              name: subCategory.name.split(':')[1]
            } as SubCategory
          ]
        } as Category)
      } else if (index !== -1 && categories[index].subCategories.map(sub => sub.id).indexOf(subCategory.id) === -1) {
        categories[index].subCategories.push({
          id: subCategory.id,
          name: subCategory.name.split(':')[1]
        } as SubCategory);
      }
    });
    return categories;
  }
}
