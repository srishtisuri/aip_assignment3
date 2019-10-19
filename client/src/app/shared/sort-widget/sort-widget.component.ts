import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-sort-widget",
  templateUrl: "./sort-widget.component.html",
  styleUrls: ["./sort-widget.component.css"]
})
export class SortWidgetComponent implements OnInit {
  //Visible on various pages throughout application, hence view is dynamic
  //Button clicks are handled and sort occurs in the specific components
  @Input() sortTypes;
  @Input() sortType;
  @Output() handleSortBy = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
