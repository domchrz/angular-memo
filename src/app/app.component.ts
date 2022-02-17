import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CARDS } from './constants/cards';
import { Card } from './models/cards';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('flip', [
      state(
        'faced-up',
        style({
          transform: 'rotateX(180deg)',
        })
      ),
      state(
        'faced-down',
        style({
          transform: 'rotateX(0)',
        })
      ),
      transition('faced-up <=> faced-down', animate(700)),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = 'angular-memo';
  cards: Card[] = [];
  flippedCards: Card[] = [];
  length: number = 0;
  hasLoaded = false;
  score: number = 0;
  movesMade: number = 0;

  ngOnInit() {
    CARDS.forEach((card) => {
      this.cards.push({ ...card }, { ...card });
    });
    this.cards.sort((a, b) => 0.5 - Math.random());
    setTimeout(() => {
      this.hasLoaded = true;
    }, 0);
  }

  flip(card: Card) {
    card.isFlipped = !card.isFlipped;
  }

  flipStart() {
    this.flippedCards = this.cards.filter(
      (card) => card.isFlipped === true && card.isMatched === false
    );
    if (this.flippedCards.length === 2) {
      this.movesMade += 1;
    }
  }

  flipEnd() {
    if (this.flippedCards.length !== 2) {
      return;
    }
    
    this.flippedCards[0].id === this.flippedCards[1].id
      ? this.flippedCards.forEach((card) => (card.isMatched = true))
      : false;
    this.score =
      this.cards.filter((card) => card.isMatched === true).length / 2;

    setTimeout(() => {
      this.flippedCards = [];
      this.cards.forEach((card) => {
        !card.isMatched ? (card.isFlipped = false) : false;
      });
    }, 1000);
  }
}
