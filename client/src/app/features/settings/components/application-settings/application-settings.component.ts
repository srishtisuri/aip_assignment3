import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-settings',
  templateUrl: './application-settings.component.html',
  styleUrls: ['./application-settings.component.css']
})
export class ApplicationSettingsComponent implements OnInit {

  constructor() { }

  settings: {
    language: 'English',
    notifications: true,
    locationTracking: true
  };

  ngOnInit() {
  }
}
