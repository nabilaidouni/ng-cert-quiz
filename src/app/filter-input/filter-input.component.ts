import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {combineLatest, map, Observable} from 'rxjs';
import {Nameable} from '../model/data.models';

@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.css']
})
export class FilterInputComponent<T extends Nameable> implements OnInit {
  @Input()
  placeholder: string = 'Select item';
  @Input()
  items$: Observable<T[]>;
  @Input()
  set selection(item: T) {
      this.itemControl.setValue(item?.name ?? '');
  }

  @Output()
  selectionChange: EventEmitter<T> = new EventEmitter<T>();

  itemControl: FormControl<string> = new FormControl<string>('');

  filteredItems$: Observable<T[]>;

  ngOnInit() {
    this.filteredItems$ = combineLatest([this.itemControl.valueChanges, this.items$]).pipe(
      map(([input, items]) => items.filter(item => item.name?.toLowerCase().indexOf(input.toLowerCase()) !== -1))
    );
  }

  select(item: T) {
    this.itemControl.setValue(item.name);
    this.selectionChange.emit(item);
  }

  identify(index: number, item: T) {
    return item.name;
  }
}
