import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-flagged-users",
  templateUrl: "./flagged-users.component.html",
  styleUrls: ["./flagged-users.component.css"]
})
export class FlaggedUsersComponent implements OnInit {
  constructor() {}

  users = [
    {
      name: "Christian Damtoft",
      createdDate: "01/01/2018",
      reason: "Sock Puppet with 2 accounts",
      profile:
        "https://scontent-syd2-1.xx.fbcdn.net/v/t31.0-8/26172931_2086084758289396_4033699065580492637_o.jpg?_nc_cat=103&_nc_oc=AQmmecoWjx4eVz_avZkXR8I0WBhQPRuhYg99ZUHPwdB1-C1SllR0iVsbzUAZaA4csbQ&_nc_ht=scontent-syd2-1.xx&oh=efc1446867d26fea7d2a5f9e021a977f&oe=5E0DD385"
    },
    {
      name: "Rishabh Ahluwalia",
      createdDate: "01/01/2019",
      reason: "Sock Puppet with 2 accounts",
      profile:
        "https://scontent-syd2-1.xx.fbcdn.net/v/t1.0-1/47687313_2104908596195846_766186620457058304_n.jpg?_nc_cat=110&_nc_oc=AQnnd-4DR_1aqsNIprFPegN1L2E-svjosE-zz14oM8JBNAbLhlthqc9aa2MCdUE-qAM&_nc_ht=scontent-syd2-1.xx&oh=6628374d53ad37f1869acd7c2a15b817&oe=5DDB2328"
    },
    {
      name: "Srishti Suri",
      createdDate: "01/01/2017",
      reason: "Sock Puppet with 1 accounts",
      profile:
        "https://scontent-syd2-1.xx.fbcdn.net/v/t1.0-1/c0.0.1048.1048a/49439030_1174251269417861_6455593466616348672_o.jpg?_nc_cat=109&_nc_oc=AQmo-QhJsAi-oGg2-G214Mas_8Iv1wxibnWYjlB0ItPfJ5gSkPlytfwttxTgNGAmXEo&_nc_ht=scontent-syd2-1.xx&oh=d866d5eabb4f727a685358dba27eb93c&oe=5DD6457E"
    }
  ];

  ngOnInit() {}
}
