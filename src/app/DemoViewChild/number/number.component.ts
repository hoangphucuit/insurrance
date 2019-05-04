import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent implements OnInit {

  counter: number = 0;
  constructor() { }

  ngOnInit() {
  }

  IncreaseByOne() {
    this.counter += 1;
  }
  DecreaseByOne() {
    this.counter -=1;
  }
}
