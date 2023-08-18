import { Injectable } from '@angular/core';
import { ArrayNameable, NameableAndIdentifiable } from '../model/data.models';

@Injectable({
  providedIn: 'root'
})
export class ItemService<T extends ArrayNameable,  U extends NameableAndIdentifiable> {

  private readonly SEPARATOR: string = ':';

  public toItems(subItems: U[]): T[] {
    let items: T[] = [];

    subItems.forEach((subItem: U) => {
      let leftStr: string = subItem.name.split(this.SEPARATOR, 2)[0]?.trim();
      let rightStr: string = subItem.name.split(this.SEPARATOR,2)[1]?.trim();
      let index: number = items.map((item: T) => item.name).indexOf(leftStr);

      if (index === -1) {
        items.push(
            this.buildItem(leftStr, [this.buildSubItem(subItem.id, rightStr)])
        );
      } else if (index !== -1 && items[index].subItems.map((sub: U) => sub.id).indexOf(subItem.id) === -1) {
        items[index].subItems.push(this.buildSubItem(subItem.id, rightStr));
      }
    });
    return items;
  }

  private buildItem(name, subItems): T {
    return {
      name: name,
      subItems: subItems
    } as T
  }

  private buildSubItem(id, name): U {
    return {
      id: id,
      name: name
    } as U
  }
}
