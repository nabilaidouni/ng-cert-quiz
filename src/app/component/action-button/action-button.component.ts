import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {Action} from '../../model/data.models';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css']
})
export class ActionButtonComponent {
  @Output() trigger: EventEmitter<void> = new EventEmitter<void>();

  @HostListener('click')
  act() {
    this.trigger.emit();
  }
}
