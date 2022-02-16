import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/cards';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card: Card | undefined
  state = 'faced-down'
}
