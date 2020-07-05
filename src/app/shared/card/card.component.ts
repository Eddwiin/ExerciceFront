import { Component, OnInit } from '@angular/core';

interface Card {
  img: string | Blob;
  title: string;
  text: string;
  price?: number | string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
