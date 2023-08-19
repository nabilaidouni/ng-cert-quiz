import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {Action} from '../../model/data.models';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css']
})
export class ActionButtonComponent {

  @Input()
  action: Action;

  @Output() trigger: EventEmitter<Action> = new EventEmitter<Action>();

  @HostListener('click')
  act() {
    this.trigger.emit(this.action);
  }
}
