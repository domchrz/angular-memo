import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CARDS } from './constants/cards';
import { Card } from './models/cards';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('flip', [
      state('faced-up', style({
        transform: 'rotateX(180deg)'
      })),
      state('faced-down', style({
        transform: 'rotateX(0)'
      })),
      transition('faced-up <=> faced-down', animate(700))
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'angular-memo';
  cards: Card[] = []

  ngOnInit() {
    CARDS.forEach(card => {
      this.cards.push({...card})
      this.cards.push({...card})
    })
    this.cards.sort((a, b) => .5 - Math.random())
  }

  flip(card: Card) {
    card.isFlipped = !card.isFlipped
    console.log(card);
  }

  clg() {
    console.log('start')
  }
}
