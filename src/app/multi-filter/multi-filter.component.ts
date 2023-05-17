import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multi-filter',
  templateUrl: './multi-filter.component.html',
  styleUrls: ['./multi-filter.component.css']
})
export class MultiFilterComponent implements OnInit {
  
  startValue = 300;
  endValue = 400;

  onStartSliderChange() {
    console.log('Start Value:', this.startValue);
  }

  onEndSliderChange() {
    console.log('End Value:', this.endValue);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
