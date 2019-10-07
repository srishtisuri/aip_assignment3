import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-sort-widget",
  templateUrl: "./sort-widget.component.html",
  styleUrls: ["./sort-widget.component.css"]
})
export class SortWidgetComponent implements OnInit {
  @Input() sortTypes;
  @Output() handleSortBy = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
