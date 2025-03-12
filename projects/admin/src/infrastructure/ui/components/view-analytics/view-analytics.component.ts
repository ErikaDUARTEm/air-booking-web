import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-view-analytics',
  imports: [],
  templateUrl: './view-analytics.component.html',
  styleUrl: './view-analytics.component.scss'
})
export class ViewAnalyticsComponent implements OnInit {

  title: string = "analiticas de reservas";

  @Output() componentLoaded = new EventEmitter<String>();

  ngOnInit(): void {
    this.componentLoaded.emit(this.title);
  }


}
