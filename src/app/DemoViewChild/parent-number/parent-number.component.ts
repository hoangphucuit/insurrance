import { Component, OnInit, ViewChild } from '@angular/core';
import { NumberComponent } from '../number/number.component';


@Component({
  selector: 'app-parent-number',
  templateUrl: './parent-number.component.html',
  styleUrls: ['./parent-number.component.scss']
})
export class ParentNumberComponent implements OnInit {

  @ViewChild(NumberComponent)
  private numberComponent: NumberComponent;

  constructor() { }

  ngOnInit() {
  }

  Increase() {
    this.numberComponent.IncreaseByOne();
  }
  Decrease() {
    this.numberComponent.DecreaseByOne();
  }
  CalculateAge() {
    var ageDiff = Date.now() - new Date('1995-05-10T17:00:00.000Z').getTime();
    var ageDate = new Date(ageDiff);
    console.log(ageDate.getUTCFullYear()-1970);
  }

}
